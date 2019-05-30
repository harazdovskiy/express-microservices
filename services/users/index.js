require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const User = require("./db/user");
const { ObjectId } = require("mongoose").Types;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.get("/:id", async (req, res) => {
  try {
    return res.send({
      err: false,
      data: await User.findById(req.params.id)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: false, error: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.json({
      err: false,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, error: error.message });
  }
});

app.put("/", async (req, res) => {
  try {
    const { _id, ...valuesToUpdate } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      ObjectId(req.body._id),
      {
        $set: valuesToUpdate
      },
      { new: true }
    );
    return res.send({ err: false, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, error: error.message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(ObjectId(req.params.id));
    return res.send({ err: false, removed: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, error: error.message });
  }
});

app.all("*", async (req, res) => {
  return res.status(404).send("Page could not be found");
});

const port = process.env.USERS_PORT;
app.listen(port, () => {
  console.log("Users running", port);
});

module.exports = app;
