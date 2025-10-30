

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();


dotenv.config();
const app = express();

// ✅ CORS setup with credentials
app.use(
  cors({
    origin:["http://localhost:3000",
      "https://ai-poc-4.onrender.com"
    ],// frontend URL

    credentials: true, // allow cookies
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

// ✅ Routes


app.get('/', (req, res) => {
  res.send("Server Running");
});


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/files", require("./routes/upload"));
app.use("/api", require("./routes/export")); // If you have export route
// app.use("/api/my-invoices", require("./routes/myInvoices")); // optional (if you separate it)

// ✅ Static folders for uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // actual uploads folder








// ✅ Fallback route (optional, prevents crash if wrong route hit)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});




// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}\nN8N_WEBHOOK_URL: ${process.env.N8N_WEBHOOK_URL}`)
);









// this change is for only deletd botton 

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// const path = require("path");

// dotenv.config();
// const app = express();

// // ✅ CORS setup with credentials
// app.use(
//   cors({
//     origin: "http://localhost:3000", // frontend URL
//     credentials: true, // allow cookies
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
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api", require("./routes/upload"));
// app.use("/api/export", require("./routes/export")); // 🔥 updated (was "/api")

// // ✅ Static folders for uploaded files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/temp_uploads", express.static(path.join(__dirname, "temp_uploads")));

// // ✅ Fallback route (optional, prevents crash if wrong route hit)
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(
//     `🚀 Server running on port ${PORT}\nN8N_WEBHOOK_URL: ${process.env.N8N_WEBHOOK_URL}`
//   )
// );
