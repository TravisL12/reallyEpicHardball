import { useParams } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { useEffect, useState } from "react";
import { IPlayer } from "../types";
import { imageColumns } from "../styles/tableStyles";
import Image from "./Image";

const PlayerInfo = () => {
  const { localId } = useParams();
  const { fetchSinglePlayer } = useAppContext();

  const [player, setPlayer] = useState<IPlayer | undefined>();

  const getPlayer = async () => {
    const data = await fetchSinglePlayer(localId);
    setPlayer(data);
  };

  useEffect(() => {
    getPlayer();
  }, []);

  if (!player) {
    return <div>Loading</div>;
  }

  return (
    <div>
      I am {player.fullName} of the {player.team}
      <Image
        alt={player.fullName}
        src={`${imageColumns.playerImage}${player.localID}.png`}
      />
    </div>
  );
};

export default PlayerInfo;
