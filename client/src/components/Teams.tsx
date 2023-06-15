import { useEffect } from "react";
import { SContainer, SHeader } from "./styles";
import { useApi } from "../hooks/useApi";

const Teams = () => {
  const { fetchAllTeams, fetchTeam, team, allTeams } = useApi();

  useEffect(() => {
    fetchAllTeams();
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
};

export default Teams;
