import express from "express";
import cors from "cors";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import connectDB from "./db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

connectDB();

const PORT = process.env.PORT || 5000;

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
