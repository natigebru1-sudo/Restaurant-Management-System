const UserModel = require("../models/userModel");

class UserController {
  static async getById(req, res) {
    try {
      const { user_id } = req.params;
      const USe = await UserModel.findById(user_id);
      if (!USe) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User retrieved successfully", USe });
    } catch (error) {
      console.error("Error while retrieving user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByUsername(req, res) {
    try {
      const { username } = req.params;
      const user = await UserModel.findByUsername(username);
      if (!user || user.length === 0)
        return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User retrieved successfully", user });
    } catch (error) {
      console.error("Error while retriving user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateUsername(req, res) {
    try {
      const { user_id } = req.params;
      const { username } = req.body;
      const newUser = await UserModel.updateUsername(user_id, username);
      if (!newUser) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "Username updated successfully" });
    } catch (error) {
      console.error("Error occured while updating user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateEmail(req, res) {
    try {
      const { user_id } = req.params;
      const { email } = req.body;
      const newEmail = await UserModel.updateEmail(user_id, email);
      if (!newEmail) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "Email updated successfully" });
    } catch (error) {
      console.error("Error occured while updating user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdatePassword(req, res) {
    try {
      const { user_id } = req.params;

      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      const success = await UserModel.updatePassword(user_id, password);

      if (!success) return res.status(404).json({ message: "User not found" });

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error occurred while updating password", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateContact(req, res) {
    try {
      const { user_id } = req.params;
      const { contact_info } = req.body;
      const newContact = await UserModel.updateContact(user_id, contact_info);
      if (!newContact)
        return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "Contact_info updated successfully" });
    } catch (error) {
      console.error("Error occured while updating user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteSoft(req, res) {
    try {
      const { user_id } = req.params;
      const deletedUser = await UserModel.softDelete(user_id);
      if (!deletedUser)
        return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
module.exports = UserController;
