const express = require("express");
const router = express.Router();
const MenuItemIngredientController = require("../controllers/menuItemIngredientsController");
const {
  authenticateToken,
  requireRole,
} = require("../middlewares/authMiddleware");

router.use(authenticateToken);

router.get(
  "/id/:menu_item_ingredients_id",
  requireRole(["manager", "waitstaff", "cook"]),
  MenuItemIngredientController.getById,
);
router.get(
  "/item/:item_id",
  requireRole(["manager", "waitstaff", "cook"]),
  MenuItemIngredientController.getByItem,
);
router.get(
  "/ingredient/:ingredient_id",
  requireRole(["manager", "waitstaff", "cook"]),
  MenuItemIngredientController.getByIngredient,
);
router.get(
  "/quantity/:quantity_needed",
  requireRole(["manager", "waitstaff", "cook"]),
  MenuItemIngredientController.getByQuantity,
);

// Create and update menu item ingredients (Restricted to managers and cooks)
router.post(
  "/",
  requireRole(["manager", "cook"]),
  MenuItemIngredientController.create,
);
router.put(
  "/:menu_item_ingredients_id/item",
  requireRole(["manager", "cook"]),
  MenuItemIngredientController.UpdateItem,
);
router.put(
  "/:menu_item_ingredients_id/ingredient",
  requireRole(["manager", "cook"]),
  MenuItemIngredientController.UpdateIngredient,
);
router.put(
  "/:menu_item_ingredients_id/quantity",
  requireRole(["manager", "cook"]),
  MenuItemIngredientController.UpdateQuantity,
);

module.exports = router;
