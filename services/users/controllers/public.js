const express = require("express");
const router = express.Router();
const UsersService = require("../services/users");

router.get("/:id", async (req, res) => {
  try {
    return res.send({
      err: false,
      data: await UsersService.getUser(req.params.id)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: false, error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    return res.send({
      err: false,
      data: await UsersService.getUsers()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: false, error: error.message });
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    return res.json({
      err: false,
      data: await UsersService.createUser(req.body)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, error: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    return res.send({
      err: false,
      data: await UsersService.updateUser(req.body)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await UsersService.deleteUser(req.params.id);
    return res.send({ err: false, removed: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, error: error.message });
  }
});

module.exports = router;
