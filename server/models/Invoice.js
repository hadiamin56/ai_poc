// const mongoose = require("mongoose");

// const itemSchema = new mongoose.Schema({
//   description: String,
//   quantity: Number,
//   price: Number,
// });

// const invoiceSchema = new mongoose.Schema({
//   invoiceNumber: String,
//   invoiceDate: Date,
//   vendorName: String,
//   totalAmount: Number,
//   taxAmount: Number,
//   items: [itemSchema],
//   uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   uploadedByName: { type: String, default: "" },   //new field added
//   imagePath: String,
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Invoice", invoiceSchema);







//ye bs deleted botton k liye changes hai

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
  uploadedByName: { type: String, default: "" },
  imagePath: String,
  createdAt: { type: Date, default: Date.now },

  // ✅ NEW FIELD — for soft delete logic
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
