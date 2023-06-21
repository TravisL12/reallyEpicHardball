import { useEffect } from "react";

import { useApi } from "../utilities/useApi";
import PlayersTable from "./PlayersTable";
import { useInView } from "react-intersection-observer";

const Players = () => {
  const { loading, fetchPlayers, players, sortPlayers } = useApi();
  useEffect(() => {
    fetchPlayers();
  }, []);

  const { ref } = useInView({
    threshold: 0.25,
    onChange: (inView) => {
      if (inView && players.length > 0 && !loading.players) {
        fetchPlayers();
      }
    },
  });

  return (
    <PlayersTable players={players} loadMoreRef={ref} sort={sortPlayers} />
  );
};

export default Players;
