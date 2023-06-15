import { useState } from "react";
import { ITeam } from "../types";
import axios from "axios";
import { IPlayer } from "../types";

const BASE_URL = "http://localhost:5005";

export const useApi = () => {
  const [team, setTeam] = useState<ITeam | undefined>();
  const [allTeams, setAllTeams] = useState<ITeam[] | undefined>();
  const [players, setPlayers] = useState<IPlayer[] | undefined>();

  const fetchAllTeams = async () => {
    const { data } = await axios(`${BASE_URL}/teams`);
    setAllTeams(data.teams);
  };

  const fetchAllPlayers = async () => {
    const { data } = await axios(`${BASE_URL}/players`);
    setPlayers(data.players);
  };

  const fetchTeam = async (teamName: string) => {
    const { data } = await axios(`${BASE_URL}/team?name=${teamName}`);
    setTeam(data.team);
  };

  return {
    fetchAllPlayers,
    fetchAllTeams,
    fetchTeam,
    players,
    team,
    allTeams,
  };
};
