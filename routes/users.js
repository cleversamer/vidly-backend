const { User } = require("../models/user");
const { Router } = require("express");
const router = Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const result = await User.insertMany([
      _.pick(req.body, ["name", "email", "password"]),
    ]);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
