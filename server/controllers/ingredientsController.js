const IngredientModel = require("../models/ingredientsModel");

class IngredientController {
  static async create(req, res) {
    try {
      const { name, stock_quantity, unit_of_measure } = req.body;
      if (!name || !stock_quantity || !unit_of_measure)
        return res.status(400).json({ message: "Required fields are missing" });
      const newIngredient = await IngredientModel.create({
        name,
        stock_quantity,
        unit_of_measure,
      });
      res.status(201).json({
        message: "Ingredient created successfully",
        data: newIngredient,
      });
    } catch (error) {
      console.error("Error while creating ingredients", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getById(req, res) {
    try {
      const { ingredient_id } = req.params;
      const ingredient = await IngredientModel.findById(ingredient_id);
      if (!ingredient)
        return res.status(404).json({ message: "Ingredient not found" });
      res
        .status(200)
        .json({ message: "Ingredient found successfully", data: ingredient });
    } catch (error) {
      console.error("Error while retrieving ingredients", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByName(req, res) {
    try {
      const { name } = req.params;
      const ingredient = await IngredientModel.findByName(name);
      if (!ingredient)
        return res.status(404).json({ message: "Ingredient not found" });
      res
        .status(200)
        .json({ message: "Ingredient found successfully", data: ingredient });
    } catch (error) {
      console.error("Error while retrieving ingredients", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByStock(req, res) {
    try {
      const { stock_quantity } = req.params;
      const stocks = await IngredientModel.findByStock(stock_quantity);
      if (!stocks || stocks.length === 0)
        return res.status(404).json({ message: "Ingredient not found" });
      res
        .status(200)
        .json({ message: "Ingredient found successfully", data: stocks });
    } catch (error) {
      console.error("Error while retrieving ingredients", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByUnit(req, res) {
    try {
      const { unit_of_measure } = req.params;
      const units = await IngredientModel.findByUnit(unit_of_measure);
      if (!units || units.length === 0)
        return res.status(404).json({ message: "Ingredient not found" });
      res
        .status(200)
        .json({ message: "Ingredient found successfully", data: units });
    } catch (error) {
      console.error("Error while retrieving ingredients", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAll(req, res) {
    try {
      const ingredients = await IngredientModel.findAll();
      if (!ingredients || ingredients.length === 0)
        return res.status(404).json({ message: "Ingredient not found" });
      res
        .status(200)
        .json({ message: "Ingredient found successfully", data: ingredients });
    } catch (error) {
      console.error("Error while retrieving ingredients", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateName(req, res) {
    try {
      const { ingredient_id } = req.params;
      const { name } = req.body;
      const updatedName = await IngredientModel.updateName(ingredient_id, name);
      if (!updatedName)
        return res.status(404).json({ message: "Ingredient not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while updating ingredients", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateUnit(req, res) {
    try {
      const { ingredient_id } = req.params;
      const { unit_of_measure } = req.body;
      const updatedUnit = await IngredientModel.updateUnit(
        ingredient_id,
        unit_of_measure,
      );
      if (!updatedUnit)
        return res.status(404).json({ message: "Ingredient not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while updating ingredients", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateStock(req, res) {
    try {
      const { ingredient_id } = req.params;
      const { stock_quantity } = req.body;
      const updatedStock = await IngredientModel.updatestock(
        ingredient_id,
        stock_quantity,
      );
      if (!updatedStock)
        return res.status(404).json({ message: "Ingredient not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error while updating ingredients", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = IngredientController;
