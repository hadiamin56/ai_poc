const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();

app.set("trust proxy", 1);

// ✅ CORS setup with credentials
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://ai-poc-4.onrender.com", // ✅ your React frontend
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// ============================
// ✅ API ROUTES (MUST COME FIRST)
// ============================

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/files", require("./routes/upload"));
app.use("/api", require("./routes/export"));
// app.use("/api/my-invoices", require("./routes/myInvoices")); // optional

// ✅ Static folders for uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ============================
// ✅ SERVE REACT FRONTEND (PRODUCTION)
// ============================

// Correct path resolution for production
const __dirnamePath = path.resolve();

// Adjust path based on your folder structure
// If server and client are siblings: use "../client/build"
// If they're in same root: use "client/build"
const staticPath = path.join(__dirnamePath, "../client/build");

console.log("🧭 __dirnamePath:", __dirnamePath);
console.log("🗂  Serving static files from:", staticPath);
console.log("📁 Static path exists:", fs.existsSync(staticPath));

// Serve static files from React build folder
app.use(express.static(staticPath));

// ============================
// ✅ CATCH-ALL ROUTE FOR REACT ROUTER (OPTION 1)
// Excludes /api routes using negative lookahead regex
// This MUST be the last route
// ============================
app.get(/^(?!\/api\/).*$/, (req, res) => {
  const indexPath = path.join(staticPath, "index.html");
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error("❌ Error sending index.html:", err);
        res.status(500).send("Error loading application");
      }
    });
  } else {
    console.error("❌ index.html not found at:", indexPath);
    res.status(404).send("Application not found. Please check build folder.");
  }
});

// ============================
// 💡 Optional: Skip SMTP check on Render
// ============================
if (process.env.NODE_ENV === "production") {
  console.log("⚠ Skipping SMTP connection check on Render");
}

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` Server running on port ${PORT}\n📡 N8N_WEBHOOK_URL: ${process.env.N8N_WEBHOOK_URL}`)
);