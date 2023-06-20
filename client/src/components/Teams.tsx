import { useEffect } from "react";
import { useApi } from "../utilities/useApi";
import PlayersTable from "./PlayersTable";

const Teams = () => {
  const { fetchAllTeams, fetchTeam, team, allTeams, sortPlayers } = useApi();

  useEffect(() => {
    fetchAllTeams();
  }, []);

  // sortPlayers is calling fetchPlayers, need to adjust for Teams view

  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <ul>
            {allTeams?.map((team) => {
              return (
                <li
                  key={team.name}
                  onClick={() => {
                    fetchTeam({ id: team.id });
                  }}
                >
                  {team.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          {team?.players && (
            <PlayersTable players={team.players} sort={sortPlayers} />
          )}
        </div>
      </div>
    </>
  );
};

export default Teams;
