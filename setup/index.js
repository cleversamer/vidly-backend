const setupMongoDB = require("./db");
const express = require("express");
const setupRoutes = require("../routes");

module.exports = (app) => {
  setupMongoDB();
  app.use(express.json());
  setupRoutes(app);
};
