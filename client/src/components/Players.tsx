import { useEffect } from "react";

import { useApi } from "../hooks/useApi";
import PlayersTable from "./PlayersTable";

const Players = () => {
  const { fetchAllPlayers, players } = useApi();
  useEffect(() => {
    fetchAllPlayers();
  }, []);

  return <PlayersTable players={players} />;
};

export default Players;
