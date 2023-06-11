const express = require("express");
const { db } = require("../db");
const router = express.Router();

router.get("/", async function (req, res, next) {
  const players = await db.player.findMany({ take: 50 });
  res.json({ players });
});

module.exports = router;
