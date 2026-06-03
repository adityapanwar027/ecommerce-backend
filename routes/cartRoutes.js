const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");

// Add product to cart
router.post(
  "/",
  protect,
  [
    body("product").notEmpty().withMessage("Product ID is required"),
    body("quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ],
  validate,
  addToCart
);

// Get logged-in user's cart
router.get("/", protect, getCart);

// Update cart quantity
router.put(
  "/:id",
  protect,
  [
    body("quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ],
  validate,
  updateCartQuantity
);

// Remove from cart
router.delete("/:id", protect, removeFromCart);

module.exports = router;