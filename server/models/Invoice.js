const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  description: String,
  quantity: Number,
  price: Number,
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  invoiceDate: Date,
  vendorName: String,
  totalAmount: Number,
  taxAmount: Number,
  items: [itemSchema],
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  imagePath: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
