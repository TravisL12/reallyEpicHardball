const express = require("express");
const { db } = require("../db");
const router = express.Router();

const { playerSelect } = require("./selectConstants");
const {
  transformPlayer,
  sharedWhereQuery,
  pitcherWhereQuery,
  playerWhereQuery,
} = require("./helpers");
const { uniqBy } = require("lodash");

router.get("/teams", async function (req, res) {
  const resp = await db.player.findMany({ select: { team: true } });
  const teams = uniqBy(resp, "team");
  res.json({ teams });
});

router.get("/team", async function (req, res) {
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

router.get("/player", async function (req, res) {
  const { localID } = req.query;
  const player = await db.player.findFirst({
    where: {
      localID: +localID,
    },
    select: {
      ...playerSelect,
    },
  });
  const data = transformPlayer(player);
  res.json({ player: data });
});

const playerQuery = async (req, isPitcher = false) => {
  const {
    take,
    skip,
    sortAttr = "id",
    isAsc,
    nameQuery,
    ...filters
  } = req.query;
  const sharedWhere = sharedWhereQuery(filters, nameQuery);
  const playerWhere = isPitcher
    ? pitcherWhereQuery(filters)
    : playerWhereQuery(filters);

  const direction = isAsc === "true" ? "asc" : "desc";
  const orderBy =
    sortAttr === "id" ? {} : { [sortAttr]: { sort: direction, nulls: "last" } };

  const where = {
    AND: [...sharedWhere, ...playerWhere],
  };

  const count = await db.player.aggregate({
    _count: true,
    where,
  });

  const selectedPlayers = await db.player.findMany({
    skip: +skip,
    take: +take,
    select: {
      ...playerSelect,
    },
    where,
    orderBy,
  });
  const players = selectedPlayers.map(transformPlayer);
  const hasMore = count._count > +take + +skip;
  return { players, count: count._count, hasMore };
};

router.get("/players", async function (req, res) {
  const { players, count, hasMore } = await playerQuery(req);
  res.json({ players, count, hasMore });
});

router.get("/pitchers", async function (req, res) {
  const { players, count, hasMore } = await playerQuery(req, true);
  res.json({ players, count: count._count, hasMore });
});

module.exports = router;
