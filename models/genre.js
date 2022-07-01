const mongoose = require("mongoose");

const schema = {
  name: {
    type: String,
    required: true,
  },
};

const Genre = mongoose.model("Genre", schema);

module.exports = Genre;
