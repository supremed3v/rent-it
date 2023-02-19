import express from "express";
import {
  adminLogin,
  getAllUsers,
  getSellerDetails,
  getSellerProducts,
  getSellers,
  getSingleUser,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  sendSellerMessage,
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
  authorizeRoles("admin", "seller"),
  getSellerDetails
);

router.get(
  "/allUsers",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUsers
);

router.get(
  "/sellers",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSellers
);

router.get(
  "/user-details/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSingleUser
);

router.get(
  "/get-rented-products/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "seller"),
  getSellerProducts
);

router.post(
  "/send-email",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  sendSellerMessage
);

export default router;
