import { useEffect } from "react";

import PlayersTable from "../PlayersTable";
import { useInView } from "react-intersection-observer";
import { useAppContext } from "../../AppContext";
import Filters from "../Filters";
import { SBodyContainer } from "../../styles/styles";
import { PITCHER_ATTRIBUTES } from "../../constants";
import { Outlet } from "react-router-dom";

const Pitchers = () => {
  const {
    loading,
    fetchPitchers,
    players,
    sortPlayers,
    hasMorePlayers,
    playerCount,
    isPitchers,
  } = useAppContext();
  useEffect(() => {
    if (isPitchers) {
      fetchPitchers(true);
    }
  }, [isPitchers]);

  const { ref } = useInView({
    threshold: 0.25,
    onChange: (inView) => {
      if (inView && !!players && !loading.players && hasMorePlayers) {
        fetchPitchers();
      }
    },
  });

  return (
    <>
      <Filters isPitcher={true} count={playerCount} />
      <SBodyContainer direction="row">
        <Outlet />
        <PlayersTable
          players={players}
          loadMoreRef={ref}
          hasMore={hasMorePlayers}
          sort={sortPlayers}
          columns={PITCHER_ATTRIBUTES}
        />
      </SBodyContainer>
    </>
  );
};

export default Pitchers;
