const express = require("express");
const router = express.Router();

const UserApi = require("../../../shared/users-api");

router.get("/:id", async (req, res) => {
  try {
    return res.send(await UserApi.getUserById(req.params.id));
  } catch (error) {
    res.status(500).json({ error: true, error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    return res.send(await UserApi.createdUser(req.body));
  } catch (error) {
    res.status(500).json({ error: true, error: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    return res.send(await UserApi.updateUser(req.body));
  } catch (error) {
    res.status(500).json({ error: true, error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    return res.send(await UserApi.deleteUser(req.params.id));
  } catch (error) {
    res.status(500).json({ error: true, error: error.message });
  }
});

module.exports = router;
