const { User } = require("../models/user");
const { Router } = require("express");
const router = Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Invalid email or password.");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Invalid email or password.");
    }

    const token = user.generateAuthToken();
    res.status(200).send(token);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
