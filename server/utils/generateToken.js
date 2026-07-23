const jwt = require("jsonwebtoken");
const crypto = require("crypto");

/**
 * Generate JWT token for authentication
 * @param {object} payload - Token payload
 * @param {string} expiresIn - Token expiration time (default: '24h')
 * @returns {string} Generated token
 */
const generateToken = (payload, expiresIn = "24h") => {
  const secret = process.env.JWT_SECRET || "default-restaurant-secret-key";

  try {
    return jwt.sign(payload, secret, { expiresIn });
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate token");
  }
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {object} Decoded token payload
 */
const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET || "default-restaurant-secret-key";

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Invalid or expired token");
  }
};

/**
 * Generate API key for external integrations
 * @param {number} length - Key length (default: 32)
 * @returns {string} Random API key
 */
const generateApiKey = (length = 32) => {
  return crypto.randomBytes(length).toString("hex");
};

/**
 * Generate unique transaction ID
 * @param {string} prefix - Transaction prefix (default: 'TXN')
 * @returns {string} Unique transaction ID
 */
const generateTransactionId = (prefix = "TXN") => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

/**
 * Generate menu item barcode or SKU
 * @param {number} itemId - Menu item ID
 * @returns {string} Generated barcode/SKU
 */
const generateBarcode = (itemId) => {
  const prefix = "MENU";
  const paddedId = itemId.toString().padStart(6, "0");
  const checksum = Math.floor(Math.random() * 10);
  return `${prefix}${paddedId}${checksum}`;
};

/**
 * Generate session ID for user sessions
 * @returns {string} Session ID
 */
const generateSessionId = () => {
  return crypto.randomBytes(16).toString("hex");
};

/**
 * Generate password reset token
 * @returns {string} Reset token
 */
const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

/**
 * Generate verification code
 * @param {number} length - Code length (default: 6)
 * @returns {string} Numeric verification code
 */
const generateVerificationCode = (length = 6) => {
  const chars = "0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Generate unique order number
 * @param {string} prefix - Order prefix (default: 'ORD')
 * @returns {string} Order number
 */
const generateOrderNumber = (prefix = "ORD") => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  return `${prefix}${year}${month}${day}${random}`;
};

/**
 * Generate kitchen/inventory reference number
 * @param {string} operation - Operation type (IN, OUT, ADJ)
 * @returns {string} Reference number
 */
const generateInventoryRef = (operation = "ADJ") => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `INV${operation}${timestamp}${random}`;
};

/**
 * Extract token from authorization header
 * @param {string} authHeader - Authorization header value
 * @returns {string|null} Token or null if invalid
 */
const extractTokenFromHeader = (authHeader) => {
  if (!authHeader || typeof authHeader !== "string") {
    return null;
  }

  if (authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  return null;
};

/**
 * Check if token is expired
 * @param {object} decodedToken - Decoded JWT token
 * @returns {boolean} True if expired
 */
const isTokenExpired = (decodedToken) => {
  if (!decodedToken || !decodedToken.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
};

module.exports = {
  generateToken,
  verifyToken,
  generateApiKey,
  generateTransactionId,
  generateBarcode,
  generateSessionId,
  generateResetToken,
  generateVerificationCode,
  generateOrderNumber,
  generateInventoryRef,
  extractTokenFromHeader,
  isTokenExpired,
};
