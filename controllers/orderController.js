const Order = require("../models/Order");
const Cart = require("../models/Cart");
const asyncHandler = require("../middleware/asyncHandler");

// Place Order
const placeOrder = asyncHandler(async (req, res) => {
  const cartItems = await Cart.find({
    user: req.user._id,
    product: { $exists: true },
  }).populate("product");

  if (cartItems.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  const items = cartItems.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
  }));

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const order = await Order.create({
    user: req.user._id,
    items,
    totalPrice,
  });

  await Cart.deleteMany({ user: req.user._id });

  res.status(201).json({
    message: "Order placed successfully",
    order,
  });
});

// Get My Orders
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "items.product"
  );

  res.status(200).json(orders);
});

// Get All Orders - Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("items.product");

  res.status(200).json(orders);
});

// Update Order Status - Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = status;
  await order.save();

  res.status(200).json({
    message: "Order status updated successfully",
    order,
  });
});

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};