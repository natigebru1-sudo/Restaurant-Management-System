const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentController");
const {
  authenticateToken,
  requireRole,
} = require("../middlewares/authMiddleware");
const {
  validatePaymentCreate,
  validatePaymentId,
} = require("../middlewares/validator");

router.use(authenticateToken);

router.get(
  "/id/:payment_id",
  validatePaymentId,
  requireRole(["manager", "waitstaff"]),
  PaymentController.getById,
);
router.get(
  "/method/:payment_method",
  requireRole(["manager", "waitstaff"]),
  PaymentController.getByMethod,
);
router.get(
  "/status/:payment_status",
  requireRole(["manager", "waitstaff"]),
  PaymentController.getByStatus,
);
router.get(
  "/order/:order_id",
  requireRole(["manager", "waitstaff"]),
  PaymentController.getByOrder,
);
router.get(
  "/date/:payment_datetime",
  requireRole(["manager", "waitstaff"]),
  PaymentController.getByDate,
);
router.get(
  "/transaction/:transaction_id",
  requireRole(["manager", "waitstaff"]),
  PaymentController.getByTransaction,
);

router.post(
  "/",
  validatePaymentCreate,
  requireRole(["manager", "waitstaff"]),
  PaymentController.create,
);
router.put(
  "/:payment_id/order",
  requireRole(["manager"]),
  PaymentController.UpdateOrder,
);
router.put(
  "/:payment_id/amount",
  requireRole(["manager"]),
  PaymentController.UpdateAmount,
);
router.put(
  "/:payment_id/date",
  requireRole(["manager"]),
  PaymentController.UpdateDate,
);
router.put(
  "/:payment_id/status",
  requireRole(["manager", "waitstaff"]),
  PaymentController.UpdateStatus,
);

module.exports = router;
