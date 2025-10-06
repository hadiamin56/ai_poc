// ocr.js
const { ocrSpace } = require("ocr-space-api-wrapper");
const config = require("../config/config");

async function runOCR(filePath) {
  const { ocr } = config;

  if (ocr.provider !== "free_ocr") {
    throw new Error(`Unsupported OCR provider: ${ocr.provider}`);
  }

  try {
    console.log("🔎 Calling OCR API for file:", filePath);

    const result = await ocrSpace(filePath, {
      apiKey: ocr.api_key,
      language: "eng",
      isOverlayRequired: false,
    });

    const detectedText = result?.ParsedResults?.[0]?.ParsedText;
    console.log("✅ OCR detected text:", detectedText ? detectedText.substring(0, 100) + "..." : "No text found");
    if (!detectedText) {
      throw new Error("OCR failed: No text detected");
    } 

    return detectedText;

  } catch (error) {
    console.error("❌ OCR error:", error.message || error);
    throw error;
  }
}

module.exports = { runOCR };
