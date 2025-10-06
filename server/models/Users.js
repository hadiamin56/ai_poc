const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, default: false },
  emailOtp: {
    code: String,
    expiresAt: Date,
    attempts: { type: Number, default: 0 }
  },
  phone: { type: String, unique: true },
  gstNumber: { type: String, unique: true },
  businessType: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  website: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ["super_admin","admin","employee"], default: "admin" },
  status: { type: String, enum: ["review", "process", "approved", "rejected", "disabled"], default: "review" },
  parentBusinessId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  employeeName: { type: String },
  businessUnitAddress: { type: String },
  contactNumber: { type: String },
  comments: [
    {
      comment: String,
      by: { type: String, enum: ["super_admin","admin"] },
      date: { type: Date, default: Date.now }
    }
  ],

  // ✅ Add these fields for password reset
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
