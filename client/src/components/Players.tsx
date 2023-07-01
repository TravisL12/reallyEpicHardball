import { useEffect } from "react";

import PlayersTable from "./PlayersTable";
import { useInView } from "react-intersection-observer";
import { useAppContext } from "../AppContext";
import Filters from "./Filters";
import { SBodyContainer } from "../styles/styles";

const Players = () => {
  const { loading, fetchPlayers, players, sortPlayers } = useAppContext();
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
    <>
      <Filters />
      <SBodyContainer>
        <PlayersTable players={players} loadMoreRef={ref} sort={sortPlayers} />
      </SBodyContainer>
    </>
  );
};

export default Players;
