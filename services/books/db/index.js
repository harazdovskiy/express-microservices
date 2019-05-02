const mongoose = require("mongoose");

module.exports = mongoose.createConnection(
  process.env.BOOKS_MONGODB_URI,
  { useNewUrlParser: true },
  err => {
    console.log("error", err);
  }
);
