// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const authMiddleware = require("../middleware/authMiddleware");
// const Invoice = require("../models/Invoice");
// const { runOCR } = require("../utils/ocr");
// const { parseInvoiceWithLLM } = require("../utils/llm"); // ✅ use your new Gemini function
// const { saveFile } = require("../utils/storage");

// const upload = multer({ dest: "temp_uploads" });

// router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

//     const filePath = await saveFile(req.file);

//     // 🔹 Step 1: OCR
//     const detectedText = await runOCR(filePath);
//     if (!detectedText) throw new Error("OCR failed: No text detected");

//     // 🔹 Step 2: LLM Parsing
//     const parsedData = await parseInvoiceWithLLM(
//       JSON.stringify({ ocr_text: detectedText }) // match your prompt spec
//     );

//     res.json({
//       success: true,
//       file: { name: req.file.originalname, path: filePath },
//       ocrText: detectedText,
//       parsedData, // structured JSON from Gemini
//     });
//   } catch (err) {
//     console.error("❌ Upload error:", err.message);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const authMiddleware = require("../middleware/authMiddleware");

const upload = multer({ dest: "temp_uploads" });

router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL; // your n8n webhook URL

  // prepare FormData for n8n
  const form = new FormData();
  form.append("file", fs.createReadStream(req.file.path), req.file.originalname);
  form.append("filename", req.file.originalname);

  // save file info before cleanup
  const uploadedFile = {
    path: req.file.path,
    name: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
  };

  try {
    const response = await axios.post(n8nWebhookUrl, form, {
      headers: {
        ...form.getHeaders(),
        // 'x-n8n-webhook-secret': process.env.N8N_WEBHOOK_SECRET, // if needed
      },
      timeout: 120000,
    });
    // console.log("n8n response:", response.data);
    // cleanup temp file
    try { fs.unlinkSync(req.file.path); } catch (e) { console.warn("File cleanup failed:", e.message); }

    // send file info + n8n OCR/parsing result to React
    return res.json({
      success: true,
      file: uploadedFile,
      parsedJson: response.data, // n8n parsed invoice JSON
    });
  } catch (err) {
    try { fs.unlinkSync(req.file.path); } catch(e){}

    console.error("Upload -> n8n error:", err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: err.response?.data?.message || err.message || "n8n request failed",
    });
  }
});


// routes/saveInvoice.js
const Invoice = require("../models/Invoice"); // your Invoice model

router.post("/save-invoice", authMiddleware, async (req, res) => {
  try {
    const { parsedData, imagePath } = req.body;

    if (!parsedData) {
      return res.status(400).json({ success: false, message: "No parsedData provided" });
    }

    // Ensure items is an array
    let mappedItems = [];
    if (parsedData.items && Array.isArray(parsedData.items)) {
      mappedItems = parsedData.items.map(item => ({
        description: item.description || "",
        quantity: Number(item.quantity) || 0,
        price: parseFloat((item.total || item.unit_price || "0").toString().replace(/[^0-9.-]+/g, "")) || 0,
      }));
    } else {
      console.warn("No valid items array found in parsedData:", parsedData.items);
    }

    // Parse total and tax
    const totalAmount = parseFloat((parsedData.total || "0").toString().replace(/[^0-9.-]+/g, "")) || 0;
    const taxAmount = parseFloat((parsedData.taxAmount || "0").toString().replace(/[^0-9.-]+/g, "")) || 0;

    // Create invoice
    const newInvoice = await Invoice.create({
      invoiceNumber: parsedData.invoice?.number || "",
      invoiceDate: parsedData.invoice?.date ? new Date(parsedData.invoice.date) : null,
      vendorName: parsedData.vendor?.name || "",
      totalAmount,
      taxAmount,
      items: mappedItems,
      uploadedBy: req.user.id,
      imagePath: imagePath || "",
    });

    console.log("Invoice saved:", newInvoice._id);

    return res.json({ success: true, message: "Invoice saved successfully", invoiceId: newInvoice._id });
  } catch (err) {
    console.error("Save invoice error:", err);
    return res.status(500).json({ success: false, message: err.message || "Server error" });
  }
});

module.exports = router;



