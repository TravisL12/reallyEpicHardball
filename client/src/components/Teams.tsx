import { useEffect } from "react";
import { useApi } from "../hooks/useApi";
import PlayersTable from "./PlayersTable";

const Teams = () => {
  const { fetchAllTeams, fetchTeam, team, allTeams } = useApi();

  useEffect(() => {
    fetchAllTeams();
  }, []);

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
        <div>{team?.players && <PlayersTable players={team.players} />}</div>
      </div>
    </>
  );
};

export default Teams;
