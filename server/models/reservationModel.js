const { getDB } = require("../config/db");

class ReservationModel {
  static async create(reservationData) {
    const db = getDB();
    const {
      customer_name,
      customer_phone,
      table_id,
      reservation_datetime,
      num_guests,
      status,
    } = reservationData;

    const [results] = await db.execute(
      "INSERT INTO reservations(customer_name, customer_phone, table_id, reservation_datetime, num_guests, status) VALUES(?, ?, ?, ?, ?, ?)",
      [
        customer_name,
        customer_phone,
        table_id,
        reservation_datetime,
        num_guests,
        status || "Confirmed",
      ],
    );
    return this.findById(results.insertId);
  }

  static async findById(reservation_id) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM reservations WHERE reservation_id = ?",
      [reservation_id],
    );
    return rows[0];
  }

  static async findByTable(table_id) {
    const db = getDB();
    const [rows] = await db.execute(
      `
      SELECT reservations.*, tables.table_number, tables.capacity 
      FROM reservations 
      JOIN tables ON reservations.table_id = tables.table_id
      WHERE reservations.table_id = ?
      `,
      [table_id],
    );
    return rows;
  }

  static async findByName(customer_name) {
    const db = getDB();
    const [rows] = await db.execute(
      `
      SELECT reservations.*, user.username, user.email
      FROM reservations 
      JOIN user ON reservations.customer_name = user.username
      WHERE reservations.customer_name = ?
      `,
      [customer_name],
    );
    return rows;
  }

  static async findByContact(customer_phone) {
    const db = getDB();
    const [rows] = await db.execute(
      `
      SELECT reservations.*, user.contact_info
      FROM reservations
      JOIN user ON reservations.customer_phone = user.contact_info
      WHERE reservations.customer_phone = ?
      `,
      [customer_phone],
    );
    return rows;
  }

  static async findByDate(reservation_datetime) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM reservations WHERE reservation_datetime = ?",
      [reservation_datetime],
    );
    return rows;
  }

  static async findByGuests(num_guests) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM reservations WHERE num_guests = ?",
      [num_guests],
    );
    return rows;
  }

  static async findByStatus(status) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM reservations WHERE status = ?",
      [status],
    );
    return rows;
  }

  static async UpdateName(reservation_id, customer_name) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE reservations SET customer_name = ? WHERE reservation_id = ?",
      [customer_name, reservation_id],
    );
    return results.affectedRows > 0;
  }

  static async UpdatePhone(reservation_id, customer_phone) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE reservations SET customer_phone = ? WHERE reservation_id = ?",
      [customer_phone, reservation_id],
    );
    return results.affectedRows > 0;
  }

  static async UpdateTable(reservation_id, table_id) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE reservations SET table_id = ? WHERE reservation_id = ?",
      [table_id, reservation_id],
    );
    return results.affectedRows > 0;
  }

  static async UpdateDate(reservation_id, reservation_datetime) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE reservations SET reservation_datetime = ? WHERE reservation_id = ?",
      [reservation_datetime, reservation_id],
    );
    return results.affectedRows > 0;
  }

  static async UpdateNum(reservation_id, num_guests) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE reservations SET num_guests = ? WHERE reservation_id = ?",
      [num_guests, reservation_id],
    );
    return results.affectedRows > 0;
  }

  static async UpdateStatus(reservation_id, status) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE reservations SET status = ? WHERE reservation_id = ?",
      [status, reservation_id],
    );
    return results.affectedRows > 0;
  }
}

module.exports = ReservationModel;
