require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const router = express.Router();

let users = [];

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword
  };

  users.push(newUser);

  res.json({
    message: "Registration successful",
    user: {
      id: newUser.id,
      username: newUser.username
    }
  });
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    user => user.username === username
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    return res.status(401).json({
      message: "Incorrect password"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );

  res.json({
    message: "Login successful",
    token: token
  });
});


router.get("/profile", auth, (req, res) => {
  res.json({
    message: "Welcome to your profile",
    user: req.user
  });
});


module.exports = router;
