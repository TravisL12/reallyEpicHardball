import { useEffect, useState } from "react";
import axios from "axios";
import { ITeam } from "../types";
import { SContainer, SHeader } from "./styles";

function App() {
  const [team, setTeam] = useState<ITeam | undefined>();

  const fetchTeam = async (teamName: string) => {
    const { data } = await axios(`http://localhost:5005/team?name=${teamName}`);
    setTeam(data.team);
  };

  useEffect(() => {
    fetchTeam("Crocodons");
  }, []);

  return (
    <SContainer>
      <header className="App-header">
        <p>Welcome to Really Epic Hardball</p>
        <SHeader>{team?.name}</SHeader>
        <ul>
          {team?.players?.map((player) => {
            const fullName = `${player.firstName} ${player.lastName}`;
            return <li key={fullName}>{fullName}</li>;
          })}
        </ul>
      </header>
    </SContainer>
  );
}

export default App;
