import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Login first to access this resource.",
      });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Authentication failed" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(400)
        .json({
          success: false,
          message: `Role (${req.user.role}) is not allowed to access this resource`,
        });
    }
    next();
  };
};
