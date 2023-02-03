import express from "express";
import {
  createPayment,
  createSellerAccount,
  createSellerTransfer,
  getAccountDetails,
  sellerSales,
  sendPubKey,
} from "../controllers/paymentController.js";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/get-pub-key", sendPubKey);
router.post("/create-payment-intent", createPayment);
router.post(
  "/create-bank-account",
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

export default router;
