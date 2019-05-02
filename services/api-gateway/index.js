require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const proxy = require("http-proxy-middleware");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  "/books",
  proxy({
    target: `http://books:${process.env.BOOKS_PORT}`,
    changeOrigin: true
  })
);

app.get("/*", async (req, res) => {
  try {
    res.send({ message: "api allive!" });
  } catch (error) {
    return res.status(500).json({
      loginSuccess: false,
      error
    });
  }
});

const port = process.env.API_PORT;
app.listen(port, () => {
  console.log("API-geteway running", port);
});

module.exports = app;
