import express from "express";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middlewares/authenticate.js";
import { newProduct } from "../controllers/productController.js";
import {
  addCategory,
  getCategories,
} from "../controllers/categoryController.js";
const router = express.Router();

router.post(
  "/add",
  isAuthenticatedUser,
  authorizeRoles("seller", "admin"),
  newProduct
);
router.post(
  "/addCategory",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  addCategory
);

router.get(
  "/categories",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getCategories
);

export default router;
