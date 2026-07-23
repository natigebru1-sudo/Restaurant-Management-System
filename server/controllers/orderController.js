const OrderModel = require("../models/orderModel");

class OrderController {
  static async create(req, res) {
    try {
      const { user_id, table_id, order_datetime, total_amount, status } =
        req.body;
      if (!user_id || !table_id || !order_datetime || !total_amount || !status)
        return res.status(400).json({ message: "Required fields are missing" });
      const newOrder = await OrderModel.create({
        user_id,
        table_id,
        order_datetime,
        total_amount,
        status,
      });
      res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
      console.error("Error while creating orders", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getById(req, res) {
    try {
      const { order_item_id } = req.params;
      const ordersItems = await OrderModel.findById(order_item_id);
      if (!ordersItems)
        return res.status(404).json({ message: "Orders not found" });
      res
        .status(200)
        .json({ message: "Orders retrivied successfully", data: ordersItems });
    } catch (error) {
      console.error("Error while retriving orders", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getById(req, res) {
    try {
      const { order_id } = req.params;
      const orders = await OrderModel.findById(order_id);
      if (!orders) return res.status(404).json({ message: "Orders not found" });
      res
        .status(200)
        .json({ message: "Orders retrivied successfully", data: orders });
    } catch (error) {
      console.error("Error while retriving orders", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByUser(req, res) {
    try {
      const { user_id } = req.params;
      const users = await OrderModel.findByUser(user_id);
      if (!users || users.length === 0)
        return res.status(404).json({ message: "Orders not found" });
      res
        .status(200)
        .json({ message: "Orders retrivied successfully", data: users });
    } catch (error) {
      console.error("Error while retriving orders", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByTable(req, res) {
    try {
      const { table_id } = req.params;
      const tables = await OrderModel.findByTable(table_id);
      if (!tables || tables.length === 0)
        return res.status(404).json({ message: "Orders not found" });
      res
        .status(200)
        .json({ message: "Orders retrivied successfully", data: tables });
    } catch (error) {
      console.error("Error while retriving orders", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByStatus(req, res) {
    try {
      const { status } = req.params;
      const Stats = await OrderModel.findByStatus(status);
      if (!Stats || Stats.length === 0)
        return res.status(404).json({ message: "Orders not found" });
      res
        .status(200)
        .json({ message: "Orders retrivied successfully", data: Stats });
    } catch (error) {
      console.error("Error while retriving orders", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByDate(req, res) {
    try {
      const { order_datetime } = req.params;
      const Dates = await OrderModel.findByDate(order_datetime);
      if (!Dates || Dates.length === 0)
        return res.status(404).json({ message: "Orders not found" });
      res
        .status(200)
        .json({ message: "Orders retrivied successfully", data: Dates });
    } catch (error) {
      console.error("Error while retriving orders", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateUser(req, res) {
    try {
      const { order_id } = req.params;
      const { user_id } = req.body;
      const updatedUser = await OrderModel.UpdateUser(order_id, user_id);
      if (!updatedUser)
        return res.status(404).json({ message: "Order not found" });
      res.status(200).json({ message: "Orders updated successfully" });
    } catch (error) {
      console.error("Error while updating orders", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateTable(req, res) {
    try {
      const { order_id } = req.params;
      const { table_id } = req.body;
      const updatedTable = await OrderModel.UpdateTable(order_id, table_id);
      if (!updatedTable)
        return res.status(404).json({ message: "Order not found" });
      res.status(200).json({ message: "Orders updated successfully" });
    } catch (error) {
      console.error("Error while updating orders", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateStatus(req, res) {
    try {
      const { order_id } = req.params;
      const { status } = req.body;
      const validStatuses = ["pending", "preparing", "completed", "cancelled"];
      if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid order status value" });
      }
      const updatedStatus = await OrderModel.UpdateStatus(order_id, status);
      if (!updatedStatus)
        return res.status(404).json({ message: "Order not found" });
      res.status(200).json({ message: "Orders updated successfully" });
    } catch (error) {
      console.error("Error while updating orders", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateDate(req, res) {
    try {
      const { order_id } = req.params;
      const { order_datetime } = req.body;
      const updatedDate = await OrderModel.UpdateDate(order_id, order_datetime);
      if (!updatedDate)
        return res.status(404).json({ message: "Order not found" });
      res.status(200).json({ message: "Orders updated successfully" });
    } catch (error) {
      console.error("Error while updating orders", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = OrderController;
