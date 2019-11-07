const mongoose = require("mongoose");
const { logger } = require("../../common");

module.exports = mongoose.createConnection(process.env.USERS_MONGODB_URI, { useNewUrlParser: true }, err => {
  logger.error("Mongoose connection failed: ", err);
});
