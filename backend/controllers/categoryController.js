import Category from "../models/CategoryModel.js";
import cloudinary from "cloudinary";

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

  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "categories",
  });

  req.body.image = {
    public_id: result.public_id,
    url: result.secure_url,
  };

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

export const updateCategory = async (req, res) => {
  const category = Category.findById(req.params.id);

  const { name, image } = req.body;
  const newCategoryData = {
    name: req.body.name === category.name ? category.name : req.body.name,
  };

  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "categories",
  });
  newCategoryData.image = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  if (!name) {
    req.body.name = category.name;
  } else {
    req.body.name = name;
  }

  const updateCategory = await Category.findByIdAndUpdate(
    req.params.id,
    newCategoryData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Category updated successfully",
  });
};
