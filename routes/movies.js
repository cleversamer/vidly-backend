const { Movie } = require("../models/movie");
const { Genre } = require("../models/genre");
const { Router } = require("express");
const router = Router();
const _ = require("lodash");

router.get("/", async (req, res) => {
  try {
    const result = await Movie.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("Something went wrong on the server.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Movie.find({ _id: req.params.id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("Something went wrong on the server.");
  }
});

router.post("/", async (req, res) => {
  try {
    const genre = await Genre.findOne({ _id: req.body.genreId });
    if (!genre) {
      return res.status(400).send("Invalid genre ID.");
    }

    const result = await Movie.insertMany([
      {
        ..._.pick(req.body, ["title", "numberInStock", "dailyRentalRate"]),
        genre: _.pick(genre, ["_id", "name"]),
      },
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("Something went wrong on the server.");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await Movie.updateOne(
      { _id: req.params.id },
      _.pick(req.body, ["title", "genre", "numberInStock", "dailyRentalRate"])
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("Something went wrong on the server.");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Movie.deleteOne({ _id: req.params.id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("Something went wrong on the server.");
  }
});

module.exports = router;
