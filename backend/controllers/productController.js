import Product from "../models/ProductModel.js";
import Category from "../models/CategoryModel.js";
import User from "../models/UserModel.js";
import cloudinary from "cloudinary";

// @desc    Create new product
// @route   POST /api/v1/admin/product/new
// @access  Private

export const newProduct = async (req, res) => {
  const { name, price, description, category } = req.body;

  if (!name || !price || !description || !category) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
  }

  const user = await User.findById(req.user.id);
  const categories = await Category.find();

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "rental",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  console.log(imagesLinks);

  req.body.images = imagesLinks;

  const relatedCat = categories.find((cat) => cat.name === category);
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
    images: req.body.images,
    seller: req.user.id,
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }
  user.rentedItems.push(product._id);
  // Category count update
  relatedCat.relatedProducts.push(product._id);
  await relatedCat.save();
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
  const products = await Product.find({ available: true });
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
  let queryString = req.params.category;
  const myQuery = queryString.replace(/%20/g, " ");
  const products = await Product.find({ category: myQuery });
  const category = await Category.findOne({ name: myQuery });

  if (!products) {
    res.status(404);
    throw new Error("Products not found");
  }

  const productsWithCategory = products.map((product) => {
    if (product.category === category.name) {
      return {
        ...product._doc,
      };
    }
  });
  res.status(200).json({
    success: true,
    products: productsWithCategory,
  });
};

// @desc    Get update product status
// @route   PUT /api/products/:id
// @access  Private/Admin

export const updateProductStatus = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    if (req.user.role !== "admin") {
      res.status(401);
      throw new Error("Not authorized to update this product");
    }

    if (product.isApproved === true) {
      res.status(401);
      throw new Error("Product already approved");
    }

    product.isApproved = req.body.isApproved;
    await product.save({
      validateBeforeSave: false,
    });
    res.status(201).json({ message: "Product updated" });
  }
};

export const getProductsBySeller = async (req, res) => {
  const products = await Product.find({ seller: req.user.id }).where(
    "approved",
    true
  );

  const nonApprovedProducts = await Product.find({ seller: req.user.id }).where(
    "approved",
    false
  );

  if (!products) {
    res.status(404).json({
      success: false,
      message: "Products not found",
    });
  }

  res.status(200).json({
    success: true,
    products,
    nonApprovedProducts,
  });
};

export const getProductsBySellerId = async (req, res) => {
  const products = await Product.find({ seller: req.params.id });

  if (!products) {
    res.status(404);
    throw new Error("Products not found");
  }

  res.status(200).json({
    success: true,
    products,
  });
};

export const getLatestProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);

  if (!products) {
    res.status(404);
    throw new Error("Products not found");
  }

  res.status(200).json({
    success: true,
    products,
  });
};
