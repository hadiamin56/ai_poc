

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// const path = require("path");
// require("dotenv").config();


// dotenv.config();
// const app = express();

// app.set("trust proxy", 1);


// // ✅ CORS setup with credentials
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://ai-poc-4.onrender.com", // ✅ your React frontend
//     ],
//     credentials: true,
//   })
// );





// app.use(express.json());
// app.use(cookieParser());

// // ✅ MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("MongoDB error:", err));

// // ✅ Routes


// app.get('/', (req, res) => {
//   res.send("Server Running");
// });


// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/files", require("./routes/upload"));
// app.use("/api", require("./routes/export")); // If you have export route
// // app.use("/api/my-invoices", require("./routes/myInvoices")); // optional (if you separate it)

// // ✅ Static folders for uploaded files
// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // actual uploads folder








// // ✅ Fallback route (optional, prevents crash if wrong route hit)
// // app.use((req, res) => {
// //   res.status(404).json({ message: "Route not found" });
// // });



// const __dirnamePath = path.resolve();
// const staticPath = path.join(__dirnamePath, "../client/build");


// console.log("🧭 __dirnamePath:", __dirnamePath);
// console.log("🗂  Serving static files from:", staticPath);

// // Serve static frontend
// app.use(express.static(staticPath));

// // Fallback to React for all other routes
// // app.get(/.*/, (req, res) => res.sendFile(path.join(staticPath, "index.html")));

// // ✅ use regex for SPA fallback route (works on all versions)
// app.get(/^\/(.*)$/, (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// // ============================
// // 💡 Optional: Skip SMTP check on Render
// // ============================
// if (process.env.NODE_ENV === "production") {
//   console.log("⚠️ Skipping SMTP connection check on Render");
// }




// // ✅ Start server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () =>
// //   console.log(`🚀 Server running on port ${PORT}\nN8N_WEBHOOK_URL: ${process.env.N8N_WEBHOOK_URL}`)
// // );
// // ✅ Start server (Render compatible)
// const PORT = process.env.PORT || 10000;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`N8N_WEBHOOK_URL: ${process.env.N8N_WEBHOOK_URL}`);
// });


// new server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.set("trust proxy", 1);

// ================= Middleware =================
app.use(
  cors({
    origin: ["http://localhost:3000"], // frontend later
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ================= MongoDB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// ================= Routes =================
app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/files", require("./routes/upload"));
app.use("/api", require("./routes/export"));

// ================= Render PORT binding =================
const PORT = process.env.PORT || 10000;

console.log("ENV PORT VALUE:", process.env.PORT); // debug

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});





