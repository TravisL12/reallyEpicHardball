export interface IPlayer {
  [key: string]: any;
}

export interface ITeam {
  name: string;
  players?: IPlayer[];
}
