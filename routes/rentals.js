const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await Rental.find({});
    res.status(200).json(result);
  } catch (err) {
    re.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Rental.findById(req.params.id);

    if (!result) {
      return res.status(400).send("Rental with the given ID was not found.");
    }

    res.status(200).json(result);
  } catch (err) {
    re.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.body.movieId });
    if (!movie) {
      return res.status(400).send("Movie with the given ID was not found.");
    }

    const customer = await Customer.findOne({ _id: req.body.customerId });
    if (!customer) {
      return res.status(400).send("Customer with the given ID was not found.");
    }

    const result = await Rental.insertMany([
      {
        customer: _.pick(customer, ["_id", "name", "isGold", "phone"]),
        movie: _.pick(movie, ["_id", "title", "dailyRentalRate"]),
        ..._.pick(req.body, ["dateOut", "dateReturned", "rentalFee"]),
      },
    ]);

    movie.numberInStock--;
    await movie.save();

    res.status(200).json(result);
  } catch (err) {
    re.status(500).send(err.message);
  }
});

module.exports = router;
