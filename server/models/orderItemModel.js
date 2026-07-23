const { getDB } = require("../config/db");

class OrderItemModel {
  static async create(orderItemData) {
    const db = getDB();
    const { order_id, item_id, quantity, unit_price, special_requests } =
      orderItemData;
    const [results] = await db.execute(
      "INSERT INTO order_items(order_id, item_id, quantity, unit_price, special_requests) VALUES(?, ?, ?, ?, ?)",
      [order_id, item_id, quantity, unit_price, special_requests],
    );

    return this.findById(results.insertId);
  }

  static async findById(order_item_id) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM order_items WHERE order_item_id = ?",
      [order_item_id],
    );

    return rows[0];
  }

  static async findByOrder(order_id) {
    const db = getDB();
    const [rows] = await db.execute(
      `
        SELECT order_items.*, orders.order_datetime, orders.total_amount
        FROM order_items
        JOIN orders ON order_items.order_id = orders.order_id
        WHERE order_items.order_id = ?
        `,
      [order_id],
    );

    return rows;
  }

  static async findByItem(item_id) {
    const db = getDB();
    const [rows] = await db.execute(
      `
        SELECT order_items.*, menu_items.name, menu_items.price
        FROM order_items
        JOIN menu_items ON order_items.item_id = menu_items.item_id
        WHERE order_items.item_id = ?
        `,
      [item_id],
    );

    return rows;
  }

  static async findByPrice(unit_price) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM order_items WHERE unit_price = ?",
      [unit_price],
    );
    return rows;
  }

  static async findByQuantity(quantity) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM order_items WHERE quantity = ?",
      [quantity],
    );
    return rows;
  }

  static async findByRequest(special_requests) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM order_items WHERE special_requests = ?",
      [special_requests],
    );
    return rows;
  }

  static async UpdateOrder(order_item_id, order_id) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE order_items SET order_id = ? WHERE order_item_id = ?",
      [order_id, order_item_id],
    );

    return results.affectedRows > 0;
  }

  static async UpdateItem(order_item_id, item_id) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE order_items SET item_id = ? WHERE order_item_id = ?",
      [item_id, order_item_id],
    );

    return results.affectedRows > 0;
  }

  static async UpdateQuantity(order_item_id, quantity) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE order_items SET quantity = ? WHERE order_item_id = ?",
      [quantity, order_item_id],
    );

    return results.affectedRows > 0;
  }

  static async UpdatePrice(order_item_id, unit_price) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE order_items SET unit_price = ? WHERE order_item_id = ?",
      [unit_price, order_item_id],
    );

    return results.affectedRows > 0;
  }

  static async UpdateRequest(order_item_id, special_requests) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE order_items SET special_requests = ? WHERE order_item_id = ?",
      [special_requests, order_item_id],
    );

    return results.affectedRows > 0;
  }
}

module.exports = OrderItemModel;
