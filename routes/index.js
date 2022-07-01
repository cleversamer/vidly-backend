const genres = require("./genres");
const customers = require("./customers");

module.exports = (app) => {
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
};
