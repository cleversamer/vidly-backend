const { User } = require("../models/user");
const { Router } = require("express");
const router = Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const asyncMiddleware = require("../middleware/async");

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const user = new User(
      _.pick(req.body, ["name", "email", "password", "isAdmin"])
    );
    await user.save();

    const token = user.generateAuthToken();
    res.status(200).header("x-auth-token", token).send(user);
  })
);

module.exports = router;
