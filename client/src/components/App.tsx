import { Routes, Route } from "react-router-dom";

import { SAppContainer, SBodyContainer } from "./styles";
import Teams from "./Teams";
import PlayersView from "./PlayersView";
import AppHeader from "./AppHeader";

const App = () => {
  return (
    <SAppContainer direction="column">
      <AppHeader />
      <SBodyContainer>
        <Routes>
          <Route path="/" element={<PlayersView />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </SBodyContainer>
    </SAppContainer>
  );
};

export default App;
