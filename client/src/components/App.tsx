import { Routes, Route } from "react-router-dom";

import { SAppContainer } from "../styles/styles";
import Teams from "./Teams";
import Players from "./Players";
import AppHeader from "./AppHeader";
import { AppContextProvider } from "../AppContext";
import PlayerInfo from "./PlayerInfo";
import Pitchers from "./Pitchers";

const App = () => {
  return (
    <AppContextProvider>
      <SAppContainer direction="column">
        <AppHeader />
        <Routes>
          <Route path="/teams" element={<Teams />} />
          <Route path="/" element={<Players />}>
            <Route path="player/:localId" element={<PlayerInfo />} />
          </Route>
          <Route path="/pitchers" element={<Pitchers />}>
            <Route path="player/:localId" element={<PlayerInfo />} />
          </Route>
        </Routes>
      </SAppContainer>
    </AppContextProvider>
  );
};

export default App;
