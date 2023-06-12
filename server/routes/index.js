const express = require("express");
const { db } = require("../db");
const router = express.Router();

router.get("/", async function (req, res, next) {
  const teams = await db.player.findMany();
  res.json({ teams });
});

module.exports = router;
