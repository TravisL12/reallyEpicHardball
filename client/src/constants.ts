export const PLAYER_ATTRIBUTES = [
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
  "careerStart",
  "careerEnd",
  "windup",
  "pitchAngle",
  "playerChemistry",
  "salary",
  "team",
  "league",
  "trait1",
  "trait2",
];

export const PRIMARY_POSITIONS = {
  2: "Catcher",
  3: "First Base",
  4: "Second Base",
  5: "Third Base",
  6: "Shortstop",
  7: "Left Field",
  8: "Center Field",
  9: "Right Field",
};

export const SECONDARY_POSITIONS = {
  10: "Infield",
  11: "Outfield",
  12: "First Base / Outfield",
  13: "Infield / Outfield",
  none: "No 2nd Pos.",
};

export const PITCHER_ROLES = {
  1: "Starting",
  2: "Starting/Relief",
  3: "Relief",
  4: "Closer",
};

export const ALL_POSITIONS = {
  ...PRIMARY_POSITIONS,
  ...SECONDARY_POSITIONS,
};

export const PITCH_TYPE = {
  fourSeamFastball: { short: "4F", full: "4-seam fastball" },
  twoSeamFastball: { short: "2F", full: "2-seam fastball" },
  cutFastball: { short: "CF", full: "Cut fastball" },
  curveball: { short: "CB", full: "Curveball" },
  slider: { short: "SL", full: "Slider" },
  screwball: { short: "SB", full: "Screwball" },
  changeup: { short: "CH", full: "Change up" },
  forkball: { short: "FK", full: "Forkball" },
};

export const positionsAbbrev = {
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
  [ALL_POSITIONS.none]: "No 2nd Pos.",
  [PITCHER_ROLES[1]]: "SP",
  [PITCHER_ROLES[2]]: "SP/RP",
  [PITCHER_ROLES[3]]: "RP",
  [PITCHER_ROLES[4]]: "CP",
};
