const dotenv = require("dotenv");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

dotenv.config();

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already registered" });
    }

    user = new User({
      username,
      email,
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
          message: "Registration successful",
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Cari user berdasarkan username atau email
    let user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
          message: "Login sucessful",
        });
      }
    );
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
