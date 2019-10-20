const express = require("express");
const router = express.Router();
const UsersService = require("../services/users");

router.get("/auth", async (req, res) => {
  try {
    return res.json({
      err: false,
      data: await UsersService.authenticateUser(req.query)
    });
  } catch (error) {
    console.error(error);
    res.status(403).json({ error: false, error: error.message });
  }
});

module.exports = router;
