const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const { google } = require("googleapis");
const config = require("../config/config");

async function saveFile(file) {
  const provider = config.upload.provider;

  if (provider === "local") {
    const folder = config.upload.folder;
    const destPath = path.join(folder, file.originalname);
    fs.renameSync(file.path, destPath);
    return destPath;

  } else if (provider === "s3") {
    const s3 = new AWS.S3({
      accessKeyId: config.upload.s3.accessKeyId,
      secretAccessKey: config.upload.s3.secretAccessKey,
      region: config.upload.s3.region,
    });

    const fileContent = fs.readFileSync(file.path);
    const params = {
      Bucket: config.upload.s3.bucket,
      Key: file.originalname,
      Body: fileContent,
    };

    const data = await s3.upload(params).promise();
    fs.unlinkSync(file.path);
    return data.Location;

  } else if (provider === "drive") {
    const auth = new google.auth.GoogleAuth({
      keyFile: config.upload.drive.credentialsPath,
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });
    const driveService = google.drive({ version: "v3", auth });
    const fileMetadata = {
      name: file.originalname,
      parents: [config.upload.drive.folderId],
    };
    const media = { body: fs.createReadStream(file.path) };
    const driveFile = await driveService.files.create({
      resource: fileMetadata,
      media,
      fields: "id",
    });
    fs.unlinkSync(file.path);
    return `https://drive.google.com/file/d/${driveFile.data.id}/view`;
  } else {
    throw new Error("Unsupported storage provider");
  }
}

module.exports = { saveFile };
