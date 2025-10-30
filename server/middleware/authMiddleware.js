// const jwt = require('jsonwebtoken');
// const User = require('../models/Users');

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Unauthorized" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password"); // attach user info
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;














// const jwt = require('jsonwebtoken');
// const User = require('../models/Users');

// const authMiddleware = async (req, res, next) => {
//   try {
//     // ✅ Token HTTP-only cookie se le rahe hain
//     const token = req.cookies?.token;
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     // Token verify karna
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // User info attach karna, password exclude
//     req.user = await User.findById(decoded.id).select("-password");

//     next();
//   } catch (err) {
//     console.error("Auth middleware error:", err.message);
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;




//above code is working perfectly till sunday





//now deleted button k liye changes hai

const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const authMiddleware = async (req, res, next) => {
  try {
    // ✅ Token HTTP-only cookie se le rahe hain
    const token = req.cookies?.token;

    // 🪶 Debug log for checking if token aa raha hai frontend se
    console.log("🔑 Token from cookie:", req.cookies?.token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ✅ Token verify karna
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ User info attach karna (password exclude)
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
