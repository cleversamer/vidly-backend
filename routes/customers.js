const { Customer } = require("../models/customer");
const { Router } = require("express");
const router = Router();
const _ = require("lodash");
const asyncMiddleware = require("../middleware/async");

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const result = await Customer.find({});
    res.status(200).json(result);
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const result = await Customer.findOne({ _id: req.params.id });
    res.status(200).json(result);
  })
);

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const result = await Customer.insertMany([
      _.pick(req.body, ["name", "phone", "isGold"]),
    ]);
    res.status(200).json(result);
  })
);

router.put(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const result = await Customer.updateOne(
      { _id: req.params.id },
      _.pick(req.body, ["name", "phone", "isGold"])
    );

    res.status(200).json(result);
  })
);

router.delete(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const result = await Customer.deleteOne({ _id: req.params.id });
    res.status(200).json(result);
  })
);

module.exports = router;
