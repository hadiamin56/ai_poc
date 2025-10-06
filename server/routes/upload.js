const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const Invoice = require("../models/Invoice");
const { runOCR } = require("../utils/ocr");
const { parseInvoiceWithLLM } = require("../utils/llm"); // ✅ use your new Gemini function
const { saveFile } = require("../utils/storage");

const upload = multer({ dest: "temp_uploads" });

router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    const filePath = await saveFile(req.file);

    // 🔹 Step 1: OCR
    const detectedText = await runOCR(filePath);
    if (!detectedText) throw new Error("OCR failed: No text detected");

    // 🔹 Step 2: LLM Parsing
    const parsedData = await parseInvoiceWithLLM(
      JSON.stringify({ ocr_text: detectedText }) // match your prompt spec
    );

    res.json({
      success: true,
      file: { name: req.file.originalname, path: filePath },
      ocrText: detectedText,
      parsedData, // structured JSON from Gemini
    });
  } catch (err) {
    console.error("❌ Upload error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
