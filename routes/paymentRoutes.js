const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  createPaymentOrder,
  verifyPayment,
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");

// Create Razorpay Order
router.post(
  "/create-order",
  protect,
  [
    body("amount")
      .isNumeric()
      .withMessage("Amount must be a number")
      .custom((value) => value > 0)
      .withMessage("Amount must be greater than 0"),
  ],
  validate,
  createPaymentOrder
);

// Verify Razorpay Payment
router.post(
  "/verify",
  protect,
  [
    body("razorpay_order_id")
      .notEmpty()
      .withMessage("Order ID is required"),
    body("razorpay_payment_id")
      .notEmpty()
      .withMessage("Payment ID is required"),
    body("razorpay_signature")
      .notEmpty()
      .withMessage("Signature is required"),
  ],
  validate,
  verifyPayment
);

module.exports = router;