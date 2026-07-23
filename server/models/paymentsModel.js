const { getDB } = require("../config/db");

class PaymentModel {
  static async create(paymentData) {
    const db = getDB();
    const {
      order_id,
      payment_method,
      payment_status,
      amount,
      payment_datetime,
      transaction_id,
    } = paymentData;

    const [results] = await db.execute(
      "INSERT INTO payments(order_id, payment_method, payment_status, amount, payment_datetime, transaction_id) VALUES(?, ?, ?, ?, ?, ?)",
      [
        order_id,
        payment_method,
        payment_status || "pending",
        amount,
        payment_datetime,
        transaction_id,
      ],
    );
    return this.findById(results.insertId);
  }

  static async findById(payment_id) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM payments WHERE payment_id = ?",
      [payment_id],
    );
    return rows[0];
  }

  static async findByOrder(order_id) {
    const db = getDB();
    const [rows] = await db.execute(
      `
      SELECT payments.*, orders.order_datetime, orders.total_amount
      FROM payments
      JOIN orders ON payments.order_id = orders.order_id
      WHERE payments.order_id = ?
      `,
      [order_id],
    );
    return rows;
  }

  static async findByMethod(payment_method) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM payments WHERE payment_id = ?",
      [payment_method],
    );
    return rows;
  }

  static async findByStatus(payment_status) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM payments WHERE payment_id = ?",
      [payment_status],
    );
    return rows;
  }

  static async findByDate(payment_datetime) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM payments WHERE payment_id = ?",
      [payment_datetime],
    );
    return rows;
  }

  static async findByTransaction(transaction_id) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM payments WHERE payment_id = ?",
      [transaction_id],
    );
    return rows;
  }

  static async UpdateOrder(payment_id, order_id) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE payments SET order_id = ? WHERE payment_id = ?",
      [order_id, payment_id],
    );
    return results.affectedRows > 0;
  }

  static async UpdateMethod(payment_id, payment_method) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE payments SET payment_method = ? WHERE payment_id = ?",
      [payment_method, payment_id],
    );
    return results.affectedRows > 0;
  }

  static async UpdateStatus(payment_id, payment_status) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE payments SET payment_status = ? WHERE payment_id = ?",
      [payment_status, payment_id],
    );
    return results.affectedRows > 0;
  }

  static async UpdateAmount(payment_id, amount) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE payments SET amount = ? WHERE payment_id = ?",
      [amount, payment_id],
    );
    return results.affectedRows > 0;
  }

  static async UpdateDate(payment_id, payment_datetime) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE payments SET payment_datetime = ? WHERE payment_id = ?",
      [payment_datetime, payment_id],
    );
    return results.affectedRows > 0;
  }
}

module.exports = PaymentModel;
