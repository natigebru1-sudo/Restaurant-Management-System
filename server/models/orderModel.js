const { getDB } = require("../config/db");

class OrderModel {
  static async create(orderData) {
    const db = getDB();
    const { user_id, table_id, order_datetime, total_amount, status } =
      orderData;

    const [results] = await db.execute(
      "INSERT INTO orders(user_id, table_id, order_datetime, total_amount, status) VALUES(?, ?, ?, ?, ?)",
      [user_id, table_id, order_datetime, total_amount, status || "pending"],
    );
    return this.findById(results.insertId);
  }

  static async findById(order_id) {
    const db = getDB();
    const [rows] = await db.execute("SELECT * FROM orders WHERE order_id = ?", [
      order_id,
    ]);
    return rows[0];
  }

  static async findByDate(order_datetime) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM orders WHERE order_datetime = ?",
      [order_datetime],
    );
    return rows;
  }

  static async findByStatus(status) {
    const db = getDB();
    const [rows] = await db.execute("SELECT * FROM orders WHERE status = ?", [
      status,
    ]);
    return rows;
  }

  static async findByUser(user_id) {
    const db = getDB();
    const [rows] = await db.execute(
      `
        SELECT orders.*, users.username, users.email
        FROM orders
        JOIN users ON orders.user_id = users.user_id
        WHERE orders.user_id = ?
        `,
      [user_id],
    );

    return rows;
  }

  static async findByTable(table_id) {
    const db = getDB();
    const [rows] = await db.execute(
      `
        SELECT orders.*, tables.table_num, tables.table_capacity
        FROM orders
        JOIN tables ON orders.table_id = tables.table_id
        WHERE orders.table_id = ?
        `,
      [table_id],
    );

    return rows;
  }

  static async UpdateUser(order_id, user_id) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE orders SET user_id = ? WHERE order_id = ?",
      [user_id, order_id],
    );

    return results.affectedRows > 0;
  }

  static async UpdateTable(order_id, table_id) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE orders SET table_id = ? WHERE order_id = ?",
      [table_id, order_id],
    );

    return results.affectedRows > 0;
  }

  static async UpdateDate(order_id, order_datetime) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE orders SET order_datetime = ? WHERE order_id = ?",
      [order_datetime, order_id],
    );

    return results.affectedRows > 0;
  }

  static async UpdateStatus(order_id, status) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE orders SET status = ? WHERE order_id = ?",
      [status, order_id],
    );

    return results.affectedRows > 0;
  }
}

module.exports = OrderModel;
