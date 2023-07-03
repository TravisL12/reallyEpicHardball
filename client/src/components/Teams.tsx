import { useEffect } from "react";
import PlayersTable from "./PlayersTable";
import { useAppContext } from "../AppContext";
import { SBodyContainer } from "../styles/styles";
import { PLAYER_ATTRIBUTES } from "../constants";

const Teams = () => {
  const { fetchAllTeams, fetchSingleTeam, team, allTeams } = useAppContext();

  useEffect(() => {
    fetchAllTeams();
  }, []);

  // sortPlayers is calling fetchPlayers, need to adjust for Teams view

  return (
    <SBodyContainer>
      <div style={{ display: "flex" }}>
        <div>
          <ul>
            {allTeams?.map(({ team: teamName }) => {
              return (
                <li
                  key={teamName}
                  onClick={() => {
                    fetchSingleTeam({ teamName });
                  }}
                >
                  {teamName}
                </li>
              );
            })}
          </ul>
        </div>
        {team?.players && (
          <PlayersTable columns={PLAYER_ATTRIBUTES} players={team.players} />
        )}
      </div>
    </SBodyContainer>
  );
};

export default Teams;
