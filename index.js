require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Password Protection API is running"
  });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err.message);
  });
