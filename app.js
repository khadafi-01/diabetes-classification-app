const express = require("express");
const connectDB = require("./backend/config/db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

// Initialize the app
const app = express();

connectDB();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Diabetes Classification API");
});
