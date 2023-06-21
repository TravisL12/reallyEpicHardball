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

const relations = {
  team: "name",
  league: "name",
  trait1: "name",
  trait2: "name",
};
const sortRelation = (attr, direction) => {
  // id doesn't work with "orderByNulls"
  if (attr === "id") {
    return { [attr]: direction };
  }
  return { [attr]: { sort: direction, nulls: "last" } };
  // return relations[attr]
  //   ? [{ [attr]: { [relations[attr]]: direction } }]
  //   : { [attr]: { sort: direction, nulls: "last" } };
};

router.get("/players", async function (req, res, next) {
  const { take, skip, sortAttr = "id", isAsc } = req.query;
  const direction = isAsc === "true" ? "asc" : "desc";
  const orderBy = sortRelation(sortAttr, direction);
  const selectedPlayers = await db.player.findMany({
    skip: +skip,
    take: +take,
    select: {
      ...playerSelect,
      team: { select: { name: true } },
      league: { select: { name: true } },
      trait1: { select: { type: true, chemistry: true } },
      trait2: { select: { type: true, chemistry: true } },
    },
    orderBy,
  });
  const players = selectedPlayers.map(transformPlayer);
  res.json({ players });
});

module.exports = router;
