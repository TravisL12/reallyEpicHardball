import { Routes, Route } from "react-router-dom";

import { SAppContainer, SBodyContainer } from "../styles/styles";
import Teams from "./Teams";
import Players from "./Players";
import AppHeader from "./AppHeader";
import { AppContextProvider } from "../AppContext";

const App = () => {
  return (
    <AppContextProvider>
      <SAppContainer direction="column">
        <AppHeader />
        <SBodyContainer>
          <Routes>
            <Route path="/" element={<Players />} />
            <Route path="/teams" element={<Teams />} />
          </Routes>
        </SBodyContainer>
      </SAppContainer>
    </AppContextProvider>
  );
};

export default App;
