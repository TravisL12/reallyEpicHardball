const express = require("express");
const { db } = require("../db");
const router = express.Router();

const { playerSelect } = require("./selectConstants");
const {
  transformPlayer,
  REVERSE_GENDER,
  REVERSE_THROWS,
  REVERSE_BATS,
  REVERSE_PRIMARY_POS,
  REVERSE_PITCHING,
  REVERSE_SECOND_POS,
  REVERSE_PITCHES,
} = require("./helpers");
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

router.get("/player", async function (req, res, next) {
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

router.get("/players", async function (req, res, next) {
  const { take, skip, sortAttr = "id", isAsc, ...filters } = req.query;
  const {
    gender,
    bats,
    throws,
    league,
    position,
    secondPosition,
    hasFreeAgents,
    traits,
    traits2,
  } = filters;

  const direction = isAsc === "true" ? "asc" : "desc";
  const orderBy =
    sortAttr === "id" ? {} : { [sortAttr]: { sort: direction, nulls: "last" } };

  const where = {
    NOT: hasFreeAgents === "false" ? { team: null } : {},
    AND: [
      { OR: gender?.map((i) => ({ gender: +REVERSE_GENDER[i] })) },
      { OR: bats?.map((i) => ({ bats: +REVERSE_BATS[i] })) },
      { OR: throws?.map((i) => ({ throws: +REVERSE_THROWS[i] })) },
      { OR: league?.map((i) => ({ league: i })) },
      { OR: traits?.map((i) => ({ trait1: i === "None" ? null : i })) },
      { OR: traits2?.map((i) => ({ trait2: i === "None" ? null : i })) },
      {
        OR: position?.map((i) => ({ primaryPosition: REVERSE_PRIMARY_POS[i] })),
      },
      {
        OR: secondPosition?.map((i) => ({
          secondaryPosition: REVERSE_SECOND_POS[i],
        })),
      },
    ],
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
  res.json({ players, count: count._count, hasMore });
});

router.get("/pitchers", async function (req, res, next) {
  const { take, skip, sortAttr = "id", isAsc, ...filters } = req.query;
  const {
    gender,
    throws,
    league,
    pitching,
    pitches,
    hasFreeAgents,
    traits,
    traits2,
  } = filters;

  const direction = isAsc === "true" ? "asc" : "desc";
  const orderBy =
    sortAttr === "id" ? {} : { [sortAttr]: { sort: direction, nulls: "last" } };

  const where = {
    NOT: hasFreeAgents === "false" ? { team: null } : {},
    AND: [
      { OR: gender?.map((i) => ({ gender: +REVERSE_GENDER[i] })) },
      { OR: throws?.map((i) => ({ throws: +REVERSE_THROWS[i] })) },
      { OR: league?.map((i) => ({ league: i })) },
      { OR: traits?.map((i) => ({ trait1: i === "None" ? null : i })) },
      { OR: traits2?.map((i) => ({ trait2: i === "None" ? null : i })) },
      {
        OR: pitching?.map((i) => ({ pitcherRole: REVERSE_PITCHING[i] })),
      },
      {
        AND: pitches?.map((i) => ({ [REVERSE_PITCHES[i]]: 1 })),
      },
    ],
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
  res.json({ players, count: count._count, hasMore });
});

module.exports = router;
