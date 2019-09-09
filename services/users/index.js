require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use("/public", require("./controllers/users"));

app.all("*", async (req, res) => {
  return res.status(404).send("Page could not be found");
});

const port = process.env.USERS_PORT;
app.listen(port, () => {
  console.log("Users running", port);
});

module.exports = app;
