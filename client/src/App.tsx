import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ITeam } from "./types";

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
    <div className="App">
      <header className="App-header">
        <p>Welcome to Really Epic Hardball</p>
        <h3>{team?.name}</h3>
        <ul>
          {team?.players?.map((player) => {
            const fullName = `${player.firstName} ${player.lastName}`;
            return <li key={fullName}>{fullName}</li>;
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;
