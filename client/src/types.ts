export interface IPlayer {
  firstName: string;
  lastName: string;
}

export interface ITeam {
  name: string;
  players?: IPlayer[];
}
