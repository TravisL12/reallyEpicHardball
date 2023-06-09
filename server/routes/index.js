const express = require("express");
const { db } = require("../db");
const router = express.Router();
const playerJson = require("../seedData/playersComplete.json");

const seedPlayer = async () => {
  // make all attributes strings (probably should just migrate db and change this)
  const formatted = playerJson.map((player) => {
    return Object.keys(player).reduce((acc, key) => {
      acc[key] = String(player[key]);
      return acc;
    }, {});
  });
  const count = await db.player.createMany({
    data: formatted,
  });
  return count;
};

router.get("/seed", async function (req, res, next) {
  const playerCount = await seedPlayer();
  res.json({ title: "All seeded!", playerCount });
});

router.get("/", function (req, res, next) {
  res.json({ title: "HEY" });
});

module.exports = router;
