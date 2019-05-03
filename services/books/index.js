require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("tiny"));

// const { Book } = require("./db/book");
// const { ObjectId } = require("mongoose").Types;

app.get("/:id", async (req, res) => {
  try {
    return res.send({
      id: req.params.id
    });
  } catch (error) {
    res.status(500).json({ registerSuccess: false, error: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    console.log("loooooog");
    return res.send({ message: req.body });
  } catch (error) {
    res.status(500).json({ registerSuccess: false, error: error.message });
  }
});

app.put("/books", async (req, res) => {
  try {
    return res.send({ params: req.body });
  } catch (error) {
    res.status(500).json({ registerSuccess: false, error: error.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    return res.send({ params: req.params.id });
  } catch (error) {
    res.status(500).json({ registerSuccess: false, error: error.message });
  }
});

app.all("*", async (req, res) => {
  return res.status(404).send("Page could not be found");
});

const port = process.env.BOOKS_PORT;
app.listen(port, () => {
  console.log("BOOKS running", port);
});

module.exports = app;
