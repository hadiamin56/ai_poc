const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/Users"); // adjust path if needed
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://zubairahmadbhat920712:forget2025@blogcluster.97sao.mongodb.net/invoice_app?retryWrites=true&w=majority&appName=blogcluster";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

async function seedSuperAdmin() {
  try {
    const existingAdmin = await User.findOne({ email: "superadmin@example.com" });
    if (existingAdmin) {
      console.log("Super Admin already exists!");
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash("SuperAdmin123!", 10);

    const superAdmin = new User({
      businessName: "Global Business",
      ownerName: "Super Admin",
      email: "superadmin@example.com",
      phone: "9999999999",
      gstNumber: "GSTSUPER123",
      businessType: "Corporate",
      address: "1 Super Street",
      city: "Metropolis",
      state: "StateName",
      pincode: "000000",
      website: "www.globalbusiness.com",
      password: hashedPassword,
      role: "super_admin",
      status: "approved"
    });

    await superAdmin.save();
    console.log("Super Admin created successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding super admin:", err);
    process.exit(1);
  }
}

seedSuperAdmin();
