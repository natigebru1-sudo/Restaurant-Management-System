const express = require("express");
const router = express.Router();
const TableController = require("../controllers/tableController");
const {
  authenticateToken,
  requireRole,
} = require("../middlewares/authMiddleware");

router.use(authenticateToken);

router.get(
  "/",
  requireRole(["manager", "waitstaff", "cook"]),
  TableController.getAll,
);
router.get(
  "/id/:table_id",
  requireRole(["manager", "waitstaff", "cook"]),
  TableController.getById,
);
router.get(
  "/number/:table_number",
  requireRole(["manager", "waitstaff", "cook"]),
  TableController.getByTable,
);
router.get(
  "/capacity/:capacity",
  requireRole(["manager", "waitstaff", "cook"]),
  TableController.getByCapacity,
);
router.get(
  "/status/:status",
  requireRole(["manager", "waitstaff", "cook"]),
  TableController.getStatus,
);

router.post("/", requireRole(["manager", "waitstaff"]), TableController.create);
router.put(
  "/:table_id/number",
  requireRole(["manager", "waitstaff"]),
  TableController.UpdateTable,
);
router.put(
  "/:table_id/status",
  requireRole(["manager", "waitstaff"]),
  TableController.UpdateStatus,
);
router.put(
  "/:table_id/capacity",
  requireRole(["manager", "waitstaff"]),
  TableController.UpdateCapacity,
);

module.exports = router;
