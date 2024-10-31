const dotenv = require("dotenv");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

dotenv.config();

//Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      username,
      password,
    });
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
          message: "Registration successfull",
        });
      }
    );
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
