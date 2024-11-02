const express = require("express");
const connectDB = require("./backend/config/db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./backend/routes/auth");
dotenv.config();

// Initialize the app
const app = express();

connectDB();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Diabetes Classification API");
});

app.use("/user", authRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
