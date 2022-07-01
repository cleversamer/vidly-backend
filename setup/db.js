require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(process.env["MONGODB_URI"])
    .then(() => {
      console.log("Connected to MongoDB server successfully.");
    })
    .catch((err) => {
      console.log(`Failed to connect to MongoDB server: ${err.message}`);
    });
};
