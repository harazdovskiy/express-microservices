require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const Book = require("./db/book");
const { ObjectId } = require("mongoose").Types;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.get("/:id", async (req, res) => {
  try {
    return res.send({
      err: false,
      data: await Book.findById(req.params.id)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: false, error: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.json({
      err: false,
      data: book
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, error: error.message });
  }
});

app.put("/", async (req, res) => {
  try {
    const { _id, ...valuesToUpdate } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      ObjectId(req.body._id),
      {
        $set: valuesToUpdate
      },
      { new: true }
    );
    return res.send({ err: false, data: updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, error: error.message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(ObjectId(req.params.id));
    return res.send({ err: false, removed: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, error: error.message });
  }
});

app.all("*", async (req, res) => {
  return res.status(404).send("Page could not be found");
});

const port = process.env.BOOKS_PORT;
const server = app.listen(port, () => {
  console.log("BOOKS running", port);
});

module.exports = server;
