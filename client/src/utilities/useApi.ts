import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { ITeam, IPlayer, ILoading, TAllFilters, TPlayerSort } from "../types";
import { BASE_URL } from "../constants";

const PLAYER_SIZE = 100;

export const useApi = ({
  allFilters,
  isPitchers,
}: {
  allFilters: { filters: TAllFilters; nameFilter?: string };
  isPitchers: boolean;
}) => {
  const { filters, nameFilter } = allFilters;
  const [team, setTeam] = useState<ITeam | undefined>();
  const [allTeams, setAllTeams] = useState<ITeam[] | undefined>();

  const [hasMorePlayers, setHasMorePlayers] = useState<boolean>(true);
  const [playerCount, setPlayerCount] = useState<number | undefined>();
  const [players, setPlayers] = useState<IPlayer[] | undefined>(undefined);
  const [playerSort, setPlayerSort] = useState<TPlayerSort>({
    sortAttr: "team",
    isAsc: true,
  });
  const [playersPage, setPlayersPage] = useState<number>(0);

  const [loading, setLoading] = useState<ILoading>({
    players: false,
    team: false,
    teams: false,
  });

  const apiFilters = useMemo(() => {
    return Object.keys(filters).reduce((acc: any, filterKey) => {
      acc[filterKey] = filters[filterKey]
        .filter((f) => f.checked)
        .map((f) => f.name);
      return acc;
    }, {});
  }, [filters]);

  useEffect(() => {
    if (!players) {
      return;
    }
    fetchPlayers(true);
  }, [playerSort, nameFilter, JSON.stringify(apiFilters)]);

  const updateLoading = async (attr: string, cb: () => Promise<void>) => {
    setLoading({ ...loading, [attr]: true });
    await cb();
    setLoading({ ...loading, [attr]: false });
  };

  const sortPlayers = (sortAttr: string) => {
    const isChangedSortAttr = sortAttr !== playerSort.sortAttr;
    const isAsc = isChangedSortAttr ? playerSort.isAsc : !playerSort.isAsc;
    setPlayerSort({ sortAttr, isAsc });
  };

  const fetchSinglePlayer = async (localID: number) => {
    const findPlayer = players?.find((player) => +player.localID === +localID);
    if (findPlayer) {
      return Promise.resolve(findPlayer);
    }

    const { data } = await axios.get(`${BASE_URL}/player`, {
      params: { localID },
    });
    return data.player;
  };

  const fetchPlayers = (shouldReset?: boolean) => {
    updateLoading("players", async () => {
      const { sortAttr, isAsc } = playerSort;
      const { data } = await axios.get(
        `${BASE_URL}/${isPitchers ? "pitchers" : "players"}`,
        {
          params: {
            skip: shouldReset ? 0 : PLAYER_SIZE * playersPage,
            take: PLAYER_SIZE,
            sortAttr,
            isAsc,
            nameQuery: nameFilter,
            ...apiFilters,
          },
        }
      );
      setPlayersPage(shouldReset ? 1 : playersPage + 1);
      setHasMorePlayers(data.hasMore);
      setPlayerCount(data.count);
      setPlayers(
        shouldReset ? data.players : [...(players || []), ...data.players]
      );
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
    sortPlayers,
    fetchPlayers,
    fetchAllTeams,
    fetchSingleTeam,
    fetchSinglePlayer,
    loading,
    players,
    team,
    allTeams,
    hasMorePlayers,
    playerCount,
    playerSort,
  };
};
