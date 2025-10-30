const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
// routes/authRoutes.js
const nodemailer = require("nodemailer");
const { sendOtpEmail } = require('../utils/email');

// Middleware
const checkAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Only admin can create users" });
  if (req.user.status !== "approved") return res.status(403).json({ message: "Your account is not approved yet" }); // NEW
  next();
};

const checkSuperAdmin = (req, res, next) => {
  if (req.user.role !== "super_admin") return res.status(403).json({ message: "Only super admin can approve users" });
  next();
};

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const {
      businessName, ownerName, email, phone, gstNumber, businessType,
      address, city, state, pincode, website, password
    } = req.body;

    const existing = await User.findOne({ $or: [{ email }, { phone }, { gstNumber }] });
    if (existing) return res.status(400).json({ message: "Email, phone or GST already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      businessName, ownerName, email, phone, gstNumber, businessType,
      address, city, state, pincode, website, password: hashed,
      role: "admin", // default admin
      status: "review" // NEW: starts as review
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully, awaiting approval by super admin" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.ownerName}`, user: req.user });
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid email or password' });

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    // res.json({ token, user });



// changes occur here

const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

// ✅ Set HTTP-only cookie
res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // production me sirf HTTPS
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});

res.status(200).json({ message: "Login successful!", user }); // token ab cookie me hai

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Logout (clear cookie)
router.post('/logout', authMiddleware, async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});






// Create sub-user - only approved admins
router.post('/create-user', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const { employeeName, email, contactNumber, gstNumber, pincode, businessType, businessUnitAddress, password } = req.body;

    const existing = await User.findOne({ $or: [{ email }, { contactNumber }] });
    if (existing) return res.status(400).json({ message: "Email or contact number already exists" });

    if (!password || password.length < 6) return res.status(400).json({ message: "Password is required and min 6 chars" });

    const hashed = await bcrypt.hash(password, 10);
    const subUser = new User({
        employeeName,
        email,
        phone: contactNumber, // assign to phone field to satisfy unique index
        contactNumber,        // keep for your form
        gstNumber,
        pincode,
        businessType,
        businessUnitAddress,
        role: "employee",
        parentBusinessId: req.user._id,
        businessName: req.user.businessName,
        ownerName: req.user.ownerName,
        password: hashed,
        status: "approved"
        });


    await subUser.save();
    const { password: _, ...userWithoutPassword } = subUser.toObject();
    res.status(201).json({ message: "Sub-user created successfully", user: userWithoutPassword, plainPassword: password });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all sub-users (admin)
router.get('/users', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const users = await User.find({ parentBusinessId: req.user._id }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Super Admin: get users pending approval
router.get('/pending-users', authMiddleware, checkSuperAdmin, async (req, res) => {
  try {
    const users = await User.find({ status: "review" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Super Admin: approve user
router.patch('/approve-user/:id', authMiddleware, checkSuperAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = "approved";
    await user.save();
    res.json({ message: "User approved successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Send OTP for email verification ---
router.post('/send-otp', authMiddleware, async (req, res) => {
  try {
    const { newEmail } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check duplicate email
    // const emailExists = await User.findOne({ email: newEmail });
    // if (emailExists) return res.status(400).json({ message: "Email already in use" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP before storing
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    user.emailOtp = {
      code: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 mins
      attempts: 0
    };

    await user.save();

    // Send OTP to email
    await sendOtpEmail(newEmail, otp);

    res.json({ message: `OTP sent to ${newEmail}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});
// Super Admin: get all admins
router.get('/all-admins', authMiddleware, checkSuperAdmin, async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");

    const adminsWithUsers = await Promise.all(
      admins.map(async (admin) => {
        const users = await User.find({ parentBusinessId: admin._id }).select("-password");
        return {
          ...admin.toObject(),
          userCount: users.length,
          users, // send user list too
        };
      })
    );

    res.json(adminsWithUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Super Admin: update admin details
router.patch('/update-admin/:id', authMiddleware, checkSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData.password; // prevent password update here

    const updatedAdmin = await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
    if (!updatedAdmin) return res.status(404).json({ message: "Admin not found" });

    res.json({ message: "Admin updated successfully", user: updatedAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Super Admin: disable/enable admin
router.patch('/disable-admin/:id', authMiddleware, checkSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await User.findById(id);
    if (!admin || admin.role !== "admin") return res.status(404).json({ message: "Admin not found" });

    // toggle between approved and disabled
    admin.status = admin.status === "disabled" ? "approved" : "disabled";
    await admin.save();

    res.json({ 
      message: `Admin ${admin.status === "disabled" ? "disabled" : "enabled"} successfully`, 
      user: admin 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Super Admin: delete admin
router.delete('/delete-admin/:id', authMiddleware, checkSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Admin not found" });

    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rejection by Super Admin
router.patch('/reject-user/:id', authMiddleware, checkSuperAdmin, async (req, res) => {
  try {
    const { comment } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = "rejected";
    if(comment) user.comments.push({ comment, by: "super_admin" });

    await user.save();
    res.json({ message: "User rejected successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin resubmit updated details
router.patch('/resubmit-user/:id', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const updateData = { ...req.body };
    delete updateData.password; // password not updated here

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = "review"; // reset status to review
    user.comments.push({ comment: "Updated and resubmitted", by: "admin" });
    await user.save();

    res.json({ message: "User resubmitted for approval", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Super Admin: get detailed pending user info
router.get('/pending-user/:id', authMiddleware, checkSuperAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const crypto = require('crypto');


// --- Admin updates their own email ---
router.patch('/update-my-email', authMiddleware, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optional: prevent duplicate emails
    const emailExists = await User.findOne({ email });
    if (emailExists && emailExists._id.toString() !== req.user._id.toString())
      return res.status(400).json({ message: "Email already in use" });

    user.email = email;
    user.emailVerified = false; // reset verification
    await user.save();

    res.json({ message: "Email updated successfully", email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// --- Verify OTP ---
router.post('/verify-otp', authMiddleware, async (req, res) => {
  try {
    const { otp, newEmail } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.emailOtp || !user.emailOtp.code)
      return res.status(400).json({ message: "No OTP requested" });

    if (user.emailOtp.expiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });

    // Hash input OTP and compare
    const hashedInput = crypto.createHash('sha256').update(otp).digest('hex');
    if (hashedInput !== user.emailOtp.code)
      return res.status(400).json({ message: "Invalid OTP" });

    // Update email & verified
    user.email = newEmail;
    user.emailVerified = true;
    user.emailOtp = undefined; // remove OTP after verification
    await user.save();

    res.json({ message: "Email verified successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


// --- Admin: update own email (starts review) ---
router.patch('/update-my-email', authMiddleware, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check duplicate email
    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ message: "Email already in use" });

    // Update email and reset verification
    user.email = email;
    user.emailVerified = false;
    user.status = "review"; // optional, if you want super admin approval
    await user.save();

    res.json({ message: "Email updated successfully. Please verify using OTP.", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});



// 1. Request password reset (send email with token)
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Check if email is verified
    if (!user.emailVerified) {
      return res.status(400).json({ message: "Email is not verified. Please verify your email first." });
    }

    // Create reset token (expires in 1 hour)
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    await transporter.sendMail({
      from: `"App Name" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. Link expires in 1 hour.</p>`,
    });

    res.json({ success: true, message: "Password reset email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// 2. Reset password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Clear token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
