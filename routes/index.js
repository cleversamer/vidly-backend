const genres = require("./genres");
const customers = require("./customers");
const movies = require("./movies");
const rentals = require("./rentals");
const users = require("./users");

module.exports = (app) => {
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
};
