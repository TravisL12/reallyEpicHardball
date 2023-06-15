import { Routes, Route } from "react-router-dom";

import { SContainer } from "./styles";
import Teams from "./Teams";
import PlayersView from "./PlayersView";
import AppHeader from "./AppHeader";

const App = () => {
  return (
    <SContainer>
      <AppHeader />
      <Routes>
        <Route path="/" element={<PlayersView />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
    </SContainer>
  );
};

export default App;
