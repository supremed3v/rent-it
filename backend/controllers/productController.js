import Product from "../models/ProductModel.js";
import Category from "../models/CategoryModel.js";
import User from "../models/UserModel.js";

// @desc    Create new product
// @route   POST /api/v1/admin/product/new
// @access  Private

export const newProduct = async (req, res) => {
  const { name, price, description, category, images } = req.body;

  if (!name || !price || !description || !category || !images) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
  }

  const user = await User.findById(req.user.id);

  const product = await Product.create({
    name,
    price,
    description,
    category,
    images,
    seller: req.user.id,
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  } else if (user.role !== "seller" || user.role !== "admin") {
    return res.status(400).json({
      success: false,
      message: "Not authorized",
    });
  } else {
    const category = await Category.find({ name: category });
    category.relatedProducts.push(product._id);
    user.rentedItems.push(product);
    await category.save();
  }

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
};
