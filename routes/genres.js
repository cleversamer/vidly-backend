const { Genre } = require("../models/genre");
const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  try {
    const data = await Genre.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("Something went wrong on the server.");
  }
});

router.post("/", [auth], async (req, res) => {
  try {
    const genre = await Genre.insertMany([{ name: req.body.name }]);
    res.status(200).send(genre);
  } catch (err) {
    res.status(500).send("Something went wrong on the server.");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const genre = await Genre.updateOne(
      { _id: req.params.id },
      { name: req.body.name }
    );
    res.status(200).json(genre);
  } catch (err) {
    res.status(500).send("Something went wrong on the server.");
  }
});

router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const genre = await Genre.deleteOne({ _id: req.params.id });
    res.status(200).json(genre);
  } catch (err) {
    res.status(500).send("Something went wrong on the server.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findOne({ _id: req.params.id });
    res.status(200).json(genre);
  } catch (err) {
    res.status(500).send("Something went wrong on the server.");
  }
});

module.exports = router;
