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
// config.upload.s3 = config.upload.s3 || {};
// config.upload.drive = config.upload.drive || {};

// config.upload.s3.bucket = process.env.S3_BUCKET || config.upload.s3.bucket;
// config.upload.s3.region = process.env.S3_REGION || config.upload.s3.region;
// config.upload.s3.accessKeyId = process.env.S3_ACCESS_KEY_ID || config.upload.s3.accessKeyId;
// config.upload.s3.secretAccessKey = process.env.S3_SECRET_ACCESS_KEY || config.upload.s3.secretAccessKey;

// config.upload.drive.credentialsPath = process.env.DRIVE_CREDENTIALS_PATH || config.upload.drive.credentialsPath;
// config.upload.drive.folderId = process.env.DRIVE_FOLDER_ID || config.upload.drive.folderId;

// OCR config (fix here)
config.ocr = config.ocr || {};
config.ocr.api_key = process.env.FREE_OCR_API_KEY || config.ocr.api_key;

// LLM config
// LLM config
config.llm = config.llm || {};
config.llm.api_key = process.env.LLM_KEY || config.llm.api_key;



module.exports = config;
