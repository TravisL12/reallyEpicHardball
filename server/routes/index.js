const express = require("express");
const { db } = require("../db");
const router = express.Router();

const { playerSelect } = require("./selectConstants");
const { transformPlayer } = require("./helpers");

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
    const players = await db.player.findMany({
      select: {
        ...playerSelect,
        team: { select: { name: true } },
        league: { select: { name: true } },
        trait1: { select: { type: true, chemistry: true } },
        trait2: { select: { type: true, chemistry: true } },
      },
      where: { teamId: team.id },
    });

    team.players = players.map(transformPlayer);
    res.json({ team });
  } else {
    res.json({ response: "no team found!" });
  }
});

router.get("/players", async function (req, res, next) {
  const selectedPlayers = await db.player.findMany({
    take: 100,
    select: {
      ...playerSelect,
      team: { select: { name: true } },
      league: { select: { name: true } },
      trait1: { select: { type: true, chemistry: true } },
      trait2: { select: { type: true, chemistry: true } },
    },
  });
  const players = selectedPlayers.map(transformPlayer);
  res.json({ players });
});

module.exports = router;
