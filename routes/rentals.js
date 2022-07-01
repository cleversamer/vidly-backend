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
        customer: {
          _id: customer._id,
          name: customer.name,
          isGold: customer.isGold,
          phone: customer.phone,
        },
        movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate,
        },
        dateOut: req.body.dateOut,
        dateReturned: req.body.dateReturned,
        rentalFee: req.body.rentalFee,
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
