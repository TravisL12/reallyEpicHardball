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
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const apiData = useApi();
  const { filters, setFilter } = useFilters();

  return (
    <AppContext.Provider value={{ ...apiData, filters, setFilter }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
