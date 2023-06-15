import { useEffect } from "react";

import { SContainer, SHeader } from "./styles";
import { useApi } from "../hooks/useApi";
import { IPlayer } from "../types";

const PlayersView = () => {
  const { fetchAllPlayers, players } = useApi();
  useEffect(() => {
    fetchAllPlayers();
  }, []);

  const tableHeaders = players ? Object.keys(players[0]) : [];

  if (!players) {
    return <SHeader>loading</SHeader>;
  }

  return (
    <SContainer>
      <SHeader>Welcome to Really Epic Hardball</SHeader>
      <div>
        <table>
          <thead>
            <tr>
              {tableHeaders.map((attributeKey) => {
                return <th>{attributeKey}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {players?.map((player: IPlayer) => {
              return (
                <tr key={player.firstName}>
                  {tableHeaders.map((attributeKey) => {
                    return <td>{player[attributeKey]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SContainer>
  );
};

export default PlayersView;
