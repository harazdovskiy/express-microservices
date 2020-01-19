require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const { logger } = require("../common");
const sequelize = require("./db/connections");
app.use(bodyParser.urlencoded({ aextended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny", { stream: logger.winstonStream }));

sequelize.sync();

app.use("/internal", require("./controllers/internal"));
app.use("/public", require("./controllers/public"));

app.all("*", async (req, res) => {
  return res.status(404).send("Page could not be found");
});

const port = process.env.USERS_PORT;
app.listen(port, () => {
  logger.info("USERS running", port);
});

process
  .on("unhandledRejection", (reason, p) => {
    logger.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", err => {
    logger.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

module.exports = app;
