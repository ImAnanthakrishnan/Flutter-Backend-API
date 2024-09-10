import express, { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/products/productCrud";
import productValidate from "../middlewares/products/productValidation";

const router: Router = express.Router();
router.post("/", productValidate, createProduct);
router.get("/", getAllProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .put(productValidate, updateProduct)
  .delete(deleteProduct);

export default router;