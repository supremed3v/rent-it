import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  verifySeller,
  verifySellerOtp,
} from "../controllers/userController.js";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", isAuthenticatedUser, getUserProfile);
router.post(
  "/register-seller",
  isAuthenticatedUser,
  authorizeRoles("user"),
  verifySeller
);
router.put(
  "/verify-seller",
  isAuthenticatedUser,
  authorizeRoles("user"),
  verifySellerOtp
);

export default router;
