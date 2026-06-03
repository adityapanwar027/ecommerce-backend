const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

// Add product
const addProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({
    ...req.body,
    image: req.file ? req.file.path : "",
  });

  res.status(201).json({
    message: "Product added successfully",
    product,
  });
});

// Get products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
});

// Get single product by id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const updateData = {
    ...req.body,
  };

  if (req.file) {
    updateData.image = req.file.path;
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    message: "Product updated successfully",
    product,
  });
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    message: "Product deleted successfully",
  });
});

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};