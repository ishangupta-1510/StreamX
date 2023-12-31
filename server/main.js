const express = require("express");
const mongoose = require("mongoose");

const { UserModel } = require("./models");
const app = express();

const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

app.use(express.json());

app.post("/api/login", async (req, res) => {
  try {
    const { EmailOrMobile, Password } = req.body;
    const userDoc = await UserModel.findOne({ EmailOrMobile });
    if (!userDoc) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = bcrypt.compareSync(Password, userDoc.hashPassword);

    if (isPasswordValid) {
      return res.status(200).json({ user: userDoc });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/signIn", async (req, res) => {
  const { EmailOrMobile, Password } = req.body;
  const hashPassword = bcrypt.hashSync(Password, salt);
  console.log(hashPassword);
  const userDoc = UserModel.create({ EmailOrMobile, hashPassword });
  return res.status(400).json(userDoc);
});

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ishan:ishan@cluster0.uzsu5wj.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
