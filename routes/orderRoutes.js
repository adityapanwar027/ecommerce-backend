const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");

// Place order
router.post("/", protect, placeOrder);

// Get my orders
router.get("/my", protect, getMyOrders);

// Get all orders - Admin
router.get("/", protect, admin, getAllOrders);

// Update order status - Admin
router.put(
  "/:id",
  protect,
  admin,
  [
    body("status")
      .notEmpty()
      .withMessage("Status is required")
      .isIn(["Pending", "Processing", "Shipped", "Delivered"])
      .withMessage("Invalid status"),
  ],
  validate,
  updateOrderStatus
);

module.exports = router;