const genres = require("./genres");

module.exports = (app) => {
  app.use("/api/genres", genres);
};
