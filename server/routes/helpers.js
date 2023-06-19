const { omit } = require("lodash");

const PITCHES = [
  "fourSeamFastball",
  "twoSeamFastball",
  "screwball",
  "changeup",
  "forkball",
  "curveball",
  "slider",
  "cutFastball",
];

const createArsenal = (player) => {
  return PITCHES.filter((pitch) => {
    return player[pitch];
  });
};

const transformPlayer = (player) => {
  const { team, league, trait1, trait2 } = player;
  const arsenal = createArsenal(player);
  return {
    ...omit(player, PITCHES),
    arsenal,
    team: team?.name,
    league: league?.name,
    trait1: trait1?.type,
    trait2: trait2?.type,
  };
};

module.exports = { transformPlayer };
