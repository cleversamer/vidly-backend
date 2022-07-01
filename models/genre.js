const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Genre = mongoose.model("Genre", schema);

module.exports = { Genre, genreSchema: schema };
