const express = require("express");
const router = express.Router();
const StaffController = require("../controllers/staffSchedulesController");
const {
  authenticateToken,
  requireRole,
} = require("../middlewares/authMiddleware");

router.use(authenticateToken, requireRole(["manager"]));

router.get("/id/:schedule_id", StaffController.getById);
router.get("/user/:user_id", StaffController.getByUser);
router.get("/start/:start_time", StaffController.getByStart);
router.get("/date/:shift_date", StaffController.getByDate);
router.get("/end/:end_time", StaffController.getByEnd);

router.post("/", StaffController.create);
router.put("/:schedule_id/user", StaffController.UpdateUser);
router.put("/:schedule_id/shift", StaffController.UpdateShift);
router.put("/:schedule_id/start", StaffController.UpdatedStart);
router.put("/:schedule_id/end", StaffController.UpdatedEnd);

module.exports = router;
