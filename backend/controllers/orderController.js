import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";
import { sendMail } from "../middlewares/sendMail.js";
import User from "../models/UserModel.js";

export const newOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentInfo, itemsPrice, totalPrice } =
    req.body;

  const orderItemsIds = orderItems.map((item) => item.product);
  const products = await Product.find({ _id: { $in: orderItemsIds } });

  const order = await Order.create({
    orderItems,
    shippingAddress,
    paymentInfo,
    itemsPrice,
    totalPrice,
    user: req.user._id,
    paidAt: Date.now(),
  });

  const updateProductAvailability = async () => {
    for (let i = 0; i < products.length; i++) {
      products[i].availability = false; // update availability
      await products[i].save({ validateBeforeSave: false });
    }
  };

  updateProductAvailability();

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

  if (order.orderStatus === "Confirmed") {
    order.paidAt = Date.now();
    const message =
      `Your Order has been confirmed! || Order#: ${order._id}, \n\n` +
      "This is the confirmation email for your order. You can always check your order status from your orders tab through applciation. \n\n" +
      "This is a auto-generated email. Please do not reply to this email.\n\n" +
      "Thankyou for your order!\n\n";

    try {
      const user = await User.findById(order.user._id);
      const orderEmail = user.email;
      await sendMail({
        email: orderEmail,
        subject: "Order Confirmed",
        text: message,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  if (order.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
    order.orderItems.forEach(async (item) => {
      await updateAvailability(item._id);
    });
    const message =
      `Your Order has been Delivered! || Order#: ${order._id}, \n\n` +
      "This is the confirmation email for the delivery of your order \n\n" +
      "This is a auto-generated email. Please do not reply to this email.\n\n" +
      "Thankyou for your order!\n\n";

    try {
      const user = await User.findById(order.user._id);
      const orderEmail = user.email;
      await sendMail({
        email: orderEmail,
        subject: "Order Delivered",
        text: message,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  if (order.orderStatus === "Returned") {
    order.returnedAt = Date.now();
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
  if (product.availability === true) {
    product.availability = false;
  } else {
    product.availability = true;
  }
  await product.save({ validateBeforeSave: false });
};

export const sellerOrders = async (req, res) => {
  const seller = await User.findById(req.user.id);

  try {
    const orders = await Order.find({
      orderItems: { $elemMatch: { seller: seller._id } },
    });
    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    const totalAmount = orders.reduce((acc, item) => acc + item.totalPrice, 0);

    const totalRented = orders.reduce(
      (acc, item) => acc + item.orderItems.length,
      0
    );

    res.status(200).json({
      success: true,
      orders,
      totalAmount,
      totalRented,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
