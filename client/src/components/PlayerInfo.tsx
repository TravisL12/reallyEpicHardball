import { useParams } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { useCallback, useEffect, useState } from "react";
import { IPlayer } from "../types";
import Image from "./Image";
import { SKILLS, imageColumns } from "../constants";
import { SFlex, SLink } from "../styles/styles";

const PlayerInfo = () => {
  const { localId } = useParams();
  const { fetchSinglePlayer, isPitchers } = useAppContext();

  const [player, setPlayer] = useState<IPlayer | undefined>();

  const getPlayer = useCallback(async () => {
    const data = await fetchSinglePlayer(localId);
    setPlayer(data);
  }, [localId]);

  useEffect(() => {
    getPlayer();
  }, [getPlayer]);

  if (!player) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <SLink to={isPitchers ? "/pitchers" : "/"}>Close</SLink>
      <h3>
        I am {player.fullName} of the {player.team}
      </h3>
      <div>
        {player.team ? (
          <Image
            alt={player.fullName}
            src={`${imageColumns.playerImage}${player.localID}.png`}
          />
        ) : (
          <div>Free Agents don't have pictures</div>
        )}
      </div>
    </div>
  );
};

export default PlayerInfo;
