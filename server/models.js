const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  EmailOrMobile: {
    type: String,
    required: true,
    unique: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel };
