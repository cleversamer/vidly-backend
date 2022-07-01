const mongoose = require("mongoose");

const schema = {
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
};

const Customer = mongoose.model("Customer", schema);

module.exports = Customer;
