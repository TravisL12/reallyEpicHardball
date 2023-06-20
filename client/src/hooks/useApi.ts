import { useState } from "react";
import axios from "axios";

import { ITeam } from "../types";
import { IPlayer } from "../types";
import { BASE_URL } from "../constants";

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

  const fetchTeam = async ({
    id,
    teamName,
  }: {
    id?: number;
    teamName?: string;
  }) => {
    const qs = teamName ? `name=${teamName}` : `id=${id}`;
    const { data } = await axios(`${BASE_URL}/team?${qs}`);
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
