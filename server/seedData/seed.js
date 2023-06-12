const { uniqBy } = require("lodash");
const { db } = require("../db");
const playerJson = require("./playersComplete.json");
const traitsJson = require("./traitsDescription.json");

const findTrait = (type, allTraits) => {
  return allTraits.find((t) => t.type === type);
};

const allow = [
  "localID",
  "firstName",
  "lastName",
  "primaryPosition",
  "pitcherRole",
  "power",
  "contact",
  "speed",
  "fielding",
  "arm",
  "velocity",
  "junk",
  "accuracy",
  "age",
  "gender",
  "throws",
  "bats",
  "secondaryPosition",
  "jerseyNumber",
  "rating",
  "traitId1",
  "traitId2",
  "careerStart",
  "careerEnd",
  "fourSeamFastball",
  "twoSeamFastball",
  "screwball",
  "changeup",
  "forkball",
  "curveball",
  "slider",
  "cutFastball",
  "windup",
  "pitchAngle",
  "playerChemistry",
  "salary",
];

const main = async () => {
  const allTeamnames = uniqBy(
    playerJson.map(({ teamName }) => ({ name: teamName })),
    "name"
  );

  const leagues = uniqBy(
    playerJson.map(({ league }) => ({ name: league })),
    "name"
  );

  await db.trait.createMany({
    data: Object.values(traitsJson),
  });

  await db.team.createMany({
    data: allTeamnames,
  });

  await db.league.createMany({
    data: leagues,
  });

  const allTraits = await db.trait.findMany();
  const allTeams = await db.team.findMany();
  const allLeagues = await db.league.findMany();

  const formatted = playerJson.map((player) => {
    return Object.keys(player).reduce((acc, key) => {
      if (key === "trait1") {
        const trait = findTrait(String(player[key]), allTraits);
        acc.traitId1 = trait?.id ? String(trait.id) : undefined;
      } else if (key === "trait2") {
        const trait = findTrait(String(player[key]), allTraits);
        acc.traitId2 = trait?.id ? String(trait.id) : undefined;
      } else if (key === "teamName") {
        const team = allTeams.find((t) => t.name === player[key]);
        acc.teamId = team ? String(team.id) : undefined;
      } else if (key === "league") {
        const league = allLeagues.find((t) => t.name === player[key]);
        acc.leagueId = league ? String(league.id) : undefined;
      } else if (allow.includes(key)) {
        acc[key] = String(player[key]);
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
