const { getDB } = require("../config/db");

class TableModel {
  static async create(tableData) {
    const db = getDB();
    const { table_number, capacity, status } = tableData;
    const [results] = await db.execute(
      "INSERT INTO tables(table_number, capacity, status) VALUES(?, ?, ?)",
      [table_number, capacity, status],
    );
    return this.findById(results.insertId);
  }

  static async findAll() {
    const db = getDB();
    const [rows] = await db.execute("SELECT * FROM tables");
    return rows;
  }

  static async findById(table_id) {
    const db = getDB();
    const [rows] = await db.execute("SELECT * FROM tables WHERE table_id = ?", [
      table_id,
    ]);
    return rows[0];
  }

  static async findByCapacity(capacity) {
    const db = getDB();
    const [rows] = await db.execute("SELECT * FROM tables WHERE capacity = ?", [
      capacity,
    ]);
    return rows[0];
  }

  static async findByTable(table_number) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM tables WHERE table_number = ?",
      [table_number],
    );
    return rows[0];
  }

  static async findByStatus(status) {
    const db = getDB();
    const [rows] = await db.execute("SELECT * FROM tables WHERE status = ?", [
      status,
    ]);
    return rows;
  }

  static async UpdateTableNumber(table_id, table_number) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE tables SET table_number = ? WHERE table_id = ?",
      [table_number, table_id],
    );
    return results.affectedRows > 0;
  }

  static async UpdateCapacity(table_id, capacity) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE tables SET capacity = ? WHERE table_id = ?",
      [capacity, table_id],
    );
    return results.affectedRows > 0;
  }

  static async UpdateStatus(table_id, status) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE tables SET status = ? WHERE table_id = ?",
      [status, table_id],
    );
    return results.affectedRows > 0;
  }
}

module.exports = TableModel;
