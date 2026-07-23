const jwt = require("jsonwebtoken");
const UserModle = require("../models/usermodel");

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-key-change-in-production";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access token required" });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    console.log("AUTH SUCCESS: User is", decoded.username);
    next();
  } catch (jwtError) {
    console.error("JWT VERIFY ERROR:", jwtError.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Insufficient permissions",
      });
    }

    next();
  };
};

module.exports = { authenticateToken, requireRole };
