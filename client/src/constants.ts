export const BASE_URL = `http://${window.location.hostname}:5005`;
const IMAGES_LOCAL = `${BASE_URL}/images`;
const IMAGE_AWS_URL = `https://smb4.s3.us-west-2.amazonaws.com`;
export const IMAGE_BASE_URL = IMAGES_LOCAL;

export const SKILLS = {
  arsenal: "arsenal",
  fullName: "fullName",
  team: "team",
  teamSlug: "teamSlug",
  bats: "bats",
  throws: "throws",
  gender: "gender",
  primaryPosition: "primaryPosition",
  primaryPositionShort: "primaryPositionShort",
  secondaryPosition: "secondaryPosition",
  secondaryPositionShort: "secondaryPositionShort",
  pitcherRole: "pitcherRole",
  pitcherRoleShort: "pitcherRoleShort",
  league: "league",
  trait1: "trait1",
  trait2: "trait2",
  localID: "localID",
  teamId: "teamId",
  leagueId: "leagueId",
  firstName: "firstName",
  lastName: "lastName",
  power: "power",
  contact: "contact",
  speed: "speed",
  rating: "rating",
  fielding: "fielding",
  arm: "arm",
  velocity: "velocity",
  junk: "junk",
  accuracy: "accuracy",
  age: "age",
  jerseyNumber: "jerseyNumber",
  traitId1: "traitId1",
  traitId2: "traitId2",
  careerStart: "careerStart",
  careerEnd: "careerEnd",
  windup: "windup",
  pitchAngle: "pitchAngle",
  playerChemistry: "playerChemistry",
  salary: "salary",
};

// also used for the listed table headers
export const PLAYER_ATTRIBUTES: string[] = [
  SKILLS.team,
  SKILLS.league,
  SKILLS.fullName,
  SKILLS.primaryPositionShort,
  SKILLS.secondaryPositionShort,
  SKILLS.power,
  SKILLS.contact,
  SKILLS.speed,
  SKILLS.fielding,
  SKILLS.arm,
  SKILLS.bats,
  SKILLS.throws,
  SKILLS.age,
  SKILLS.playerChemistry,
  SKILLS.trait1,
  SKILLS.trait2,
];

export const PITCHER_ATTRIBUTES: string[] = [
  SKILLS.team,
  SKILLS.league,
  SKILLS.fullName,
  SKILLS.pitcherRoleShort,
  SKILLS.velocity,
  SKILLS.junk,
  SKILLS.accuracy,
  SKILLS.arsenal,
  SKILLS.throws,
  SKILLS.age,
  SKILLS.playerChemistry,
  SKILLS.trait1,
  SKILLS.trait2,
];

// for columns with abbreviated (short) names
export const playerColumnSort = {
  [SKILLS.fullName]: SKILLS.firstName,
  [SKILLS.primaryPositionShort]: SKILLS.primaryPosition,
  [SKILLS.secondaryPositionShort]: SKILLS.secondaryPosition,
  [SKILLS.pitcherRoleShort]: SKILLS.pitcherRole,
};

export const PITCH_TYPE: { [key: string]: { short: string; full: string } } = {
  fourSeamFastball: { short: "4F", full: "4-seam fastball" },
  twoSeamFastball: { short: "2F", full: "2-seam fastball" },
  cutFastball: { short: "CF", full: "Cut fastball" },
  curveball: { short: "CB", full: "Curveball" },
  slider: { short: "SL", full: "Slider" },
  screwball: { short: "SB", full: "Screwball" },
  changeup: { short: "CH", full: "Change up" },
  forkball: { short: "FK", full: "Forkball" },
};

export const tableHeaders: { [key: string]: string } = {
  [SKILLS.team]: "team",
  [SKILLS.fullName]: "name",
  [SKILLS.primaryPositionShort]: "pos",
  [SKILLS.secondaryPositionShort]: "pos2",
  [SKILLS.rating]: "rating",
  [SKILLS.power]: "pow",
  [SKILLS.contact]: "con",
  [SKILLS.speed]: "spd",
  [SKILLS.fielding]: "fld",
  [SKILLS.arm]: "arm",
  [SKILLS.bats]: "bat",
  [SKILLS.throws]: "thr",
  [SKILLS.age]: "age",
  [SKILLS.pitcherRoleShort]: "pitch",
  [SKILLS.arsenal]: "arsenal",
  [SKILLS.velocity]: "vel",
  [SKILLS.junk]: "jnk",
  [SKILLS.accuracy]: "acc",
  [SKILLS.trait1]: "trait",
  [SKILLS.trait2]: "trait 2",
  [SKILLS.jerseyNumber]: "#",
  [SKILLS.playerChemistry]: "chem",
  [SKILLS.careerStart]: "strt",
  [SKILLS.salary]: "$",
};

export const centeredColumns: string[] = [
  SKILLS.primaryPositionShort,
  SKILLS.secondaryPositionShort,
  SKILLS.power,
  SKILLS.contact,
  SKILLS.speed,
  SKILLS.fielding,
  SKILLS.arm,
  SKILLS.bats,
  SKILLS.throws,
  SKILLS.age,
  SKILLS.arsenal,
  SKILLS.pitcherRoleShort,
  SKILLS.velocity,
  SKILLS.junk,
  SKILLS.accuracy,
  SKILLS.playerChemistry,
  SKILLS.league,
];

export const imageColumns = {
  [SKILLS.playerChemistry]: `${IMAGE_BASE_URL}/chemistry/player/`,
  [SKILLS.trait1]: `${IMAGE_BASE_URL}/chemistry/trait/`,
  [SKILLS.trait2]: `${IMAGE_BASE_URL}/chemistry/trait/`,
  [SKILLS.league]: `${IMAGE_BASE_URL}/leagues/`,
  [SKILLS.teamSlug]: `${IMAGE_BASE_URL}/teams/`,
  playerImage: `${IMAGE_BASE_URL}/players/`,
};

export const numberColumns: string[] = [
  SKILLS.power,
  SKILLS.contact,
  SKILLS.speed,
  SKILLS.fielding,
  SKILLS.arm,
  SKILLS.velocity,
  SKILLS.junk,
  SKILLS.accuracy,
];

export const ALL_GENDER = ["M", "F"];
export const ALL_BATS = ["R", "L", "S"];
export const ALL_THROWS = ["R", "L"];
export const ALL_LEAGUE = ["superMega", "legends", "creators"];
export const ALL_PITCHING = ["SP", "SP/RP", "RP", "CP"];
export const ALL_POSITIONS = [
  "C",
  "1B",
  "2B",
  "3B",
  "SS",
  "LF",
  "CF",
  "RF",
  "P",
];
export const SECOND_POSITIONS = [
  ...ALL_POSITIONS.slice(0, -1), // remove "P"
  "IF",
  "OF",
  "1B/OF",
  "IF/OF",
  "None",
];
export const ALL_PITCHES = Object.keys(PITCH_TYPE).map((pitchKey) => {
  return PITCH_TYPE[pitchKey].short;
});
