const express = require("express");
const router = express.Router();
const UsersService = require("../services/users");
const { Auth } = require("../../common");

const { logger } = require("../../common");
const { AUTH_URL, AUTH_PORT } = process.env;
const AuthApi = new Auth({ baseUrl: `${AUTH_URL}:${AUTH_PORT}` });

router.post("/sign-up", async (req, res) => {
  try {
    return res.json({
      err: false,
      data: await UsersService.createUser(req.body)
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, error: error.message });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UsersService.authenticateUser({ email, password });
    const { data } = await AuthApi.generateToken(user._id);
    return res.json({
      err: false,
      data: { user, ...data }
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, error: error.message });
  }
});

router.post("/sign-out", async (req, res) => {
  try {
    const { token } = req.body;
    const { data } = await AuthApi.terminateToken(token);
    return res.json({
      err: false,
      data
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, error: error.message });
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const { data } = await AuthApi.refreshToken(refreshToken);
    return res.json({
      err: false,
      data: data
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, error: error.message });
  }
});

router.get("/:id", AuthApi.isAuthorized.bind(AuthApi), async (req, res) => {
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

router.get("/", AuthApi.isAuthorized.bind(AuthApi), async (req, res) => {
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

router.put("/", AuthApi.isAuthorized.bind(AuthApi), async (req, res) => {
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

router.delete("/:id", AuthApi.isAuthorized.bind(AuthApi), async (req, res) => {
  try {
    await UsersService.deleteUser(req.params.id);
    return res.send({ err: false, removed: true });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: true, error: error.message });
  }
});

module.exports = router;
