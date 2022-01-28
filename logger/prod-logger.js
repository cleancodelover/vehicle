const { format, createLogger, transports } = require("winston");
const { combine, timestamp, errors, json } = format;

const buildProdLogger = () => {
  return createLogger({
    //level: "debug",
    format: combine(
      format.colorize(),
      timestamp(),
      errors({ stack: true }),
      json()
    ),
    defaultMeta: { service: "user-service" },
    transports: [
      new transports.File({
        level: "error",
        filename: "./logs/logs.log",
      }),
    ],
  });
};

module.exports = buildProdLogger;
