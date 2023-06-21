const express = require("express");
const { db } = require("../db");
const router = express.Router();

const { playerSelect } = require("./selectConstants");
const { transformPlayer } = require("./helpers");

// router.get("/teams", async function (req, res, next) {
//   const resp = await db.team.findMany();
//   res.json({ teams: resp });
// });

// router.get("/team", async function (req, res, next) {
//   const { id, name } = req.query;
//   let team;
//   if (id !== undefined) {
//     team = await db.team.findUnique({ where: { id: +id } });
//   } else if (name) {
//     const resp = await db.team.findMany({ where: { name } });
//     team = resp?.[0];
//   }

//   if (team?.id !== undefined) {
//     const players = await db.player.findMany({
//       select: {
//         ...playerSelect,
//       },
//       where: { teamId: team.id },
//     });

//     team.players = players.map(transformPlayer);
//     res.json({ team });
//   } else {
//     res.json({ response: "no team found!" });
//   }
// });

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
