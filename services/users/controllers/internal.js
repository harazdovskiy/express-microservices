const express = require("express");
const router = express.Router();
const UsersService = require("../services/users");

router.post("/", async (req, res) => {
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

module.exports = router;
