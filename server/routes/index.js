const express = require("express");
const { db } = require("../db");
const router = express.Router();

router.get("/team", async function (req, res, next) {
  const { teamId } = req.query;
  const team = await db.team.findUnique({ where: { id: +teamId } });
  team.players = await db.player.findMany({
    where: { teamId: String(teamId) },
  });
  res.json({ team });
});

router.get("/players", async function (req, res, next) {
  const players = await db.player.findMany();
  res.json({ players });
});

module.exports = router;
