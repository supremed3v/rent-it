import express from "express";
import {
  allOrders,
  myOrders,
  newOrder,
  sellerOrders,
  updateOrder,
} from "../controllers/orderController.js";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middlewares/authenticate.js";

const router = express.Router();

router.post(
  "/create-order",
  isAuthenticatedUser,
  authorizeRoles("user"),
  newOrder
);
router.get(
  "/get-orders",
  isAuthenticatedUser,
  authorizeRoles("user"),
  myOrders
);

router.put(
  "/update-order/:id",
  isAuthenticatedUser,
  authorizeRoles("seller"),
  updateOrder
);

router.get(
  "/get-seller-orders",
  isAuthenticatedUser,
  authorizeRoles("seller", "admin"),
  sellerOrders
);

router.get(
  "/all-orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  allOrders
);

export default router;
