const { User } = require("../models/user");
const { Router } = require("express");
const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params.id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await User.insertMany([
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    ]);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
