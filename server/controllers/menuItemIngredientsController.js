const MenuItemIngredientModel = require("../models/menuitemingredientsModel");

class MenuItemIngredientController {
  static async create(req, res) {
    try {
      const { item_id, ingredient_id, quantity_needed } = req.body;
      if (!item_id || !ingredient_id || !quantity_needed)
        return res
          .status(400)
          .json({ message: "Required fields must me filled" });
      const newMenuItemIngredient = await MenuItemIngredientModel.create({
        item_id,
        ingredient_id,
        quantity_needed,
      });
      res
        .status(201)
        .json({ message: "Menu item ingredients created successfully" });
    } catch (error) {
      console.error("Error while creating menu item ingredient", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getById(req, res) {
    try {
      const { menu_item_ingredients_id } = req.params;
      const menuItems = await MenuItemIngredientModel.findById(
        menu_item_ingredients_id,
      );
      if (!menuItems)
        return res.status(404).json({ message: "Menu items not found" });
      res
        .status(200)
        .json({ message: "Retrived successfully", data: menuItems });
    } catch (error) {
      console.error("Error while retriving menu item ingredient", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByItem(req, res) {
    try {
      const { item_id } = req.params;
      const Items = await MenuItemIngredientModel.findByItem(item_id);
      if (!Items || Items.length === 0)
        return res.status(404).json({ message: "Menu items not found" });
      res.status(200).json({ message: "Retrived successfully", data: Items });
    } catch (error) {
      console.error("Error while retriving menu item ingredient", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByIngredient(req, res) {
    try {
      const { ingredient_id } = req.params;
      const Ingredients =
        await MenuItemIngredientModel.findByIngredient(ingredient_id);
      if (!Ingredients || Ingredients.length === 0)
        return res.status(404).json({ message: "Menu items not found" });
      res
        .status(200)
        .json({ message: "Retrived successfully", data: Ingredients });
    } catch (error) {
      console.error("Error while retriving menu item ingredient", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByQuantity(req, res) {
    try {
      const { quantity_needed } = req.params;
      const Quantities =
        await MenuItemIngredientModel.findByQuantity(quantity_needed);
      if (!Quantities || Quantities.length === 0)
        return res.status(404).json({ message: "Menu items not found" });
      res
        .status(200)
        .json({ message: "Retrived successfully", data: Quantities });
    } catch (error) {
      console.error("Error while retriving menu item ingredient", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateItem(req, res) {
    try {
      const { menu_item_ingredients_id } = req.params;
      const { item_id } = req.body;
      const updatedItem = await MenuItemIngredientModel.updateItem(
        menu_item_ingredients_id,
        item_id,
      );
      if (!updatedItem)
        return res.status(404).json({ message: "Menu item not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while retriving menu item ingredient", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateIngredient(req, res) {
    try {
      const { menu_item_ingredients_id } = req.params;
      const { ingredient_id } = req.body;
      const updatedIngredient = await MenuItemIngredientModel.updateIngredient(
        menu_item_ingredients_id,
        ingredient_id,
      );
      if (!updatedIngredient)
        return res.status(404).json({ message: "Menu item not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while retriving menu item ingredient", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateQuantity(req, res) {
    try {
      const { menu_item_ingredients_id } = req.params;
      const { quantity_needed } = req.body;
      const updatedQuantity = await MenuItemIngredientModel.updateQuantity(
        menu_item_ingredients_id,
        quantity_needed,
      );
      if (!updatedQuantity)
        return res.status(404).json({ message: "Menu item not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while retriving menu item ingredient", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = MenuItemIngredientController;
