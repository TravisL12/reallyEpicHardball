export type TChemistry = { type: string; chemistry: string };

export interface IPlayer {
  firstName: string;
  lastName: string;
  pitcherRole: string;
  power: number;
  contact: number;
  speed: number;
  fielding: number;
  arm: number | null;
  velocity: number;
  junk: number;
  accuracy: number;
  age: number;
  gender: string;
  throws: string;
  bats: string;
  jerseyNumber: number;
  careerStart: number | null;
  careerEnd: number | null;
  windup: number;
  pitchAngle: number;
  playerChemistry: string;
  salary: number;
  team: string;
  league: string;
  trait1: TChemistry;
  trait2: null;
  arsenal: string[];
  fullName: string;
  pitcherRoleShort: string;
}

export interface ITeam {
  team: string;
  players?: IPlayer[];
}
