export interface IPlayer {
  [key: string]: string;
}

export interface ITeam {
  id: number;
  name: string;
  players?: IPlayer[];
}
