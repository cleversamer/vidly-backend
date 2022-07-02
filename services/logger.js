const winston = require("winston");
require("winston-mongodb");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    // new winston.transports.File({ filename: "errors.log", level: "error" }),
    new winston.transports.MongoDB({
      db: process.env["MONGODB_URI"],
      collection: "logs",
      level: "error",
      expireAfterSeconds: 1000 * 60 * 60 * 24, // => 1 day
      options: { useUnifiedTopology: true },
    }),
  ],
});

module.exports = logger;
