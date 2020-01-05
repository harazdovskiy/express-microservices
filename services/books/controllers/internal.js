const express = require("express");
const router = express.Router();
const Book = require("../db/book");
const { ObjectId } = require("mongoose").Types;
const { logger } = require("../../common");

router.get("/:id", async (req, res) => {
  try {
    return res.send({
      err: false,
      data: await Book.findById(req.params.id)
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: false, error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    return res.send({
      err: false,
      data: await Book.find({})
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: false, error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.json({
      err: false,
      // data: book
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, error: error.message });
  }
});

router.put("/", async (req, res) => {
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
    logger.error(error);
    res.status(400).json({ error: true, error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(ObjectId(req.params.id));
    return res.send({ err: false, removed: true });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, error: error.message });
  }
});

module.exports = router;
