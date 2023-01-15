import express from "express";
import Product from "../models/productModel.js";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middlewares/authenticate.js";
import { newProduct } from "../controllers/productController.js";
import { addCategory } from "../controllers/categoryController.js";
const router = express.Router();

router.post("/add", isAuthenticatedUser, authorizeRoles("seller"), newProduct);
router.post(
  "/addCategory",
  isAuthenticatedUser,
  authorizeRoles("seller"),
  addCategory
);

export default router;
