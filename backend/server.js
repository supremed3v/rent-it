import express from "express";
import cors from "cors";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import connectDB from "./db.js";
import cookieParser from "cookie-parser";
import productRoute from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
connectDB();
const app = express();

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", paymentRoutes);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections

process.on("unhandledRejection", (err) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});

process.on("ValidationError", (err) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
