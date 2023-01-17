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

// @desc    Get all products
// @route   GET /api/v1/products

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

// @desc    Get single product
// @route   GET /api/v1/product/:id

export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
};

// @desc    Update product
// @route   PUT /api/v1/admin/product/:id

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  if (
    (product.seller.toString() !== req.user.id && req.user.role !== "admin") ||
    req.user.role !== "seller"
  ) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to update this product",
    });
  }

  let productFields = req.body;

  product = await Product.findByIdAndUpdate(req.params.id, productFields, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
};

// @desc    Delete product
// @route   DELETE /api/v1/admin/product/:id

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  if (
    product.seller.toString() !== req.user.id ||
    req.user.role !== "admin" ||
    req.user.role !== "seller"
  ) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to delete this product",
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};

export const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user.id,
    };

    product.reviews.push(review);

    product.numOfReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

export const getTopProducts = async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);

  if (!products) {
    res.status(404);
    throw new Error("Products not found with a rating of 5");
  }

  res.status(200).json({
    success: true,
    products,
  });
};

export const replyReview = async (req, res) => {
  const { comment } = req.body;

  const product = await Product.findById(req.params.id);
  const user = await User.findById(req.user.id);

  const reply = {
    name: user.name,
    reply: comment,
    user: user._id,
  };

  if (product) {
    const review = product.reviews.find(
      (r) => r._id.toString() === req.params.reviewId.toString()
    );

    if (reply.user.toString() !== product.seller.toString()) {
      res.status(401);
      throw new Error("Not authorized to reply this review");
    }

    if (review) {
      review.reply.push(reply);
      await product.save();
      res.status(201).json({ message: "Reply added" });
    } else {
      res.status(404);
      throw new Error("Review not found");
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

export const deleteReview = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const review = product.reviews.find(
      (r) => r._id.toString() === req.params.reviewId.toString()
    );

    if (review) {
      if (
        review.user.toString() !== req.user.id.toString() &&
        req.user.role !== "admin"
      ) {
        res.status(401);
        throw new Error("Not authorized to delete this review");
      }
      await product.reviews.pull(review._id);
      await product.save();
      res.status(201).json({ message: "Review deleted" });
    } else {
      res.status(404);
      throw new Error("Review not found");
    }
  }
};

export const deleteReply = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const review = product.reviews.find(
      (r) => r._id.toString() === req.params.reviewId.toString()
    );

    if (review) {
      const reply = review.reply.find(
        (r) => r._id.toString() === req.params.replyId.toString()
      );

      if (reply) {
        if (
          (reply.user.toString() !== req.user.id.toString() &&
            req.user.role !== "seller") ||
          req.user.role !== "admin"
        ) {
          res.status(401);
          throw new Error("Not authorized to delete this reply");
        }
        await review.reply.pull(reply._id);
        await product.save();
        res.status(201).json({ message: "Reply deleted" });
      } else {
        res.status(404);
        throw new Error("Reply not found");
      }
    } else {
      res.status(404);
      throw new Error("Review not found");
    }
  }
};

export const getProductsByCategory = async (req, res) => {
  const categories = await Category.find({});
  const products = await Product.find({});

  const productByCategories = categories.map((category) => {
    const productsByCategory = products.filter(
      (product) => product.category === category.name
    );
    return {
      category: {
        categoryName: category.name,
        categoryImage: category.image,
      },
      products: productsByCategory,
      count: productsByCategory.length,
    };
  });

  res.json(productByCategories);
};
