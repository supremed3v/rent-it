import mongoose from "mongoose";

export default function connectDB() {
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri, { useNewUrlParser: true });
  mongoose.set("strictQuery", false);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to MongoDB");
  });
}
