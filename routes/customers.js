const Customer = require("../models/customer");
const { Router } = require("express");
const router = Router();

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
      {
        name: req.body.name,
        phone: req.body.phone,
        isGold: !!req.body.isGold,
      },
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
