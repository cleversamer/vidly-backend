const Genre = require("../models/genre");
const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await Genre.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const genre = await Genre.insertMany([{ name: req.body.name }]);
    res.status(200).send(genre);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const genre = await Genre.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json(genre);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.deleteOne({ _id: req.params.id });
    res.status(200).json(genre);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findOne({ _id: req.params.id });
    res.status(200).json(genre);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
