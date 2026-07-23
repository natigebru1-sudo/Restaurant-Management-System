const express = require("express");
const router = express.Router();
const IngredientController = require("../controllers/ingredientsController");
const {
  authenticateToken,
  requireRole,
} = require("../middlewares/authMiddleware");
const {
  validateIngredientCreate,
  validateIngredientId,
} = require("../middlewares/validator");

router.use(authenticateToken);

router.get(
  "/",
  requireRole(["manager", "waitstaff", "cook"]),
  IngredientController.getAll,
);

router.get(
  "/id/:ingredient_id",
  validateIngredientId,
  requireRole(["manager", "waitstaff", "cook"]),
  IngredientController.getById,
);

router.get(
  "/name/:name",
  requireRole(["manager", "waitstaff", "cook"]),
  IngredientController.getByName,
);

router.get(
  "/stock/:stock_quantity",
  requireRole(["manager", "waitstaff", "cook"]),
  IngredientController.getByStock,
);

router.get(
  "/unit/:unit_of_measure",
  requireRole(["manager", "waitstaff", "cook"]),
  IngredientController.getByUnit,
);

router.post(
  "/",
  validateIngredientCreate,
  requireRole(["manager", "cook"]),
  IngredientController.create,
);

router.put(
  "/:ingredient_id/name",
  requireRole(["manager", "cook"]),
  IngredientController.UpdateName,
);

router.put(
  "/:ingredient_id/unit",
  requireRole(["manager", "cook"]),
  IngredientController.UpdateUnit,
);

router.put(
  "/:ingredient_id/stock",
  requireRole(["manager", "cook"]),
  IngredientController.UpdateStock,
);

module.exports = router;
