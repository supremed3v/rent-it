import Category from "../models/CategoryModel.js";

// @desc    Get all categories
// @route   GET /api/v1/categories

// @access  Public

export const getCategories = async (req, res) => {
  const categories = await Category.find();
  const categoryNames = categories.map((category) => category.name);
  res.status(200).json({
    success: true,
    categories,
    categoryNames,
  });

  if (!categories) {
    return res.status(400).json({
      success: false,
      message: "Categories not found",
    });
  }
};

export const addCategory = async (req, res) => {
  const { name, image } = req.body;
  if (!name || !image) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
  }
  const category = await Category.create({
    name,
    image,
  });
  res.status(201).json({
    success: true,
    message: "Category created successfully",
    category,
  });
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return res.status(400).json({
      success: false,
      message: "Category not found",
    });
  }
  await category.remove();
};
