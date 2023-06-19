export interface IPlayer {
  [key: string]: any;
}

export interface ITeam {
  id: number;
  name: string;
  players?: IPlayer[];
}
