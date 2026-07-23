const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const {
  authenticateToken,
  requireRole,
} = require("../middlewares/authMiddleware");

router.use(authenticateToken);

router.get("/:user_id", UserController.getById);
router.get("/username/:username", UserController.getByUsername);

router.put("/:user_id/username", UserController.UpdateUsername);
router.put("/:user_id/email", UserController.UpdateEmail);
router.put("/:user_id/password", UserController.UpdatePassword);
router.put("/:user_id/contact", UserController.UpdateContact);

router.delete("/:user_id", requireRole(["manager"]), UserController.deleteSoft);

module.exports = router;
