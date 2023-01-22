import { sendToken } from "../middlewares/sendToken.js";
import User from "../models/UserModel.js";
import { sendMail } from "../middlewares/sendMail.js";
import otpGenerator from "otp-generator";
import cloudinary from "cloudinary";

// @desc    Register a user

// @route   POST /api/v1/register

// @access  Public

export const registerUser = async (req, res) => {
  const { name, email, password, avatar } = req.body;
  try {
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
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
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    sendToken(user, 201, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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
  if (!user) {
    res.status(404).json({
      success: false,
      message: "Please login",
    });
  }
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

  const resetOtp = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });

  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  user.resetPasswordToken = resetOtp;
  user.resetPasswordExpire = expiry;

  await user.save();

  const message =
    `Dear User, \n\n` +
    "OTP for Reset Password is : \n\n" +
    `${resetOtp}\n\n` +
    "This is a auto-generated email. Please do not reply to this email.\n\n" +
    "Regards\n\n";

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

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSellers = async (req, res) => {
  try {
    const sellers = await User.find({ role: "seller" });
    res.status(200).json({
      success: true,
      sellers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifySeller = async (req, res) => {
  const seller = await User.findById(req.user.id);
  const { idCardNumber } = req.body;
  if (seller.role !== "user") {
    res.status(400).send({
      success: true,
      message: "You are already eligible for renting your products",
    });
  }

  const email = seller.email;

  const resetOtp = otpGenerator.generate(5, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });

  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  seller.verifySellerToken = resetOtp;
  seller.verifySellerTokenExpiry = expiry;
  seller.idCardNumber = idCardNumber;

  await seller.save();

  const message =
    `Dear User, \n\n` +
    "OTP for Account Verification for Seller is : \n\n" +
    `${resetOtp}\n\n` +
    "This is a auto-generated email. Please do not reply to this email.\n\n" +
    "Regards\n\n";

  try {
    await sendMail({
      email: email,
      subject: "Seller Account Verification",
      text: message,
    });
  } catch (error) {
    seller.verifySellerToken = undefined;
    seller.verifySellerTokenExpiry = undefined;

    await seller.save();

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifySellerOtp = async (req, res) => {
  const { otp } = req.body;
  try {
    const seller = User.findOne({
      verifySellerToken: otp,
      verifySellerTokenExpiry: { $gt: Date.now() },
    });
    if (!seller) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (otp !== seller.verifySellerToken) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP",
      });
    }
    seller.role = "seller";
    seller.verifySellerToken = undefined;
    seller.verifySellerTokenExpiry = undefined;
    await seller.save();

    res.status(200).json({
      success: true,
      message: "Congratulation you've successfully become a seller now!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
