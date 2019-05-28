const { Schema } = require("mongoose");

const bookSchema = new Schema(
  {
    title: String,
    summary: String,
    isbn: String,
    author: String,
    ratings: Number
  },
  { timestamps: true }
);

module.exports = require("./index.js").model("Book", bookSchema);
