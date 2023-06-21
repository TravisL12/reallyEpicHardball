import React, { createContext, useContext } from "react";
import { useApi } from "./utilities/useApi";
import { IAppContext } from "./types";

const AppContext = createContext<IAppContext>({
  loading: { players: false, team: false, teams: false },
  sortPlayers: undefined,
  fetchPlayers: undefined,
  fetchAllTeams: undefined,
  fetchSingleTeam: undefined,
  players: [],
  team: undefined,
  allTeams: undefined,
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const apiData = useApi();

  return <AppContext.Provider value={apiData}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
