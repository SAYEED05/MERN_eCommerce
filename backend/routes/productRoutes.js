import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getProductsByCategory,
  getProductsByBrand,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//path to all products
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);

//path to single product by id
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

router.route("/category/:category").get(getProductsByCategory);
router.route("/brand/:brand").get(getProductsByBrand);
export default router;
