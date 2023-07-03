export type TChemistry = { type: string; chemistry: string };

export interface IPlayer {
  localID: number;
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
  teamSlug: string;
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

export interface ILoading {
  players: boolean;
  team: boolean;
  teams: boolean;
}

export type TAllFilters = {
  [key: string]: TFilter[];
};

export interface IAppContext {
  loading: ILoading;
  sortPlayers: any;
  fetchPlayers: any;
  fetchPitchers: any;
  fetchAllTeams: any;
  fetchSingleTeam: any;
  fetchSinglePlayer: any;
  players: IPlayer[];
  team?: ITeam;
  allTeams?: ITeam[];
  filters?: TAllFilters;
  setFilter?: (type: string, value: TFilter) => void;
  hasMorePlayers: boolean;
  playerCount?: number;
  isPitchers: boolean;
}

export type TFilter = { name: string; checked: boolean };
