const dotenv = require("dotenv");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

dotenv.config();
// Middleware to verify JWT Tokens
const auth = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Token is not valid",
    });
  }
};

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

// Logout
router.post("/logout", (req, res) => {
  res.status(200).json({
    token: null,
    message: "Logout successful",
  });
});

// Get User Information
router.get("/user/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update Password with Confirmation
router.put("/user/:id/password", auth, async (req, res) => {
  const { password, confirmPassword } = req.body;

  // Pastikan password dan confirmPassword sesuai
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
