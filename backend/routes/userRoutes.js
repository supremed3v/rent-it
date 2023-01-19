import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", isAuthenticatedUser, getUserProfile);

export default router;
