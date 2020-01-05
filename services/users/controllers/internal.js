const express = require("express");
const router = express.Router();
const UsersService = require("../services/users");

const { logger } = require("../../common");

router.post("/", async (req, res) => {
  try {
    const user = await UsersService.createUser(req.body);

    return res.json({
      err: false,
      data: "user"
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    return res.send({
      err: false,
      some: "shit",
      data: await UsersService.getUser(req.params.id)
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
      data: await UsersService.getUsers()
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: false, error: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    return res.send({
      err: false,
      data: await UsersService.updateUser(req.body)
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await UsersService.deleteUser(req.params.id);
    return res.send({ err: false, removed: true });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, error: error.message });
  }
});

module.exports = router;
