import Product from "../models/ProductModel.js";
import Category from "../models/CategoryModel.js";

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

  const product = await Product.create({
    name,
    price,
    description,
    category,
    images,
    seller: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
};
