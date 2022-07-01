const { Customer } = require("../models/customer");
const { Router } = require("express");
const router = Router();
const _ = require("lodash");

router.get("/", async (req, res) => {
  try {
    const result = await Customer.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Customer.findOne({ _id: req.params.id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await Customer.insertMany([
      _.pick(req.body, ["name", "phone", "isGold"]),
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await Customer.updateOne(
      { _id: req.params.id },
      _.pick(req.body, ["name", "phone", "isGold"])
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Customer.deleteOne({ _id: req.params.id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
