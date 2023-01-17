import { sendToken } from "../middlewares/sendToken.js";
import User from "../models/UserModel.js";
import crypto from "crypto";
import { sendMail } from "../middlewares/sendMail.js";

// @desc    Register a user

// @route   POST /api/v1/register

// @access  Public

export const registerUser = async (req, res) => {
  const { name, email, password, avatar } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
  }

  const valUser = await User.findOne({ email });
  if (valUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  sendToken(user, 200, res);
};

// @desc    Login user

// @route   POST /api/v1/login

// @access  Public

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
  }

  const { token } = req.cookies;

  if (token) {
    return res.status(400).json({
      success: false,
      message: "You are already logged in",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(400).json({
      success: false,
      message: "Incorrect Password",
    });
  }

  sendToken(user, 200, res);
};

// @desc    Logout user

// @route   GET /api/v1/logout

export const logoutUser = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

// @desc    Get currently logged in user details

// @route   GET /api/v1/me

// @access  Private

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};

// @desc    Update / Change password

// @route   PUT /api/v1/password/update

// @access  Private

export const updatePassword = async (req, res) => {
  const user = await User.findById(req.user.id).select("+password");

  const isMatched = await user.comparePassword(req.body.oldPassword);

  if (!isMatched) {
    return res.status(400).json({
      success: false,
      message: "Old password is incorrect",
    });
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
};

// @desc    Update user profile

// @route   PUT /api/v1/me/update

// @access  Private

export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.avatar !== "") {
    user.avatar = req.body.avatar || user.avatar;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
};

// @desc    Forgot password

// @route   POST /api/v1/password/forgot

// @access  Public

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found with this email",
    });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  await user.save();

  const resetUrl = `http://localhost:3000/password/reset/${resetToken}`;

  const message = `
    <h1>You have requested a password reset</h1>
    <p>Please go to this link to reset your password</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    <hr />
    <p>This email may contain sensitive information</p>
  `;

  try {
    await sendMail({
      email: user.email,
      subject: "Password reset request",
      text: message,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Reset password

// @route   PUT /api/v1/password/reset/:token

// @access  Public

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset token",
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserRole = async (req, res) => {
  const userRole = {
    role: req.body.role,
  };

  try {
    const user = await User.findByIdAndUpdate(req.params.id, userRole, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
