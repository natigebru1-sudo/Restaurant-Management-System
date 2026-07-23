const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const {
  authenticateToken,
  requireRole,
} = require("../middlewares/authMiddleware");

// All order management routes require authentication
router.use(authenticateToken);

// Retrieve orders (Accessible to managers, waitstaff, and cooks)
router.get(
  "/id/:order_id",
  requireRole(["manager", "waitstaff", "cook"]),
  OrderController.getById,
);
router.get(
  "/user/:user_id",
  requireRole(["manager", "waitstaff", "cook"]),
  OrderController.getByUser,
);
router.get(
  "/table/:table_id",
  requireRole(["manager", "waitstaff", "cook"]),
  OrderController.getByTable,
);
router.get(
  "/status/:status",
  requireRole(["manager", "waitstaff", "cook"]),
  OrderController.getByStatus,
);
router.get(
  "/date/:order_datetime",
  requireRole(["manager", "waitstaff", "cook"]),
  OrderController.getByDate,
);

router.post("/", requireRole(["manager", "waitstaff"]), OrderController.create);
router.put(
  "/:order_id/user",
  requireRole(["manager", "waitstaff"]),
  OrderController.UpdateUser,
);

router.put(
  "/:order_id/table",
  requireRole(["manager", "waitstaff"]),
  OrderController.UpdateTable,
);

router.put(
  "/:order_id/status",
  requireRole(["manager", "waitstaff", "cook"]),
  OrderController.UpdateStatus,
);

router.put(
  "/:order_id/date",
  requireRole(["manager", "waitstaff"]),
  OrderController.UpdateDate,
);

module.exports = router;
