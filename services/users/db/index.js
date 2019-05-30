const mongoose = require("mongoose");

module.exports = mongoose.createConnection(
  process.env.USERS_MONGODB_URI,
  { useNewUrlParser: true },
  err => {
    console.log("error", err);
  }
);
