const { Genre } = require("../models/genre");
const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/async");

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const data = await Genre.find({}).sort({ name: 1 });
    res.status(200).json(data);
  })
);

router.post(
  "/",
  [auth],
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.insertMany([{ name: req.body.name }]);
    res.status(200).send(genre);
  })
);

router.put(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.updateOne(
      { _id: req.params.id },
      { name: req.body.name }
    );
    res.status(200).json(genre);
  })
);

router.delete(
  "/:id",
  [auth, admin],
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.deleteOne({ _id: req.params.id });
    res.status(200).json(genre);
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findOne({ _id: req.params.id });
    res.status(200).json(genre);
  })
);

module.exports = router;
