import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";

export const newOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentInfo, itemsPrice, totalPrice } =
    req.body;

  const order = await Order.create({
    orderItems,
    shippingAddress,
    paymentInfo,
    itemsPrice,
    totalPrice,
    user: req.user._id,
    paidAt: Date.now(),
  });

  res.status(201).json({
    success: true,
    order,
  });
};

export const myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
};

export const getOrderDetails = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  res.status(200).json({
    success: true,
    order,
  });
};

export const allOrders = async (req, res) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
};

export const updateOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return res.status(400).json({
      success: false,
      message: "You have already delivered this order",
    });
  }

  order.orderStatus = req.body.status;

  if (order.orderStatus === "Processing") {
    order.deliveredAt = undefined;
  }

  if (order.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
    order.orderItems.forEach(async (item) => {
      await updateAvailability(item._id);
    });
  }

  await order.save();
  res.status(200).json({
    success: true,
  });
};

const updateAvailability = async (id) => {
  const product = await Product.findById(id);
  product.available = false;
  await product.save({ validateBeforeSave: false });
};
