const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { UserModel } = require("./models");
const jwt = require("jsonwebtoken");

const app = express();
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(express.json());

app.post("/api/login", async (req, res) => {
  try {
    const { EmailOrMobile, Password } = req.body;
    console.log("Email:", EmailOrMobile);
    const userDoc = await UserModel.findOne({ EmailOrMobile });
    console.log("userDoc=", userDoc);
    if (!userDoc) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = bcrypt.compareSync(Password, userDoc.hashPassword);

    console.log(isPasswordValid, "working");

    if (isPasswordValid) {
      return res
        .status(200)
        .json({ success: true, message: "Login successful" });
    } else {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logout successful" });
});

app.post("/api/signIn", async (req, res) => {
  try {
    const { EmailOrMobile, Password } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ EmailOrMobile });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashPassword = bcrypt.hashSync(Password, salt);
    const userDoc = await UserModel.create({ EmailOrMobile, hashPassword });

    return res.status(201).json(userDoc);
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ishan:ishan@cluster0.uzsu5wj.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
