import express from "express";
import {
  adminLogin,
  getAllUsers,
  getSellerDetails,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  setPushToken,
  verifySeller,
  verifySellerOtp,
  verifyUserImage,
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
  "/generate-otp",
  isAuthenticatedUser,
  authorizeRoles("user"),
  verifySeller
);
router.put("/verify-seller", verifySellerOtp);

router.post("/verify-image", verifyUserImage);

router.post("/set-pushToken", isAuthenticatedUser, setPushToken);

router.post("/admin-login", adminLogin);
router.get(
  "/seller-details/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSellerDetails
);

router.get(
  "/allUsers",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUsers
);

export default router;
