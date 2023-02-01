import express from "express";
import {
  createPayment,
  createSellerAccount,
  createSellerTransfer,
  getAccountDetails,
  sellerSales,
} from "../controllers/paymentController.js";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middlewares/authenticate";

const router = express.Router();

router.post("/create-payment-intent", createPayment);
router.post(
  "/create-seller-account",
  isAuthenticatedUser,
  authorizeRoles("seller"),
  createSellerAccount
);
router.get(
  "/get-account-details",
  isAuthenticatedUser,
  authorizeRoles("seller", "admin"),
  getAccountDetails
);
router.post(
  "/create-seller-transfer",
  isAuthenticatedUser,
  authorizeRoles("seller", "admin"),
  createSellerTransfer
);

router.get(
  "/get-seller-sales",
  isAuthenticatedUser,
  authorizeRoles("seller", "admin"),
  sellerSales
);
