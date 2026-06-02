const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

// Place order
router.post("/", protect, placeOrder);

// Get my orders
router.get("/my", protect, getMyOrders);

// Get all orders - Admin
router.get("/", protect, admin, getAllOrders);

// Update order status - Admin
router.put("/:id", protect, admin, updateOrderStatus);

module.exports = router;