const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      connectTimeoutMS: 30000,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB: ", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
