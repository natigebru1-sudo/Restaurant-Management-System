const { getDB } = require("../config/db");

class StaffModel {
  static async create(staffData) {
    const db = getDB();
    const { user_id, shift_date, start_time, end_time } = staffData;
    const [results] = await db.execute(
      "INSERT INTO staff_schedules(user_id, shift_date, start_time, end_time) VALUES(?, ?, ?, ?)",
      [user_id, shift_date, start_time, end_time],
    );
    return this.findById(results.insertId);
  }

  static async findById(schedule_id) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM staff_schedules WHERE schedule_id = ?",
      [schedule_id],
    );
    return rows[0];
  }

  static async findByUser(user_id) {
    const db = getDB();
    const [rows] = await db.execute(
      `
      SELECT staff_schedules.*, user.username, user.email
      FROM staff_schedules
      JOIN user ON staff_schedules.user_id = user.user_id
      WHERE staff_schedules.user_id = ?
      `,
      [user_id],
    );
    return rows;
  }

  static async findByDate(shift_date) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM staff_schedules WHERE shift_date = ?",
      [shift_date],
    );
    return rows[0];
  }

  static async findByStart(start_time) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM staff_schedules WHERE start_time = ?",
      [start_time],
    );
    return rows;
  }

  static async findByEnd(end_time) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM staff_schedules WHERE end_time = ?",
      [end_time],
    );
    return rows;
  }

  static async UpdateUser(schedule_id, user_id) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE staff_schedules SET user_id = ? WHERE schedule_id = ?",
      [user_id, schedule_id],
    );
    return results.affectedRows > 0;
  }

  static async UpdateShift(schedule_id, shift_date) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE staff_schedules SET shift_date = ? WHERE schedule_id = ?",
      [shift_date, schedule_id],
    );
    return results.affectedRows > 0;
  }

  static async UpdateStart(schedule_id, start_time) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE staff_schedules SET start_time = ? WHERE schedule_id = ?",
      [start_time, schedule_id],
    );
    return results.affectedRows > 0;
  }

  static async UpdateEnd(schedule_id, end_time) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE staff_schedules SET end_time = ? WHERE schedule_id = ?",
      [end_time, schedule_id],
    );
    return results.affectedRows > 0;
  }
}

module.exports = StaffModel;
