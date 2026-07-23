const UserModel = require("../models/userModel");
const { generateToken, verifyToken } = require("../utils/generateToken");
const { sendEmail } = require("../service/emailService");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

class AuthController {
  static async register(req, res) {
    try {
      const { username, email, password, contact_info } = req.body;

      if (!username || !email || !password || !contact_info)
        return res.status(400).json({ message: "Fill the required fields" });

      if (password.length < 6) {
        return res.status(400).json({
          message: "Password must be at least 6 characters long",
        });
      }

      const newUser = await UserModel.create({
        username,
        email,
        password,
        contact_info,
      });

      const token = generateToken({
        user_id: newUser.user_id,
        username: newUser.username,
        role: newUser.role,
      });

      return res.status(201).json({
        message: "User created successfully",
        token,
        user: newUser,
      });
    } catch (error) {
      console.error("Create user error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async Login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        return res
          .status(400)
          .json({ message: "Required fields must be filled" });

      const user = await UserModel.findByUsername(username);
      if (!user)
        return res.status(401).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.hashed_password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = generateToken({
        user_id: user.user_id,
        username: user.username,
        role: user.role,
      });

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error while login", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async Logout(req, res) {
    try {
      res.status(200).json({
        message: "Logout successful",
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await UserModel.findByEmail(email);
      if (!user) return res.status(404).json({ message: "User not found" });

      const resetToken = crypto.randomBytes(32).toString("hex");
      const expires = Date.now() + 15 * 60 * 1000;

      await UserModel.saveResetToken(user.user_id, resetToken, expires);

      const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

      await sendEmail({
        email: user.email,
        subject: "Password Reset Request",
        message: `Click here to reset your password: ${resetUrl}`,
      });

      res.status(200).json({ message: "Reset link sent to your email" });
    } catch (error) {
      console.error("Forgot Password Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;
      if (!token || !newPassword)
        return res.status(400).json({ message: "Missing required fields" });

      const user = await UserModel.findByResetToken(token);

      if (!user || user.reset_token_expires < Date.now()) {
        return res
          .status(400)
          .json({ message: "Token is invalid or has expired" });
      }

      await UserModel.updatePassword(user.user_id, newPassword);

      await UserModel.saveResetToken(user.user_id, null, null);

      res.status(200).json({ message: "Password successfully reset" });
    } catch (error) {
      console.error("Reset Password Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = AuthController;
