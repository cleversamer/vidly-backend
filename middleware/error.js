const logger = require("../services/logger");

module.exports = (err, req, res, next) => {
  logger.log({
    level: "error",
    message: err.message,
  });
  res.status(500).send("Something went wrong on the server.");
};
