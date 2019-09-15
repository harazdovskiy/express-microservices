const mongoose = require("mongoose");

const {  } = require('shared-microservice-api');

module.exports = mongoose.createConnection(
  process.env.USERS_MONGODB_URI,
  { useNewUrlParser: true },
  err => {
    console.log("error", err);
  }
);
