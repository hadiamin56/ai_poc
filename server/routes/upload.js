




//this is sec change for delete botton

require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const authMiddleware = require("../middleware/authMiddleware");
const Invoice = require("../models/Invoice");
const User = require("../models/Users");

// ============================
// Multer setup
// ============================
// const upload = multer({ dest: "temp_uploads" });

const path = require("path");

// ✅ Make sure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer config to save files directly in uploads/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // save to uploads/
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });













router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const n8nWebhookUrl =
    process.env.N8N_WEBHOOK_URL || "https://adil2025.app.n8n.cloud/webhook/ocr-llm";

  const form = new FormData();
  form.append("file", fs.createReadStream(req.file.path), req.file.originalname);
  form.append("filename", req.file.originalname);

  const uploadedFile = {
    path: req.file.path,
    name: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
  };

  try {
    // ✅ Send to N8N for OCR/processing
    const response = await axios.post(n8nWebhookUrl, form, {
      headers: { ...form.getHeaders() },
      timeout: 120000,
    });

    // ✅ Keep file (don’t delete)
    const imagePath = `/uploads/${req.file.filename}`; // relative path for DB/frontend

    // ✅ Return success response
    return res.json({
      success: true,
      file: uploadedFile,
      parsedJson: response.data,
      imagePath, // include for saving in DB or displaying in frontend
    });
  } catch (err) {
    // ❌ Only delete if upload to N8N failed
    try {
      fs.unlinkSync(req.file.path);
    } catch (e) {
      console.warn("File cleanup failed:", e.message);
    }

    console.error("Upload -> n8n error:", err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: err.response?.data?.message || err.message || "n8n request failed",
    });
  }
});








































// ============================
// 💾 Save Invoice
// ============================
router.post("/save-invoice", authMiddleware, async (req, res) => {
  try {
    const { parsedData, imagePath, uploadedByName } = req.body;
    if (!parsedData)
      return res.status(400).json({ success: false, message: "No parsedData provided" });

    let mappedItems = [];
    if (parsedData.items && Array.isArray(parsedData.items)) {
      mappedItems = parsedData.items.map((item) => ({
        description: item.description || "",
        quantity: Number(item.quantity) || 0,
        price:
          parseFloat(
            (item.total || item.unit_price || "0").toString().replace(/[^0-9.-]+/g, "")
          ) || 0,
      }));
    }

    const totalAmount =
      parseFloat((parsedData.total || "0").toString().replace(/[^0-9.-]+/g, "")) || 0;
    const taxAmount =
      parseFloat((parsedData.taxAmount || "0").toString().replace(/[^0-9.-]+/g, "")) || 0;

    const newInvoice = await Invoice.create({
      invoiceNumber: parsedData.invoice?.number || "",
      invoiceDate: parsedData.invoice?.date ? new Date(parsedData.invoice.date) : null,
      vendorName: parsedData.vendor?.name || "",
      totalAmount,
      taxAmount,
      items: mappedItems,
      uploadedBy: req.user.id,
      imagePath: imagePath || "",
      uploadedByName: uploadedByName || "",
    });

    console.log("Invoice saved:", newInvoice._id);
    return res.json({
      success: true,
      message: "Invoice saved successfully",
      invoiceId: newInvoice._id,
    });
  } catch (err) {
    console.error("Save invoice error:", err);
    return res.status(500).json({ success: false, message: err.message || "Server error" });
  }
});

// // ============================
// // ✏️ Update Invoice
// // ============================
// router.put("/update-invoice/:id", authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { parsedData, uploadedByName } = req.body;

//     if (!parsedData)
//       return res.status(400).json({ success: false, message: "No parsedData provided" });

//     const updatedInvoice = await Invoice.findByIdAndUpdate(
//       id,
//       {
//         invoiceNumber: parsedData.invoiceNumber || "",
//         invoiceDate: parsedData.invoiceDate ? new Date(parsedData.invoiceDate) : null,
//         vendorName: parsedData.vendorName || "",
//         totalAmount: parsedData.totalAmount || 0,
//         taxAmount: parsedData.taxAmount || 0,
//         items: parsedData.items || [],
//         uploadedByName: uploadedByName || "",
//       },
//       { new: true }
//     );

