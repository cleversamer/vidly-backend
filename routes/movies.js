const { Movie } = require("../models/movie");
const { Genre } = require("../models/genre");
const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await Movie.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Movie.find({ _id: req.params.id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
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
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      },
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await Movie.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Movie.deleteOne({ _id: req.params.id }, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
