const express = require("express");
const router = express.Router();
const ReservationController = require("../controllers/reservationController");
const {
  authenticateToken,
  requireRole,
} = require("../middlewares/authMiddleware");

router.use(authenticateToken);

router.get(
  "/id/:reservation_id",
  requireRole(["manager", "waitstaff", "cook"]),
  ReservationController.getById,
);
router.get(
  "/name/:customer_name",
  requireRole(["manager", "waitstaff", "cook"]),
  ReservationController.getByName,
);
router.get(
  "/contact/:customer_phone",
  requireRole(["manager", "waitstaff", "cook"]),
  ReservationController.getByContact,
);
router.get(
  "/date/:reservation_datetime",
  requireRole(["manager", "waitstaff", "cook"]),
  ReservationController.getByDate,
);
router.get(
  "/table/:table_id",
  requireRole(["manager", "waitstaff", "cook"]),
  ReservationController.getByTable,
);
router.get(
  "/guests/:num_guests",
  requireRole(["manager", "waitstaff", "cook"]),
  ReservationController.getByGuests,
);
router.get(
  "/status/:status",
  requireRole(["manager", "waitstaff", "cook"]),
  ReservationController.getByStatus,
);

router.post(
  "/",
  requireRole(["manager", "waitstaff"]),
  ReservationController.create,
);
router.put(
  "/:reservation_id/name",
  requireRole(["manager", "waitstaff"]),
  ReservationController.UpdateName,
);
router.put(
  "/:reservation_id/contact",
  requireRole(["manager", "waitstaff"]),
  ReservationController.UpdateContact,
);
router.put(
  "/:reservation_id/table",
  requireRole(["manager", "waitstaff"]),
  ReservationController.UpdateTable,
);
router.put(
  "/:reservation_id/date",
  requireRole(["manager", "waitstaff"]),
  ReservationController.UpdateDate,
);
router.put(
  "/:reservation_id/guests",
  requireRole(["manager", "waitstaff"]),
  ReservationController.UpdateNum,
);
router.put(
  "/:reservation_id/status",
  requireRole(["manager", "waitstaff"]),
  ReservationController.UpdateStatus,
);

module.exports = router;
