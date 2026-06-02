const Product = require("../models/Product");

// Add product
const addProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.log("Product Add Error:", error);

    res.status(500).json({
      message: "Product add failed",
      error: error.message,
    });
  }
};

// Get products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get single product by id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
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
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};