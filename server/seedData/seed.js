const { db } = require("../db");
const playerJson = require("./playersComplete.json");

const allow = {
  localID: "int",
  firstName: "string",
  lastName: "string",
  primaryPosition: "int",
  pitcherRole: "int",
  power: "int",
  contact: "int",
  speed: "int",
  fielding: "int",
  arm: "int",
  velocity: "int",
  junk: "int",
  accuracy: "int",
  age: "int",
  gender: "int",
  throws: "int",
  bats: "int",
  secondaryPosition: "int",
  jerseyNumber: "int",
  traitId1: "int",
  traitId2: "int",
  careerStart: "int",
  careerEnd: "int",
  fourSeamFastball: "int",
  twoSeamFastball: "int",
  screwball: "int",
  changeup: "int",
  forkball: "int",
  curveball: "int",
  slider: "int",
  cutFastball: "int",
  windup: "int",
  pitchAngle: "int",
  playerChemistry: "string",
  salary: "int",
  teamName: "string",
  league: "string",
  trait1: "string",
  trait2: "string",
};

const main = async () => {
  const formatted = playerJson.map((player) => {
    return Object.keys(player).reduce((acc, key) => {
      if (key === "teamName") {
        acc.team = player[key] ?? null;
      } else if (key === "chemistry1") {
        acc.traitChemistry1 = player[key] ?? null;
      } else if (key === "chemistry2") {
        acc.traitChemistry2 = player[key] ?? null;
      } else if (allow[key]) {
        acc[key] =
          allow[key] === "string" ? String(player[key]) : +player[key] || null;
      }
      return acc;
    }, {});
  });

  const count = await db.player.createMany({
    data: formatted,
  });

  return count;
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
