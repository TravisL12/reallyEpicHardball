import { useEffect } from "react";

import { SHeader } from "./styles";
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
  );
};

export default PlayersView;
