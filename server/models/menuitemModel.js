const { getDB } = require("../config/db");

class MenuItemModel {
  static async create(menuItemData) {
    const db = getDB();
    const { category_id, name, description, price, is_available, image_url } =
      menuItemData;

    const [results] = await db.execute(
      "INSERT INTO menu_items(category_id, name, description, price, is_available, image_url) VALUES(?, ?, ?, ?, ?, ?) ",
      [
        category_id,
        name,
        description,
        price,
        is_available !== undefined ? is_available : true,
        image_url,
      ],
    );
    return this.findById(results.insertId);
  }

  static async findById(item_id) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM menu_items WHERE item_id = ?",
      [item_id],
    );
    return rows[0];
  }

  static async findAll() {
    const db = getDB();
    const [rows] = await db.execute(
      `
        SELECT menu_items.*, menu_categories.name AS category_name
        FROM menu_items
        LEFT JOIN menu_categories ON menu_items.category_id = menu_categories.category_id
      `,
    );
    return rows;
  }

  static async findByCategory(category_id) {
    const db = getDB();
    const [rows] = await db.execute(
      `
        SELECT menu_items.*, menu_categories.name AS category_name
        FROM menu_items
        JOIN menu_categories ON menu_items.category_id = menu_categories.category_id
        WHERE menu_items.category_id = ?
        `,
      [category_id],
    );
    return rows;
  }

  static async findByName(name) {
    const db = getDB();
    const [rows] = await db.execute("SELECT * FROM menu_items WHERE name = ?", [
      name,
    ]);
    return rows;
  }

  static async findByDescription(description) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM menu_items WHERE description = ?",
      [description],
    );
    return rows;
  }

  static async findByPrice(price) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM menu_items WHERE price = ?",
      [price],
    );
    return rows;
  }

  static async findByAvailability(is_available) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM menu_items WHERE is_available = ?",
      [is_available],
    );
    return rows;
  }

  static async findByImage(image_url) {
    const db = getDB();
    const [rows] = await db.execute(
      "SELECT * FROM menu_items WHERE image_url = ?",
      [image_url],
    );
    return rows;
  }

  static async updatecategory(item_id, category_id) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE menu_items SET category_id = ? WHERE item_id = ?",
      [category_id, item_id],
    );
    return results.affectedRows > 0;
  }

  static async updateName(item_id, name) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE menu_items SET name = ? WHERE item_id = ?",
      [name, item_id],
    );
    return results.affectedRows > 0;
  }

  static async updateDescription(item_id, description) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE menu_items SET description = ? WHERE item_id = ?",
      [description, item_id],
    );
    return results.affectedRows > 0;
  }

  static async updatePrice(item_id, price) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE menu_items SET price = ? WHERE item_id = ?",
      [price, item_id],
    );
    return results.affectedRows > 0;
  }

  static async updateImage(item_id, image_url) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE menu_items SET image_url = ? WHERE item_id = ?",
      [image_url, item_id],
    );
    return results.affectedRows > 0;
  }

  static async updateAvailability(item_id, is_available) {
    const db = getDB();
    const [results] = await db.execute(
      "UPDATE menu_items SET is_available = ? WHERE item_id = ?",
      [is_available, item_id],
    );
    return results.affectedRows > 0;
  }
}

module.exports = MenuItemModel;
