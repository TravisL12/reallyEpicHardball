import { useEffect } from "react";

import PlayersTable from "../PlayersTable";
import { useInView } from "react-intersection-observer";
import { useAppContext } from "../../AppContext";
import Filters from "../Filters";
import { SBodyContainer } from "../../styles/styles";
import { PLAYER_ATTRIBUTES } from "../../constants";

const Players = () => {
  const {
    loading,
    fetchPlayers,
    players,
    sortPlayers,
    hasMorePlayers,
    playerCount,
    isPitchers,
  } = useAppContext();
  useEffect(() => {
    if (!isPitchers) {
      fetchPlayers();
    }
  }, [isPitchers]);

  const { ref } = useInView({
    threshold: 0.25,
    onChange: (inView) => {
      if (inView && players.length > 0 && !loading.players && hasMorePlayers) {
        fetchPlayers();
      }
    },
  });

  return (
    <>
      <Filters count={playerCount} />
      <SBodyContainer>
        <PlayersTable
          players={players}
          loadMoreRef={ref}
          hasMore={hasMorePlayers}
          sort={sortPlayers}
          columns={PLAYER_ATTRIBUTES}
        />
      </SBodyContainer>
    </>
  );
};

export default Players;
