import express from "express";
import Product from "../models/productModel.js";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middlewares/authenticate";
import { newProduct } from "../controllers/productController";
const router = express.Router();

router.post("/add", isAuthenticatedUser, authorizeRoles("seller"), newProduct);

export default router;
