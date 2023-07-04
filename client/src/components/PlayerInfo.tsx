import { useParams } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { useEffect, useState } from "react";
import { IPlayer } from "../types";
import Image from "./Image";
import { SKILLS, imageColumns } from "../constants";
import { SFlex, SLink } from "../styles/styles";

const PlayerInfo = () => {
  const { localId } = useParams();
  const { fetchSinglePlayer, isPitchers } = useAppContext();

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
      <SLink to={isPitchers ? "/pitchers" : "/"}>Close</SLink>
      <h3>
        I am {player.fullName} of the {player.team}
      </h3>
      <SFlex justify="space-around">
        {player.team ? (
          <>
            <Image
              alt={player.fullName}
              src={`${imageColumns.playerImage}${player.localID}.png`}
            />
            <Image
              style={{ height: "400px" }}
              alt={player.team}
              src={`${imageColumns[SKILLS.teamSlug]}${player.teamSlug}.png`}
            />
          </>
        ) : (
          <div>Free Agents don't have pictures</div>
        )}
      </SFlex>
    </div>
  );
};

export default PlayerInfo;
