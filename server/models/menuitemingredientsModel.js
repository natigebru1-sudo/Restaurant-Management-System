const { getDB } = require("../config/db");

class MenuItemIngredientModel {
  static async create(MenuIgredientData) {
    const db = getDB();
    const { item_id, ingredient_id, quantity_needed } = MenuIgredientData;
    const [results] = await db.execute(
      "INSERT INTO menu_item_ingredients(item_id, ingredient_id, quantity_needed) VALUES(?, ?, ?)",
      [item_id, ingredient_id, quantity_needed],
    );
    return this.findById(results.insertId);
  }

  static async findById(menu_item_ingredients_id) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM menu_item_ingredients WHERE menu_item_ingredients_id = ?",
      [menu_item_ingredients_id],
    );
    return rows[0];
  }

  static async findByItem(item_id) {
    const db = getDB();
    const [rows] = await db.execute(
      `
        SELECT menu_item_ingredients.*, menu_items.name, menu_items.price 
        FROM menu_item_ingredients
        JOIN menu_items ON menu_item_ingredients.item_id = menu_items.item_id
        WHERE menu_item_ingredients.item_id = ?
        `,
      [item_id],
    );
    return rows;
  }

  static async findByIngredient(ingredient_id) {
    const db = getDB();
    const [rows] = await db.execute(
      `
        SELECT menu_item_ingredients.*, ingredients.name, ingredients.stock_quantity
        FROM menu_item_ingredients
        JOIN ingredients ON menu_item_ingredients.ingredient_id = ingredients.ingredient_id
        WHERE menu_item_ingredients.ingredient_id = ?
        `,
      [ingredient_id],
    );
    return rows;
  }

  static async findByQuantity(quantity_needed) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM menu_item_ingredients WHERE quantity_needed = ?",
      [quantity_needed],
    );
    return rows;
  }

  static async updateItem(menu_item_ingredients_id, item_id) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE menu_item_ingredients SET item_id = ? WHERE menu_item_ingredients_id = ?",
      [item_id, menu_item_ingredients_id],
    );
    return results.affectedRows > 0;
  }

  static async updateIngredient(menu_item_ingredients_id, ingredient_id) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE menu_item_ingredients SET ingredient_id = ? WHERE menu_item_ingredients_id = ?",
      [ingredient_id, menu_item_ingredients_id],
    );
    return results.affectedRows > 0;
  }

  static async updateQuantity(menu_item_ingredients_id, quantity_needed) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE menu_item_ingredients SET quantity_needed = ? WHERE menu_item_ingredients_id = ?",
      [quantity_needed, menu_item_ingredients_id],
    );
    return results.affectedRows > 0;
  }
}

module.exports = MenuItemIngredientModel;
