const { getDB } = require("../config/db");

class IngredientModel {
  static async create(IngredientData) {
    const db = getDB();
    const { name, stock_quantity, unit_of_measure } = IngredientData;
    const [results] = await db.execute(
      "INSERT INTO ingredients(name, stock_quantity, unit_of_measure) VALUES(?, ?, ?)",
      [name, stock_quantity, unit_of_measure],
    );
    return this.findById(results.insertId);
  }

  static async findById(ingredient_id) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM ingredients WHERE ingredient_id = ?",
      [ingredient_id],
    );
    return rows[0];
  }

  static async findByName(name) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM ingredients WHERE name = ?",
      [name],
    );
    return rows[0];
  }

  static async findByStock(stock_quantity) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM ingredients WHERE stock_quantity = ?",
      [stock_quantity],
    );
    return rows;
  }

  static async findByUnit(unit_of_measure) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM ingredients WHERE unit_of_measure = ?",
      [unit_of_measure],
    );
    return rows;
  }

  static async findAll() {
    const db = getDB();
    const [rows] = await db.execute("SELECT * FROM ingredients");
    return rows;
  }

  static async updateName(ingredient_id, name) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE ingredients SET name = ? WHERE ingredient_id = ?",
      [name, ingredient_id],
    );
    return results.affectedRows > 0;
  }

  static async updatestock(ingredient_id, stock_quantity) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE ingredients SET stock_quantity = ? WHERE ingredient_id = ?",
      [stock_quantity, ingredient_id],
    );
    return results.affectedRows > 0;
  }

  static async updateUnit(ingredient_id, unit_of_measure) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE ingredients SET unit_of_measure = ? WHERE ingredient_id = ?",
      [unit_of_measure, ingredient_id],
    );
    return results.affectedRows > 0;
  }
}

module.exports = IngredientModel;
