const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const configPath = path.join(__dirname, "config.yaml");

let config = {};
try {
  const fileContents = fs.readFileSync(configPath, "utf8");
  config = yaml.load(fileContents);
  console.log("✅ Loaded configuration from config.yaml");
} catch (err) {
  console.error("❌ Failed to load config.yaml:", err.message);
  process.exit(1);
}

// Upload config
config.upload = config.upload || {};

// OCR config
config.ocr = config.ocr || {};
config.ocr.api_key = process.env.FREE_OCR_API_KEY || config.ocr.api_key;

// LLM config
config.llm = config.llm || {};
config.llm.api_key = process.env.LLM_KEY || config.llm.api_key;

module.exports = config;
