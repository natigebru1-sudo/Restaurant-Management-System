// controllers/paymentController.js
const PaymentModel = require("../models/paymentsModel");
const { formatCurrency } = require("../utils/formatCurrency");

class PaymentController {
  static async create(req, res) {
    try {
      const {
        order_id,
        payment_method,
        payment_status,
        amount,
        payment_datetime,
        transaction_id,
      } = req.body;

      if (
        !order_id ||
        !payment_method ||
        !payment_status ||
        !amount ||
        !payment_datetime ||
        !transaction_id
      )
        return res.status(400).json({ message: "Required fields are missing" });

      const newPayment = await PaymentModel.create({
        order_id,
        payment_method,
        payment_status,
        amount,
        payment_datetime,
        transaction_id,
      });

      // Format the amount in the response if needed
      const formattedPayment = {
        ...newPayment,
        amount: formatCurrency(newPayment.amount),
      };

      res.status(201).json({
        message: "Payment created successfully",
        data: formattedPayment,
      });
    } catch (error) {
      console.error("Error occurred while creating payments", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getById(req, res) {
    try {
      const { payment_id } = req.params;
      const payment = await PaymentModel.findById(payment_id);
      if (!payment)
        return res.status(404).json({ message: "Payment not found" });

      const formattedPayment = {
        ...payment,
        amount: formatCurrency(payment.amount),
      };

      res
        .status(200)
        .json({ message: "Payment found", data: formattedPayment });
    } catch (error) {
      console.error("Error while retrieving payment", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByMethod(req, res) {
    try {
      const { payment_method } = req.params;
      const methods = await PaymentModel.findByMethod(payment_method);
      if (!methods || methods.length === 0)
        return res.status(404).json({ message: "Payment not found" });

      const formattedMethods = methods.map((payment) => ({
        ...payment,
        amount: formatCurrency(payment.amount),
      }));

      res
        .status(200)
        .json({ message: "Payment found", data: formattedMethods });
    } catch (error) {
      console.error("Error while retrieving payment", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByStatus(req, res) {
    try {
      const { payment_status } = req.params;
      const statuses = await PaymentModel.findByStatus(payment_status);
      if (!statuses || statuses.length === 0)
        return res.status(404).json({ message: "Payment not found" });

      const formattedStatuses = statuses.map((payment) => ({
        ...payment,
        amount: formatCurrency(payment.amount),
      }));

      res
        .status(200)
        .json({ message: "Payment found", data: formattedStatuses });
    } catch (error) {
      console.error("Error while retrieving payment", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByOrder(req, res) {
    try {
      const { order_id } = req.params;
      const orders = await PaymentModel.findByOrder(order_id);
      if (!orders || orders.length === 0)
        return res.status(404).json({ message: "Payment not found" });

      const formattedOrders = orders.map((payment) => ({
        ...payment,
        amount: formatCurrency(payment.amount),
      }));

      res.status(200).json({ message: "Payment found", data: formattedOrders });
    } catch (error) {
      console.error("Error while retrieving payment", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByDate(req, res) {
    try {
      const { payment_datetime } = req.params;
      const dates = await PaymentModel.findByDate(payment_datetime);
      if (!dates || dates.length === 0)
        return res.status(404).json({ message: "Payment not found" });

      const formattedDates = dates.map((payment) => ({
        ...payment,
        amount: formatCurrency(payment.amount),
      }));

      res.status(200).json({ message: "Payment found", data: formattedDates });
    } catch (error) {
      console.error("Error while retrieving payment", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getByTransaction(req, res) {
    try {
      const { transaction_id } = req.params;
      const transactions = await PaymentModel.findByTransaction(transaction_id);
      if (!transactions || transactions.length === 0)
        return res.status(404).json({ message: "Payment not found" });

      const formattedTransactions = Array.isArray(transactions)
        ? transactions.map((payment) => ({
            ...payment,
            amount: formatCurrency(payment.amount),
          }))
        : { ...transactions, amount: formatCurrency(transactions.amount) };

      res
        .status(200)
        .json({ message: "Payment found", data: formattedTransactions });
    } catch (error) {
      console.error("Error while retrieving payment", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateOrder(req, res) {
    try {
      const { payment_id } = req.params;
      const { order_id } = req.body;
      const UpdatedOrder = await PaymentModel.UpdateOrder(payment_id, order_id);
      if (!UpdatedOrder) return res.status(404).json({ message: "Not found" });
      res.status(200).json({ message: "Payment updated successfully" });
    } catch (error) {
      console.error("Error while updating", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateAmount(req, res) {
    try {
      const { payment_id } = req.params;
      const { amount } = req.body;
      const UpdatedAmount = await PaymentModel.UpdateAmount(payment_id, amount);
      if (!UpdatedAmount) return res.status(404).json({ message: "Not found" });
      res.status(200).json({ message: "Payment updated successfully" });
    } catch (error) {
      console.error("Error while updating", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateDate(req, res) {
    try {
      const { payment_id } = req.params;
      const { payment_datetime } = req.body;
      const UpdatedDate = await PaymentModel.UpdateDate(
        payment_id,
        payment_datetime,
      );
      if (!UpdatedDate) return res.status(404).json({ message: "Not found" });
      res.status(200).json({ message: "Payment updated successfully" });
    } catch (error) {
      console.error("Error while updating", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateStatus(req, res) {
    try {
      const { payment_id } = req.params;
      const { payment_status } = req.body;
      const validStatuses = ["pending", "paid", "failed", "refunded"];
      if (!validStatuses.includes(payment_status)) {
        return res
          .status(400)
          .json({ message: "Invalid payment status value" });
      }
      const UpdatedStatus = await PaymentModel.UpdateStatus(
        payment_id,
        payment_status,
      );
      if (!UpdatedStatus) return res.status(404).json({ message: "Not found" });
      res.status(200).json({ message: "Payment updated successfully" });
    } catch (error) {
      console.error("Error while updating", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = PaymentController;
