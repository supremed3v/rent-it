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
  const categories = await Category.find();

  const relatedCat = categories.find((cat) => cat.name === category);
  const relatedCatId = relatedCat._id;
  if (!relatedCat) {
    return res.status(400).json({
      success: false,
      message: "Category not found",
    });
  }

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
  }
  user.rentedItems.push(product._id);
  const pushCat = await Category.findById(relatedCatId);
  pushCat.relatedProducts.push(product._id);
  await pushCat.save({ validateBeforeSave: false });
  await user.save();

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
};
