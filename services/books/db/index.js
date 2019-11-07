const mongoose = require("mongoose");
const { logger } = require("../../common");

module.exports = mongoose.createConnection(process.env.BOOKS_MONGODB_URI, { useNewUrlParser: true }, err => {
  if (err) {
    logger.error("Mongoose connection failed: ", err);
  }
  return true;
});
