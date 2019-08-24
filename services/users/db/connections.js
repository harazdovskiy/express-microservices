const mongoose = require("mongoose");
const Promise = require("bluebird");

mongoose.Promise = Promise;

const dbOptions = {
  socketTimeoutMS: 60000,
  keepAlive: true,
  reconnectTries: 30,
  authSource: "admin",
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
};

const connections = {
  dbConnection: mongoose.createConnection(),
  dbOptions
};

let dbURI;
if (process.env.USERS_MONGODB_URI) {
  dbURI = process.env.USERS_MONGODB_URI.trim();
  connections.dbConnection.openUri(dbURI, dbOptions);
} else {
  console.warn("Connection string is not provided");
}

connections.dbConnection
  .once("open", () => {
    console.info(`Mongo DB connected successfully to: ${dbURI}`);
  })
  .on("error", err => {
    console.error(err);
    process.exit(1);
  })
  .on("close", () => {
    console.info("Mongo DB closed connection");
  });

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logger.info("Mongoose default connection is disconnected");
    process.exit(0);
  });
});

module.exports = connections;
