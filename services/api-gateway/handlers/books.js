const express = require("express");
const router = express.Router();

const BookApi = require("../../../shared/books-api");

router.get("/:id", async (req, res) => {
  try {
    return res.send(await BookApi.getBookById(req.params.id));
  } catch (error) {
    res.status(500).json({ error: true, error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    return res.send(await BookApi.createdBook(req.body));
  } catch (error) {
    res.status(500).json({ error: true, error: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    return res.send(await BookApi.updateBook(req.body));
  } catch (error) {
    res.status(500).json({ error: true, error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    return res.send(await BookApi.deleteBook(req.params.id));
  } catch (error) {
    res.status(500).json({ error: true, error: error.message });
  }
});

module.exports = router;
