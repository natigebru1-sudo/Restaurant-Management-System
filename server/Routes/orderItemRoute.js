const express = require("express");
const router = express.Router();
const OrderItemController = require("../controllers/orderItemController");
const {
  authenticateToken,
  requireRole,
} = require("../middlewares/authMiddleware");

router.use(authenticateToken, requireRole(["manager", "waitstaff", "cook"]));

router.get("/id/:order_item_id", OrderItemController.getById);
router.get("/order/:order_id", OrderItemController.getByOrders);
router.get("/item/:item_id", OrderItemController.getByItem);
router.get("/price/:unit_price", OrderItemController.getByPrice);
router.get("/quantity/:quantity", OrderItemController.getByQuantity);
router.get("/request/:special_requests", OrderItemController.getByRequest);

router.post("/", OrderItemController.create);
router.put("/:order_item_id/order", OrderItemController.UpdateOrder);
router.put("/:order_item_id/item", OrderItemController.UpdateItem);
router.put("/:order_item_id/quantity", OrderItemController.UpdateQuantity);
router.put("/:order_item_id/price", OrderItemController.UpdatePrice);
router.put("/:order_item_id/request", OrderItemController.UpdateRequest);

module.exports = router;
