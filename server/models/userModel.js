const { getDB } = require("../config/db");
const bcrypt = require("bcryptjs");

class UserModel {
  static async create(userData) {
    const db = getDB();
    const {
      username,
      email,
      password,
      contact_info,
      role = "customer",
    } = userData;

    const hashed = await bcrypt.hash(password, 10);

    const [results] = await db.execute(
      "INSERT INTO user(username, email, hashed_password, contact_info, role) VALUES (?, ?, ?, ?, ?)",
      [username, email, hashed, contact_info, role],
    );

    return this.findById(results.insertId);
  }

  static async findById(user_id) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM user WHERE user_id = ? AND is_active = TRUE",
      [user_id],
    );
    return rows[0];
  }

  static async findByUsername(username) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM user WHERE username = ? AND is_active = TRUE",
      [username],
    );
    return rows[0];
  }

  static async updateUsername(user_id, username) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE user SET username = ? WHERE user_id = ?",
      [username, user_id],
    );
    return results.affectedRows > 0;
  }

  static async updateEmail(user_id, email) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE user SET email = ? WHERE user_id = ?",
      [email, user_id],
    );
    return results.affectedRows > 0;
  }

  static async updatePassword(user_id, new_password) {
    const db = getDB();
    const hashed = await bcrypt.hash(new_password, 10);
    const [results] = await db.execute(
      "UPDATE user SET hashed_password = ? WHERE user_id = ?",
      [hashed, user_id],
    );
    return results.affectedRows > 0;
  }

  static async updateContact(user_id, contact_info) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE user SET contact_info = ? WHERE user_id = ?",
      [contact_info, user_id],
    );
    return results.affectedRows > 0;
  }

  static async softDelete(user_id) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE user SET is_active = FALSE WHERE user_id = ?",
      [user_id],
    );
    return results.affectedRows > 0;
  }

  static async saveResetToken(user_id, token, expires) {
    const expiryDate = expires ? new Date(expires) : null;

    await db.execute(
      "UPDATE user SET reset_token = ?, reset_token_expires = ? WHERE user_id = ?",
      [token, expiryDate, user_id],
    );
  }

  static async findByResetToken(token) {
    const [rows] = await db.execute(
      "SELECT * FROM user WHERE reset_token = ?",
      [token],
    );
    return rows[0];
  }
}

module.exports = UserModel;
