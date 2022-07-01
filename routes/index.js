const genres = require("./genres");
const customers = require("./customers");
const movies = require("./movies");

module.exports = (app) => {
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
};
