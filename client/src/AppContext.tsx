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
  players: [],
  team: undefined,
  allTeams: undefined,
  filters: undefined,
  setFilter: undefined,
  hasMorePlayers: false,
  playerCount: undefined,
  isPitchers: false,
  hasFreeAgents: true,
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const isPitchers = !!useMatch("pitchers");
  const { filters, setFilter, hasFreeAgents } = useFilters();
  const apiData = useApi(filters, isPitchers, hasFreeAgents);

  return (
    <AppContext.Provider
      value={{ ...apiData, hasFreeAgents, filters, setFilter, isPitchers }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
