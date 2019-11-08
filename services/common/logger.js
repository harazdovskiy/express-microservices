const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} - [${level}] : ${message} ${stack || ""}`;
});

const logger = createLogger({
  format: combine(colorize(), timestamp(), myFormat),
  transports: [
    new transports.Console({
      silent: process.env.ENV === "test"
    })
  ]
});

const formatMessage = text => {
  return text.substring(0, text.lastIndexOf("\n"));
};

logger.winstonStream = {
  write: function(message, encoding) {
    logger.info(formatMessage(message));
  }
};

module.exports = logger;
