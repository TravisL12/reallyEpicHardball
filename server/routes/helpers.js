const { omit } = require("lodash");

const PITCHER_ROLES = {
  1: "Starting",
  2: "Starting/Relief",
  3: "Relief",
  4: "Closer",
};

const ALL_POSITIONS = {
  1: "Pitcher",
  2: "Catcher",
  3: "First Base",
  4: "Second Base",
  5: "Third Base",
  6: "Shortstop",
  7: "Left Field",
  8: "Center Field",
  9: "Right Field",
  10: "Infield",
  11: "Outfield",
  12: "First Base / Outfield",
  13: "Infield / Outfield",
};

const POSITIONS_ABBREV = {
  [ALL_POSITIONS[1]]: "P",
  [ALL_POSITIONS[2]]: "C",
  [ALL_POSITIONS[3]]: "1B",
  [ALL_POSITIONS[4]]: "2B",
  [ALL_POSITIONS[5]]: "3B",
  [ALL_POSITIONS[6]]: "SS",
  [ALL_POSITIONS[7]]: "LF",
  [ALL_POSITIONS[8]]: "CF",
  [ALL_POSITIONS[9]]: "RF",
  [ALL_POSITIONS[10]]: "IF",
  [ALL_POSITIONS[11]]: "OF",
  [ALL_POSITIONS[12]]: "1B/OF",
  [ALL_POSITIONS[13]]: "IF/OF",
  [PITCHER_ROLES[1]]: "SP",
  [PITCHER_ROLES[2]]: "SP/RP",
  [PITCHER_ROLES[3]]: "RP",
  [PITCHER_ROLES[4]]: "CP",
};

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
  return PITCHES.filter((pitch) => player[pitch]);
};

const transformPlayer = (player) => {
  const {
    firstName,
    lastName,
    trait1: t1,
    trait2: t2,
    traitChemistry1,
    traitChemistry2,
  } = player;
  const bats = player.bats === 1 ? "R" : player.bats === 2 ? "S" : "L";
  console.log(player.throws);
  const throws = player.throws === 1 ? "R" : "L";
  const gender = player.gender === 1 ? "F" : "M";

  const primaryPosition = ALL_POSITIONS[player.primaryPosition];
  const primaryPositionShort = POSITIONS_ABBREV[primaryPosition];

  const secondaryPosition = ALL_POSITIONS[player.secondaryPosition];
  const secondaryPositionShort = POSITIONS_ABBREV[secondaryPosition];

  const pitcherRole = PITCHER_ROLES[player.pitcherRole];
  const pitcherRoleShort = POSITIONS_ABBREV[pitcherRole];
  const fullName = `${firstName} ${lastName}`;
  const arsenal = createArsenal(player);
  const trait1 = { type: t1, chemistry: traitChemistry1 };
  const trait2 = { type: t2, chemistry: traitChemistry2 };
  return {
    ...omit(player, [...PITCHES, "traitChemistry1", "traitChemistry2"]),
    arsenal,
    fullName,
    bats,
    throws,
    gender,
    primaryPosition,
    primaryPositionShort,
    secondaryPosition,
    secondaryPositionShort,
    pitcherRole,
    pitcherRoleShort,
    trait1,
    trait2,
  };
};

module.exports = { transformPlayer };
