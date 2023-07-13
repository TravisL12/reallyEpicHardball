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

const playerWhereQuery = ({ bats, position, secondPosition }) => {
  return [
    { OR: bats?.map((i) => ({ bats: +REVERSE_BATS[i] })) },
    {
      OR: position?.map((i) => ({ primaryPosition: REVERSE_PRIMARY_POS[i] })),
    },
    {
      OR: secondPosition?.map((i) => ({
        secondaryPosition: REVERSE_SECOND_POS[i],
      })),
    },
  ];
};

const pitcherWhereQuery = ({ pitching, pitches }) => {
  return [
    {
      OR: pitching?.map((i) => ({ pitcherRole: REVERSE_PITCHING[i] })),
    },
    { OR: { NOT: { pitcherRole: null } } },
    {
      AND: pitches?.map((i) => ({ [REVERSE_PITCHES[i]]: 1 })),
    },
    ,
  ];
};

const sharedWhereQuery = (filters, nameQuery) => {
  const { gender, league, playerChemistry, teams, throws, traits, traits2 } =
    filters;

  return [
    {
      OR: [
        {
          firstName: {
            contains: nameQuery,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: nameQuery,
            mode: "insensitive",
          },
        },
      ],
    },
    { OR: gender?.map((i) => ({ gender: +REVERSE_GENDER[i] })) },
    { OR: league?.map((i) => ({ league: i })) },
    {
      OR: playerChemistry?.map((i) => ({
        playerChemistry: i === "None" ? null : i,
      })),
    },
    { OR: teams?.map((i) => ({ team: i === "Free Agent" ? null : i })) },
    { OR: traits?.map((i) => ({ trait1: i === "None" ? null : i })) },
    { OR: traits2?.map((i) => ({ trait2: i === "None" ? null : i })) },
    { OR: throws?.map((i) => ({ throws: +REVERSE_THROWS[i] })) },
  ];
};

const reverseMap = (items) => {
  return Object.keys(items).reduce((acc, key) => {
    acc[items[key]] = key;
    return acc;
  }, {});
};

const createArsenal = (player) => {
  return PITCHES.filter((pitch) => player[pitch]);
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
const REVERSE_PRIMARY_POS = {
  P: 1,
  C: 2,
  "1B": 3,
  "2B": 4,
  "3B": 5,
  SS: 6,
  LF: 7,
  CF: 8,
  RF: 9,
};

const REVERSE_SECOND_POS = {
  ...REVERSE_PRIMARY_POS,
  IF: 10,
  OF: 11,
  "1B/OF": 12,
  "IF/OF": 13,
  None: null,
};

const REVERSE_PITCHING = {
  SP: 1,
  "SP/RP": 2,
  RP: 3,
  CP: 4,
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

const GENDER = {
  0: "M",
  1: "F",
};

const THROWS = {
  0: "L",
  1: "R",
};

const BATS = {
  0: "L",
  1: "R",
  2: "S",
};

const REVERSE_GENDER = reverseMap(GENDER);
const REVERSE_THROWS = reverseMap(THROWS);
const REVERSE_BATS = reverseMap(BATS);
const REVERSE_PITCHES = {
  "4F": "fourSeamFastball",
  "2F": "twoSeamFastball",
  CF: "cutFastball",
  CB: "curveball",
  SL: "slider",
  SB: "screwball",
  CH: "changeup",
  FK: "forkball",
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
  const fullName = `${firstName} ${lastName}`;
  const throws = THROWS[player.throws];
  const gender = GENDER[player.gender];
  const trait1 = { type: t1, chemistry: traitChemistry1 };
  const trait2 = { type: t2, chemistry: traitChemistry2 };

  const bats = BATS[player.bats];
  const primaryPosition = ALL_POSITIONS[player.primaryPosition];
  const primaryPositionShort = POSITIONS_ABBREV[primaryPosition];
  const secondaryPosition = ALL_POSITIONS[player.secondaryPosition];
  const secondaryPositionShort = POSITIONS_ABBREV[secondaryPosition];

  const pitcherRole = PITCHER_ROLES[player.pitcherRole];
  const pitcherRoleShort = POSITIONS_ABBREV[pitcherRole];
  const arsenal = createArsenal(player);

  return {
    ...omit(player, [...PITCHES, "traitChemistry1", "traitChemistry2"]),
    fullName,
    bats,
    throws,
    gender,
    primaryPosition,
    primaryPositionShort,
    secondaryPosition,
    secondaryPositionShort,
    arsenal,
    pitcherRole,
    pitcherRoleShort,
    trait1,
    trait2,
  };
};

module.exports = {
  transformPlayer,
  sharedWhereQuery,
  playerWhereQuery,
  pitcherWhereQuery,
  REVERSE_GENDER,
  REVERSE_THROWS,
  REVERSE_BATS,
  REVERSE_PRIMARY_POS,
  REVERSE_PITCHING,
  REVERSE_SECOND_POS,
  REVERSE_PITCHES,
};
