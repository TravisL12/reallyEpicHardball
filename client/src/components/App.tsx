import { useEffect, useState } from "react";
import axios from "axios";
import { ITeam } from "../types";
import { SContainer, SHeader } from "./styles";

function App() {
  const [team, setTeam] = useState<ITeam | undefined>();
  const [allTeams, setAllTeams] = useState<ITeam[] | undefined>();

  const fetchAllTeams = async () => {
    const { data } = await axios(`http://localhost:5005/teams`);
    setAllTeams(data.teams);
  };

  const fetchTeam = async (teamName: string) => {
    const { data } = await axios(`http://localhost:5005/team?name=${teamName}`);
    setTeam(data.team);
  };

  useEffect(() => {
    fetchAllTeams();
    fetchTeam("Crocodons");
  }, []);

  return (
    <SContainer>
      <SHeader>Welcome to Really Epic Hardball</SHeader>
      <div style={{ display: "flex" }}>
        <div>
          <ul>
            {allTeams?.map((team) => {
              return (
                <li
                  key={team.name}
                  onClick={() => {
                    fetchTeam(team.name);
                  }}
                >
                  {team.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <SHeader>{team?.name}</SHeader>
          <ul>
            {team?.players?.map((player) => {
              const fullName = `${player.firstName} ${player.lastName}`;
              return <li key={fullName}>{fullName}</li>;
            })}
          </ul>
        </div>
      </div>
    </SContainer>
  );
}

export default App;
