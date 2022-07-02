require("dotenv").config();
const express = require("express");
const app = express();
const setup = require("./setup");
const logger = require("./services/logger");

process.on("uncaughtException", (err) => {
  logger.log({
    level: "error",
    message: `Something went wrong on the server: ${err.message}`,
  });
});

setup(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
