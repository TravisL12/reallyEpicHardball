const express = require("express");
const { db } = require("../db");
const router = express.Router();

const seedPlayer = async (player) => {
  const user = await db.player.create({
    data: player,
  });
  console.log(user);
};

/* GET home page. */
router.get("/", function (req, res, next) {
  // ok this worked! make sure the types are lined up
  //  seedPlayer({
  //   localID: "1",
  //   teamName: "Sawteeth",
  //   firstName: "Thrash",
  //   lastName: "Allmeyer",
  //   primaryPosition: "1",
  //   pitcherRole: "1",
  //   power: "2",
  //   contact: "21",
  //   speed: "24",
  //   fielding: "82",
  //   arm: "null",
  //   velocity: "44",
  //   junk: "56",
  //   accuracy: "76",
  //   age: "31",
  //   trait: "31",
  //   subType: "7",
  //   league: "superMega",
  //   gender: "",
  //   throws: "1",
  //   bats: "1",
  //   secondaryPosition: "",
  //   rating: "83.73633999999998",
  //   trait1: "Wild Thing",
  //   chemistry1: "Spirited",
  //   trait2: "",
  //   chemistry2: "",
  //   careerStart: "",
  //   careerEnd: "",
  //   fourSeamFastball: "1",
  //   twoSeamFastball: "",
  //   screwball: "",
  //   changeup: "1",
  //   forkball: "",
  //   curveball: "1",
  //   slider: "1",
  //   cutFastball: "",
  //   windup: "2",
  //   pitchAngle: "3",
  // });

  res.json({ title: "HEY" });
});

module.exports = router;
