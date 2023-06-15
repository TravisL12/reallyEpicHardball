const express = require("express");
const { db } = require("../db");
const router = express.Router();

const { playerSelect } = require("./selectConstants");

router.get("/teams", async function (req, res, next) {
  const resp = await db.team.findMany();
  res.json({ teams: resp });
});

router.get("/team", async function (req, res, next) {
  const { id, name } = req.query;
  let team;
  if (id !== undefined) {
    team = await db.team.findUnique({ where: { id: +id } });
  } else if (name) {
    const resp = await db.team.findMany({ where: { name } });
    team = resp?.[0];
  }

  if (team?.id !== undefined) {
    team.players = await db.player.findMany({
      select: playerSelect,
      where: { teamId: team.id },
    });
    res.json({ team });
  } else {
    res.json({ response: "no team found!" });
  }
});

router.get("/players", async function (req, res, next) {
  const players = await db.player.findMany({
    take: 100,
    select: playerSelect,
  });
  res.json({ players });
});

module.exports = router;
