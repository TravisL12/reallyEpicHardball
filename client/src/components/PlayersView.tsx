import { useEffect } from "react";
import { PLAYER_ATTRIBUTES } from "../constants";

import { SHeader } from "./styles";
import { useApi } from "../hooks/useApi";
import { IPlayer } from "../types";

const PlayersView = () => {
  const { fetchAllPlayers, players } = useApi();
  useEffect(() => {
    fetchAllPlayers();
  }, []);

  if (!players) {
    return <SHeader>loading</SHeader>;
  }

  return (
    <table>
      <thead>
        <tr>
          {PLAYER_ATTRIBUTES.map((attributeKey) => {
            return <th>{attributeKey}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {players?.map((player: IPlayer) => {
          return (
            <tr key={player.firstName}>
              {PLAYER_ATTRIBUTES.map((attributeKey) => {
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
