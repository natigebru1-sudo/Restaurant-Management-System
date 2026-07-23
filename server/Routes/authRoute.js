const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  validateUserRegistration,
  validateUserLogin,
} = require("../middlewares/validator");

// Public routes
router.post("/register", validateUserRegistration, AuthController.register);
router.post("/login", validateUserLogin, AuthController.Login);
router.post("/forgot-password", AuthController.forgotPassword);
router.put("/reset-password", AuthController.resetPassword);

// Protected route
router.post("/logout", authenticateToken, AuthController.Logout);

module.exports = router;
