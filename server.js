require("dotenv").config();
const express = require("express");
const app = express();
const setup = require("./setup");
const logger = require("./services/logger");

process.on("uncaughtException", (err) => {
  logger.log({
    level: "error",
    name: "uncaughtException",
    message: `${err.name}: ${err.message}`,
  });
});

process.on("unhandledRejection", (err) => {
  logger.log({
    level: "error",
    name: "unhandledRejection",
    message: `${err.name}: ${err.message}`,
  });
});

setup(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
