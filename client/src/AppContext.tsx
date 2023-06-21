import React, { createContext, useContext } from "react";
import { useApi } from "./utilities/useApi";

const AppContext = createContext<{ loading: any }>({ loading: {} });

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useApi();

  return (
    <AppContext.Provider value={{ loading }}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
