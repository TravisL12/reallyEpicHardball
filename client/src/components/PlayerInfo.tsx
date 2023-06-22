import { useParams } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { useEffect, useState } from "react";
import { IPlayer } from "../types";
import { imageColumns } from "../styles/tableStyles";
import Image from "./Image";
import { SKILLS } from "../constants";
import { SFlex } from "../styles/styles";

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
    <div style={{ width: "100%" }}>
      I am {player.fullName} of the {player.team}
      <SFlex justify="space-around">
        <Image
          alt={player.fullName}
          src={`${imageColumns.playerImage}${player.localID}.png`}
        />
        <Image
          style={{ height: "400px" }}
          alt={player.team}
          src={`${imageColumns[SKILLS.teamSlug]}${player.teamSlug}.png`}
        />
      </SFlex>
    </div>
  );
};

export default PlayerInfo;
