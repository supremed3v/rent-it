import express from "express";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middlewares/authenticate.js";
import {
  getLatestProducts,
  getProduct,
  getProducts,
  getProductsByCategory,
  getProductsBySeller,
  getTopProducts,
  newProduct,
  updateProductStatus,
} from "../controllers/productController.js";
import {
  addCategory,
  getCategories,
  updateCategory,
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

router.put(
  "/updateCategory/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateCategory
);

router.get("/categories", getCategories);
router.get("/getCategoriesProducts/:category", getProductsByCategory);
router.get(
  "/seller-products",
  isAuthenticatedUser,
  authorizeRoles("seller"),
  getProductsBySeller
);

router.get("/latest-products", getLatestProducts);
router.get("/top-products", getTopProducts);
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.put(
  "/product/approve/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProductStatus
);

export default router;
