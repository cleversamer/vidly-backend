const express = require("express");
const setupMongoDB = require("./db");
const setupRoutes = require("../routes");
const errorHandler = require("./error");

module.exports = (app) => {
  setupMongoDB();
  app.use(express.json());
  setupRoutes(app);
  app.use(errorHandler);
};
