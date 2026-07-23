const OrderItemModel = require("../models/orderItemModel");

class OrderItemController {
  static async create(req, res) {
    try {
      const { order_id, item_id, quantity, unit_price, special_requests } =
        req.body;
      if (
        !order_id ||
        !item_id ||
        !quantity ||
        !unit_price ||
        !special_requests
      )
        return res
          .status(400)
          .json({ message: "Required fields must be filled in" });
      const newOrderItem = await OrderItemModel.create({
        order_id,
        item_id,
        quantity,
        unit_price,
        special_requests,
      });
      res.status(201).json({ message: "Order items created successfully" });
    } catch (error) {
      console.error("Error occured while creating order items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getById(req, res) {
    try {
      const { order_item_id } = req.params;
      const orderItems = await OrderItemModel.findById(order_item_id);
      if (!orderItems)
        return res.status(404).json({ message: "Order items not found" });
      res
        .status(200)
        .json({ message: "Retrived successfully", data: orderItems });
    } catch (error) {
      console.error("Error occured while retriving order items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByOrders(req, res) {
    try {
      const { order_id } = req.params;
      const orders = await OrderItemModel.findByOrder(order_id);
      if (!orders || orders.length === 0)
        return res.status(404).json({ message: "Order items not found" });
      res.status(200).json({ message: "Retrived successfully", data: orders });
    } catch (error) {
      console.error("Error occured while retriving order items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByItem(req, res) {
    try {
      const { item_id } = req.params;
      const items = await OrderItemModel.findByItem(item_id);
      if (!items || items.length === 0)
        return res.status(404).json({ message: "Order items not found" });
      res.status(200).json({ message: "Retrived successfully", data: items });
    } catch (error) {
      console.error("Error occured while retriving order items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByPrice(req, res) {
    try {
      const { unit_price } = req.params;
      const prices = await OrderItemModel.findByPrice(unit_price);
      if (!prices || prices.length === 0)
        return res.status(404).json({ message: "Order items not found" });
      res.status(200).json({ message: "Retrived successfully", data: prices });
    } catch (error) {
      console.error("Error occured while retriving order items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByQuantity(req, res) {
    try {
      const { quantity } = req.params;
      const quantities = await OrderItemModel.findByQuantity(quantity);
      if (!quantities || quantities.length === 0)
        return res.status(404).json({ message: "Order items not found" });
      res
        .status(200)
        .json({ message: "Retrived successfully", data: quantities });
    } catch (error) {
      console.error("Error occured while retriving order items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByRequest(req, res) {
    try {
      const { special_requests } = req.params;
      const requests = await OrderItemModel.findByRequest(special_requests);
      if (!requests || requests.length === 0)
        return res.status(404).json({ message: "Order items not found" });
      res
        .status(200)
        .json({ message: "Retrived successfully", data: requests });
    } catch (error) {
      console.error("Error occured while retriving order items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateOrder(req, res) {
    try {
      const { order_item_id } = req.params;
      const { order_id } = req.body;
      const updatedOrder = await OrderItemModel.UpdateOrder(
        order_item_id,
        order_id,
      );
      if (!updatedOrder) return res.status(404).json({ message: "Not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error occured while updating order items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateItem(req, res) {
    try {
      const { order_item_id } = req.params;
      const { item_id } = req.body;
      const updatedItem = await OrderItemModel.UpdateItem(
        order_item_id,
        item_id,
      );
      if (!updatedItem) return res.status(404).json({ message: "Not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error occured while updating order items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdatePrice(req, res) {
    try {
      const { order_item_id } = req.params;
      const { unit_price } = req.body;
      const updatedPrice = await OrderItemModel.UpdatePrice(
        order_item_id,
        unit_price,
      );
      if (!updatedPrice) return res.status(404).json({ message: "Not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error occured while updating order items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateQuantity(req, res) {
    try {
      const { order_item_id } = req.params;
      const { quantity } = req.body;
      const updatedQuantity = await OrderItemModel.UpdateQuantity(
        order_item_id,
        quantity,
      );
      if (!updatedQuantity)
        return res.status(404).json({ message: "Not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error occured while updating order items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateRequest(req, res) {
    try {
      const { order_item_id } = req.params;
      const { special_requests } = req.body;
      const updatedRequest = await OrderItemModel.UpdateRequest(
        order_item_id,
        special_requests,
      );
      if (!updatedRequest)
        return res.status(404).json({ message: "Not found" });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.error("Error occured while updating order items", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = OrderItemController;
