require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { logger } = require("../common");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny", { stream: logger.winstonStream }));

app.use("/public", require("./controllers/public"));
app.use("/internal", require("./controllers/internal"));

app.all("*", async (req, res) => {
  return res.status(404).send("Page could not be found");
});

const port = process.env.BOOKS_PORT;
const server = app.listen(port, () => {
  logger.info(`BOOKS running is running on ${port}`);
});

process
  .on("unhandledRejection", (reason, p) => {
    logger.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", err => {
    logger.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

module.exports = server;
