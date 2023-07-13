import { useEffect } from "react";
import { useOutlet } from "react-router-dom";

import PlayersTable from "../PlayersTable";
import { useInView } from "react-intersection-observer";
import { useAppContext } from "../../AppContext";
import Filters from "../Filters";
import { SBodyContainer } from "../../styles/styles";
import { PITCHER_ATTRIBUTES, PLAYER_ATTRIBUTES } from "../../constants";
import { SPlayerTableContainer } from "../../styles/playerTable.styles";

const Players = () => {
  const outlet = useOutlet();
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
    fetchPlayers(true);
  }, [isPitchers]);

  const { ref } = useInView({
    threshold: 0.25,
    onChange: (inView) => {
      if (inView && !!players && !loading.players && hasMorePlayers) {
        fetchPlayers();
      }
    },
  });

  const columns = isPitchers ? PITCHER_ATTRIBUTES : PLAYER_ATTRIBUTES;

  return (
    <>
      <Filters count={playerCount} isPitcher={isPitchers} />
      <SBodyContainer>
        {outlet}
        <SPlayerTableContainer direction="column" $hasOutlet={!!outlet}>
          <PlayersTable
            players={players}
            loadMoreRef={ref}
            hasMore={hasMorePlayers}
            sort={sortPlayers}
            columns={columns}
          />
        </SPlayerTableContainer>
      </SBodyContainer>
    </>
  );
};

export default Players;
