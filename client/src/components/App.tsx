import { Routes, Route } from "react-router-dom";

import { SAppContainer } from "../styles/styles";
import Teams from "./Teams";
import Players from "./Players";
import AppHeader from "./AppHeader";
import { AppContextProvider } from "../AppContext";
import PlayerInfo from "./PlayerInfo";

const App = () => {
  return (
    <AppContextProvider>
      <SAppContainer direction="column">
        <AppHeader />
        <Routes>
          <Route path="/player/:localId" element={<PlayerInfo />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/" element={<Players />} />
        </Routes>
      </SAppContainer>
    </AppContextProvider>
  );
};

export default App;
