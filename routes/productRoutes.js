const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const validate = require("../middleware/validationMiddleware");

// Add Product
router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  [
    body("name").notEmpty().withMessage("Product name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("category").notEmpty().withMessage("Category is required"),
    body("stock").isNumeric().withMessage("Stock must be a number"),
  ],
  validate,
  addProduct
);

router.get("/", getProducts);
router.get("/:id", getProductById);

router.put(
  "/:id",
  protect,
  admin,
  upload.single("image"),
  updateProduct
);

router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;