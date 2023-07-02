import React, { createContext, useContext } from "react";
import { useApi } from "./utilities/useApi";
import { IAppContext } from "./types";
import { useFilters } from "./utilities/useFilters";

const AppContext = createContext<IAppContext>({
  loading: { players: false, team: false, teams: false },
  sortPlayers: undefined,
  fetchPlayers: undefined,
  fetchAllTeams: undefined,
  fetchSingleTeam: undefined,
  fetchSinglePlayer: undefined,
  players: [],
  team: undefined,
  allTeams: undefined,
  filters: undefined,
  setFilter: undefined,
  hasMorePlayers: false,
  playerCount: undefined,
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { filters, setFilter } = useFilters();
  const apiData = useApi(filters);

  return (
    <AppContext.Provider value={{ ...apiData, filters, setFilter }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
