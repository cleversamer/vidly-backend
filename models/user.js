const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

schema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env["jwtPrivateKey"]
  );
};

const User = mongoose.model("User", schema);

module.exports = {
  User,
};
