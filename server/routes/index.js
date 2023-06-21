const express = require("express");
const { db } = require("../db");
const router = express.Router();

const { playerSelect } = require("./selectConstants");
const { transformPlayer } = require("./helpers");
const { uniqBy } = require("lodash");

router.get("/teams", async function (req, res, next) {
  const resp = await db.player.findMany({ select: { team: true } });
  const teams = uniqBy(resp, "team");
  res.json({ teams });
});

router.get("/team", async function (req, res, next) {
  const { name } = req.query;
  const players = await db.player.findMany({
    where: { team: name },
    orderBy: { firstName: "asc" },
  });

  if (players) {
    const teamPlayers = players.map(transformPlayer);
    res.json({ team: { team: name, players: teamPlayers } });
  } else {
    res.json({ response: "no team found!" });
  }
});

router.get("/players", async function (req, res, next) {
  const { take, skip, sortAttr = "id", isAsc } = req.query;

  const direction = isAsc === "true" ? "asc" : "desc";
  const orderBy =
    sortAttr === "id" ? {} : { [sortAttr]: { sort: direction, nulls: "last" } };

  const selectedPlayers = await db.player.findMany({
    skip: +skip,
    take: +take,
    select: {
      ...playerSelect,
    },
    orderBy,
  });
  const players = selectedPlayers.map(transformPlayer);
  res.json({ players });
});

module.exports = router;
