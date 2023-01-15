import { sendToken } from "../middlewares/sendToken.js";
import User from "../models/UserModel.js";

// @desc    Register a user

// @route   POST /api/v1/register

// @access  Public

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 200, res);
};
