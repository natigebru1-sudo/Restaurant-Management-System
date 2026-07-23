const TableModel = require("../models/tableModel");

class TableController {
  static async create(req, res) {
    try {
      const { table_number, capacity, status } = req.body;
      if (!table_number || !capacity || !status)
        return res.status(400).json({ message: "Required fields are missing" });

      const newTable = await TableModel.create({
        table_number,
        capacity,
        status,
      });
      res
        .status(201)
        .json({ message: "Table created successfully", data: newTable });
    } catch (error) {
      console.error("Error while creating table", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getById(req, res) {
    try {
      const { table_id } = req.params;
      const table = await TableModel.findById(table_id);
      if (!table) return res.status(404).json({ message: "Table not found" });

      res
        .status(200)
        .json({ message: "Table retrieved successfully", data: table });
    } catch (error) {
      console.error("Error while retrieving", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByTable(req, res) {
    try {
      const { table_number } = req.params;
      const nums = await TableModel.findByTable(table_number);
      if (!nums || nums.length === 0)
        return res.status(404).json({ message: "Table not found" });
      res
        .status(200)
        .json({ message: "Table number retrived successfully", data: nums });
    } catch (error) {
      console.error("Error while retiving", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByCapacity(req, res) {
    try {
      const { capacity } = req.params;
      const tables = await TableModel.findByCapacity(capacity);
      if (!tables || tables.length === 0)
        return res
          .status(404)
          .json({ message: "No tables found with this capacity" });

      res
        .status(200)
        .json({ message: "Tables retrieved successfully", data: tables });
    } catch (error) {
      console.error("Error while retrieving", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getStatus(req, res) {
    try {
      const { status } = req.params;
      const Stat = await TableModel.findByStatus(status);
      if (!Stat || Stat.length === 0)
        return res.status(404).json({ message: "Table not found" });
      res
        .status(200)
        .json({ message: "Table status retrived successfully", data: Stat });
    } catch (error) {
      console.error("Error while retiving", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAll(req, res) {
    try {
      const allTables = await TableModel.findAll();
      res
        .status(200)
        .json({ message: "Tables retrieved successfully", data: allTables });
    } catch (error) {
      console.error("Error while retrieving", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateTable(req, res) {
    try {
      const { table_id } = req.params;
      const { table_number } = req.body;
      const UpdatedTable = await TableModel.UpdateTableNumber(
        table_id,
        table_number,
      );
      if (!UpdatedTable)
        return res.status(404).json({ message: "Table not found" });
      res.status(200).json({ message: "Table number updated successfully" });
    } catch (error) {
      console.error("Error while retiving", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateStatus(req, res) {
    try {
      const { table_id } = req.params;
      const { status } = req.body;
      const UpdatedStatus = await TableModel.UpdateStatus(table_id, status);
      if (!UpdatedStatus)
        return res.status(404).json({ message: "Table not found" });
      res.status(200).json({ message: "Table status updated successfully" });
    } catch (error) {
      console.error("Error while retiving", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateCapacity(req, res) {
    try {
      const { table_id } = req.params;
      const { capacity } = req.body;
      const UpdatedCapacity = await TableModel.UpdateCapacity(
        table_id,
        capacity,
      );
      if (!UpdatedCapacity)
        return res.status(404).json({ message: "Table not found" });
      res.status(200).json({ message: "Table capacity updated successfully" });
    } catch (error) {
      console.error("Error while retiving", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = TableController;
