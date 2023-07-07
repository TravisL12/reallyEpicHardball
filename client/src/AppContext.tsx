import React, { createContext, useContext } from "react";
import { useApi } from "./utilities/useApi";
import { IAppContext } from "./types";
import { useFilters } from "./utilities/useFilters";
import { useMatch } from "react-router-dom";

const AppContext = createContext<IAppContext>({
  loading: { players: false, team: false, teams: false },
  sortPlayers: undefined,
  fetchPlayers: undefined,
  fetchPitchers: undefined,
  fetchAllTeams: undefined,
  fetchSingleTeam: undefined,
  fetchSinglePlayer: undefined,
  players: undefined,
  team: undefined,
  allTeams: undefined,
  filters: {},
  setFilter: () => {
    return false;
  },
  setAllFilters: () => {
    return false;
  },
  hasMorePlayers: false,
  playerCount: undefined,
  isPitchers: false,
  playerSort: { sortAttr: "", isAsc: true },
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const isPitchers = !!useMatch("/pitchers/*");
  const { filters, setFilter, setAllFilters } = useFilters(isPitchers);
  const apiData = useApi(filters, isPitchers);

  return (
    <AppContext.Provider
      value={{
        ...apiData,

        filters,
        setFilter,
        setAllFilters,
        isPitchers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
