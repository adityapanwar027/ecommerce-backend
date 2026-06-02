const express = require("express");
const router = express.Router();

const {
  createPaymentOrder,
  verifyPayment,
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");

// Create Razorpay Order
router.post("/create-order", protect, createPaymentOrder);

// Verify Razorpay Payment
router.post("/verify", protect, verifyPayment);

module.exports = router;