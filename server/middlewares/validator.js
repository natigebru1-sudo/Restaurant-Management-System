const { body, param, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateUserRegistration = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .optional()
    .isIn(["admin", "staff", "customer"])
    .withMessage("Invalid role specified"),
  validate,
];

const validateUserLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
  validate,
];

const validatePaymentCreate = [
  body("order_id")
    .notEmpty()
    .withMessage("Order ID is required")
    .isInt({ gt: 0 })
    .withMessage("Order ID must be a positive integer"),
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
  body("payment_method")
    .trim()
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["cash", "credit_card", "debit_card", "mobile_payment", "online"])
    .withMessage("Invalid payment method"),
  body("payment_status")
    .optional()
    .isIn(["pending", "completed", "failed", "refunded"])
    .withMessage("Invalid payment status"),
  validate,
];

const validatePaymentId = [
  param("payment_id").isInt({ gt: 0 }).withMessage("Invalid payment ID format"),
  validate,
];

const validateMenuItemCreate = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Menu item name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("category")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Category cannot exceed 50 characters"),
  body("description").optional().trim(),
  validate,
];

const validateMenuItemId = [
  param("item_id").isInt({ gt: 0 }).withMessage("Invalid menu item ID format"),
  validate,
];

const validateIngredientCreate = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Ingredient name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),
  body("stock_quantity")
    .notEmpty()
    .withMessage("Stock quantity is required")
    .isFloat({ min: 0 })
    .withMessage("Stock quantity must be a non-negative number"),
  body("unit_of_measure")
    .trim()
    .notEmpty()
    .withMessage("Unit of measure is required")
    .isLength({ max: 20 })
    .withMessage("Unit of measure cannot exceed 20 characters"),
  validate,
];

const validateIngredientId = [
  param("ingredient_id")
    .isInt({ gt: 0 })
    .withMessage("Invalid ingredient ID format"),
  validate,
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validatePaymentCreate,
  validatePaymentId,
  validateMenuItemCreate,
  validateMenuItemId,
  validateIngredientCreate,
  validateIngredientId,
};
