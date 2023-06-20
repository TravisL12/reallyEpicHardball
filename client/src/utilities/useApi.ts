import { useEffect, useState } from "react";
import axios from "axios";

import { ITeam } from "../types";
import { IPlayer } from "../types";
import { BASE_URL } from "../constants";

const PLAYER_SIZE = 100;

export const useApi = () => {
  const [team, setTeam] = useState<ITeam | undefined>();
  const [allTeams, setAllTeams] = useState<ITeam[] | undefined>();

  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [playerSort, setPlayerSort] = useState<{
    sortAttr: string;
    isAsc: boolean;
  }>({ sortAttr: "id", isAsc: true });
  const [playersPage, setPlayersPage] = useState<number>(0);

  const [loading, setLoading] = useState({
    players: false,
    team: false,
    teams: false,
  });

  useEffect(() => {
    fetchPlayers(true);
  }, [playerSort]);

  const updateLoading = (attr: string, isLoading: boolean) => {
    setLoading({ ...loading, [attr]: isLoading });
  };

  const fetchAllTeams = async () => {
    updateLoading("teams", true);
    const { data } = await axios(`${BASE_URL}/teams`);
    setAllTeams(data.teams);
    updateLoading("teams", false);
  };

  const sortPlayers = (sortAttr: string) => {
    setPlayersPage(0);
    const isChangedSortAttr = sortAttr !== playerSort.sortAttr;
    const isAsc = isChangedSortAttr ? playerSort.isAsc : !playerSort.isAsc;
    setPlayerSort({ sortAttr, isAsc });
  };

  const fetchPlayers = async (shouldReset?: boolean) => {
    const { sortAttr, isAsc } = playerSort;
    updateLoading("players", true);
    const { data } = await axios.get(`${BASE_URL}/players`, {
      params: {
        skip: PLAYER_SIZE * playersPage,
        take: PLAYER_SIZE,
        sortAttr,
        isAsc,
      },
    });
    setPlayersPage(shouldReset ? 0 : playersPage + 1);
    setPlayers(shouldReset ? data.players : [...players, ...data.players]);
    updateLoading("players", false);
  };

  const fetchTeam = async ({
    id,
    teamName,
  }: {
    id?: number;
    teamName?: string;
  }) => {
    updateLoading("team", true);
    const { data } = await axios.get(`${BASE_URL}/team`, {
      params: { name: teamName, id },
    });
    setTeam(data.team);
    updateLoading("team", false);
  };

  return {
    loading,
    sortPlayers,
    fetchPlayers,
    fetchAllTeams,
    fetchTeam,
    players,
    team,
    allTeams,
  };
};
