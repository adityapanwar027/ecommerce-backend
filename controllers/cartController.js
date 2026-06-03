const Cart = require("../models/Cart");
const asyncHandler = require("../middleware/asyncHandler");

// Add to Cart
const addToCart = asyncHandler(async (req, res) => {
  const { product, quantity } = req.body;

  const cartItem = await Cart.create({
    user: req.user._id,
    product,
    quantity,
  });

  res.status(201).json({
    message: "Product added to cart",
    cartItem,
  });
});

// Get Cart
const getCart = asyncHandler(async (req, res) => {
  const cartItems = await Cart.find({ user: req.user._id }).populate("product");

  res.status(200).json(cartItems);
});

// Update Cart Quantity
const updateCartQuantity = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  const cartItem = await Cart.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!cartItem) {
    res.status(404);
    throw new Error("Cart item not found");
  }

  cartItem.quantity = quantity;
  await cartItem.save();

  res.status(200).json({
    message: "Cart updated successfully",
    cartItem,
  });
});

// Remove from Cart
const removeFromCart = asyncHandler(async (req, res) => {
  const cartItem = await Cart.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!cartItem) {
    res.status(404);
    throw new Error("Cart item not found");
  }

  res.status(200).json({
    message: "Product removed from cart",
  });
});

module.exports = {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
};