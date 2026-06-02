const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.post("/", protect, admin, upload.single("image"), addProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, admin, upload.single("image"), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;