//     if (!updatedInvoice)
//       return res.status(404).json({ success: false, message: "Invoice not found" });

//     console.log("Invoice updated:", updatedInvoice._id);
//     return res.json({
//       success: true,
//       message: "Invoice updated successfully",
//       updatedInvoice,
//     });
//   } catch (err) {
//     console.error("Update invoice error:", err);
//     return res.status(500).json({ success: false, message: err.message || "Server error" });
//   }
// });









// ============================
// ✏️ Update Invoice (Safe Partial Update)
// ============================
router.put("/update-invoice/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { parsedData, uploadedByName } = req.body;

    if (!parsedData)
      return res
        .status(400)
        .json({ success: false, message: "No parsedData provided" });

    // 🔍 Fetch existing invoice
    const existingInvoice = await Invoice.findById(id);
    if (!existingInvoice)
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });

    // ✅ Only update provided fields — preserve all others
    const updateFields = {
      invoiceNumber:
        parsedData.invoiceNumber ?? existingInvoice.invoiceNumber,
      invoiceDate: parsedData.invoiceDate
        ? new Date(parsedData.invoiceDate)
        : existingInvoice.invoiceDate,
      vendorName: parsedData.vendorName ?? existingInvoice.vendorName,
      totalAmount: parsedData.totalAmount ?? existingInvoice.totalAmount,
      taxAmount: parsedData.taxAmount ?? existingInvoice.taxAmount,
      items: parsedData.items ?? existingInvoice.items,

      // ✅ Preserve these important fields (never overwrite)
      uploadedBy: existingInvoice.uploadedBy,
      uploadedByName: existingInvoice.uploadedByName || uploadedByName || "",
      createdAt: existingInvoice.createdAt,
      isDeleted: existingInvoice.isDeleted,
    };

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    console.log("Invoice updated:", updatedInvoice._id);
    return res.json({
      success: true,
      message: "Invoice updated successfully",
      updatedInvoice,
    });
  } catch (err) {
    console.error("Update invoice error:", err);
    return res
      .status(500)
      .json({ success: false, message: err.message || "Server error" });
  }
});

























// ============================
// 👨‍💼 Fetch All Invoices (Admin)
// ============================
router.get("/all-invoices", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "Access denied" });

    const subUsers = await User.find({ parentBusinessId: req.user.id });
    const subUserIds = subUsers.map((u) => u._id);

    const invoices = await Invoice.find({
      uploadedBy: { $in: [...subUserIds, req.user.id] },
    }).sort({ createdAt: -1 });

    return res.json({ success: true, invoices });
  } catch (err) {
    console.error("Fetch admin invoices error:", err);
    return res
      .status(500)
      .json({ success: false, message: err.message || "Server error" });
  }
});

// ============================
// 📄 Fetch My Invoices (Fixed)
// ============================
router.get("/my-invoices", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    let invoices = [];

    // ✅ Include invoices where isDeleted is false OR not set at all
    const baseFilter = { $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }] };

    if (user.role === "admin") {
      // Admin → fetch own + sub-users invoices
      const subUsers = await User.find({ parentBusinessId: user.id });
      const subUserIds = subUsers.map((u) => u._id);

      invoices = await Invoice.find({
        uploadedBy: { $in: [...subUserIds, user.id] },
        ...baseFilter,
      }).sort({ createdAt: -1 });
    } else {
      // Normal user → fetch only their invoices
      invoices = await Invoice.find({
        uploadedBy: user.id,
        ...baseFilter,
      }).sort({ createdAt: -1 });
    }

    console.log(`✅ ${invoices.length} invoices fetched for ${user.email}`);
    return res.json(invoices);
  } catch (err) {
    console.error("❌ Fetch invoices error:", err);
    return res.status(500).json({ message: "Failed to fetch invoices" });
  }
});










// ============================
// 🗑️ Soft Delete Invoice
// ============================
router.delete("/soft-delete-invoice/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!invoice)
      return res.status(404).json({ success: false, message: "Invoice not found" });

    return res.json({
      success: true,
      message: "Invoice deleted successfully",
      invoice,
    });
  } catch (err) {
    console.error("Soft delete error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete invoice" });
  }
});

module.exports = router;
