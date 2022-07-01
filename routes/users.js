const { User } = require("../models/user");
const { Router } = require("express");
const router = Router();
const _ = require("lodash");

router.post("/", async (req, res) => {
  try {
    const result = await User.insertMany([
      _.pick(req.body, ["name", "email", "password"]),
    ]);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
