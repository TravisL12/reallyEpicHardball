import { useEffect, useState } from "react";
import axios from "axios";

import { ITeam, IPlayer, ILoading } from "../types";
import { BASE_URL } from "../constants";

const PLAYER_SIZE = 100;

export const useApi = () => {
  const [team, setTeam] = useState<ITeam | undefined>();
  const [allTeams, setAllTeams] = useState<ITeam[] | undefined>();

  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [playerSort, setPlayerSort] = useState<{
    sortAttr: string;
    isAsc: boolean;
  }>({ sortAttr: "team", isAsc: true });
  const [playersPage, setPlayersPage] = useState<number>(0);

  const [loading, setLoading] = useState<ILoading>({
    players: false,
    team: false,
    teams: false,
  });

  useEffect(() => {
    fetchPlayers(true);
  }, [playerSort]);

  const updateLoading = async (attr: string, cb: () => Promise<void>) => {
    setLoading({ ...loading, [attr]: true });
    await cb();
    setLoading({ ...loading, [attr]: false });
  };

  const sortPlayers = (sortAttr: string) => {
    setPlayersPage(0);
    const isChangedSortAttr = sortAttr !== playerSort.sortAttr;
    const isAsc = isChangedSortAttr ? playerSort.isAsc : !playerSort.isAsc;
    setPlayerSort({ sortAttr, isAsc });
  };

  const fetchPlayers = (shouldReset?: boolean) => {
    updateLoading("players", async () => {
      const { sortAttr, isAsc } = playerSort;
      const { data } = await axios.get(`${BASE_URL}/players`, {
        params: {
          skip: PLAYER_SIZE * playersPage,
          take: PLAYER_SIZE,
          sortAttr,
          isAsc,
        },
      });
      setPlayersPage(playersPage + 1);
      setPlayers(shouldReset ? data.players : [...players, ...data.players]);
    });
  };

  const fetchAllTeams = () => {
    updateLoading("teams", async () => {
      const { data } = await axios(`${BASE_URL}/teams`);
      setAllTeams(data.teams);
    });
  };

  const fetchSingleTeam = ({ teamName }: { teamName: string }) => {
    updateLoading("team", async () => {
      const { data } = await axios.get(`${BASE_URL}/team`, {
        params: { name: teamName },
      });
      setTeam(data.team);
    });
  };

  return {
    loading,
    sortPlayers,
    fetchPlayers,
    fetchAllTeams,
    fetchSingleTeam,
    players,
    team,
    allTeams,
  };
};
