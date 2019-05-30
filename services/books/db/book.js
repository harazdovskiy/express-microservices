const { Schema } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      unique: true
    },
    summary: String,
    isbn: {
      type: String,
      unique: true
    },
    author: String,
    ratings: Number
  },
  { timestamps: true }
);

module.exports = require("./index.js").model("Book", bookSchema);
