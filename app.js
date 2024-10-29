const express = require("express");
const connectDB = require("./backend/config/db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

// Initialize   the app
const app = express();
