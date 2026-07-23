const express = require("express");
const router = express.Router();
const MenuItemController = require("../controllers/menuItemController");
const {
  authenticateToken,
  requireRole,
} = require("../middlewares/authMiddleware");
const {
  validateMenuItemCreate,
  validateMenuItemId,
} = require("../middlewares/validator");

router.get("/", MenuItemController.getAll);
router.get("/id/:item_id", validateMenuItemId, MenuItemController.getById);
router.get("/category/:category_id", MenuItemController.getByCategory);
router.get("/name/:name", MenuItemController.getByName);
router.get("/description/:description", MenuItemController.getByDescription);
router.get("/price/:price", MenuItemController.getByPrice);
router.get("/availability/:is_available", MenuItemController.getByAvailabilty);
router.get("/image/:image_url", MenuItemController.getByImage);

router.post(
  "/",
  authenticateToken,
  validateMenuItemCreate,
  requireRole(["manager", "cook"]),
  MenuItemController.create,
);
router.put(
  "/:item_id/name",
  authenticateToken,
  requireRole(["manager", "cook"]),
  MenuItemController.UpdateName,
);
router.put(
  "/:item_id/category",
  authenticateToken,
  requireRole(["manager", "cook"]),
  MenuItemController.Updatecategory,
);
router.put(
  "/:item_id/description",
  authenticateToken,
  requireRole(["manager", "cook"]),
  MenuItemController.UpdatecDescription,
);
router.put(
  "/:item_id/price",
  authenticateToken,
  requireRole(["manager", "cook"]),
  MenuItemController.UpdatePrice,
);
router.put(
  "/:item_id/availability",
  authenticateToken,
  requireRole(["manager", "cook"]),
  MenuItemController.UpdateAvailability,
);
router.put(
  "/:item_id/image",
  authenticateToken,
  requireRole(["manager", "cook"]),
  MenuItemController.UpdateImage,
);

module.exports = router;
