import express from "express";
import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  addProductReview,
} from "../controllers/productController.js";
import { protect, checkAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, checkAdmin, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, checkAdmin, deleteProduct)
  .put(protect, checkAdmin, updateProduct);
router.route("/:id/reviews").post(protect, addProductReview);

export default router;
