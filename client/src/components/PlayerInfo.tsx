import { useParams } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { useCallback, useEffect, useState } from "react";
import { IPlayer } from "../types";
import Image from "./Image";
import { PITCH_TYPE, SKILLS, imageColumns, tableHeaders } from "../constants";
import { SBox, SFlex, SLink, SPitchCell } from "../styles/styles";
import {
  SAbilities,
  SArsenal,
  SAttrContainer,
  SImageContainer,
  SInfo,
  SPlayerInfoContainer,
  STraits,
  SCloseButton,
} from "../styles/playerInfo.styles";
import SkillCell from "./SkillCell";
import BaseballLoader from "./BaseballLoader";

const playerAttr = [
  SKILLS.power,
  SKILLS.contact,
  SKILLS.speed,
  SKILLS.fielding,
  SKILLS.arm,
];

const pitcherAttr = [SKILLS.velocity, SKILLS.junk, SKILLS.accuracy];

const PlayerInfo = () => {
  const { localId } = useParams();
  const { fetchSinglePlayer, isPitchers } = useAppContext();

  const [player, setPlayer] = useState<IPlayer | undefined>();
  const hasPitcherRole = !!player?.pitcherRole;
  const getPlayer = useCallback(async () => {
    const data = await fetchSinglePlayer(localId);
    setPlayer(data);
  }, [localId]);

  useEffect(() => {
    getPlayer();
  }, [getPlayer]);

  if (!player) {
    return <BaseballLoader />;
  }

  return (
    <SPlayerInfoContainer>
      <SCloseButton mb="8px" style={{ textAlign: "right" }}>
        <SLink to={isPitchers ? "/pitchers" : "/"}>Close</SLink>
      </SCloseButton>
      <SImageContainer>
        {player.team ? (
          <Image
            alt={player.fullName}
            src={`${imageColumns.playerImage}${player.localID}.png`}
            style={{ height: "100%" }}
          />
        ) : (
          <div>Free Agents don't have pictures</div>
        )}
      </SImageContainer>
      <SAttrContainer>
        <SInfo>
          <p>AGE</p>
          <p className="attrValue">{player.age}</p>
          <p>BAT</p>
          <p className="attrValue">{player.bats}</p>
          <p>THR</p>
          <p className="attrValue">{player.throws}</p>
        </SInfo>
        {hasPitcherRole && (
          <SArsenal gap="8px" align="center" justify="space-between">
            <SBox>ARSENAL</SBox>
            <SFlex gap="5px" justify="center">
              {player.arsenal.map((pitch: string) => (
                <SPitchCell key={pitch}>{PITCH_TYPE[pitch].short}</SPitchCell>
              ))}
            </SFlex>
          </SArsenal>
        )}
        <SAbilities justify={hasPitcherRole ? "space-between" : "center"}>
          <SFlex direction="column" gap="8px" align="center">
            {playerAttr.map((attr) => {
              // @ts-expect-error
              if (!player[attr]) {
                return null;
              }
              return (
                <SFlex gap="8px" align="center" key={attr}>
                  <SBox>{tableHeaders[attr].toUpperCase()}</SBox>
                  <SBox width="80px" style={{ textAlign: "center" }}>
                    {/* @ts-expect-error */}
                    <SkillCell value={+player[attr]} />
                  </SBox>
                </SFlex>
              );
            })}
          </SFlex>
          {hasPitcherRole && (
            <SFlex direction="column" gap="8px" align="center">
              {pitcherAttr.map((attr) => (
                <SFlex gap="8px" align="center" key={`pitcher-${attr}`}>
                  <SBox>{tableHeaders[attr].toUpperCase()}</SBox>
                  <SBox width="80px" style={{ textAlign: "center" }}>
                    {/* @ts-expect-error */}
                    <SkillCell value={+player[attr]} />
                  </SBox>
                </SFlex>
              ))}
            </SFlex>
          )}
        </SAbilities>
        <STraits direction="column">
          {player.playerChemistry && (
            <SFlex
              align="center"
              gap="8px"
              style={{ paddingLeft: "40px", width: "100%" }}
            >
              <span>CHEMISTRY</span>
              <SFlex align="center" gap="4px">
                <Image
                  title={player.playerChemistry}
                  src={`${imageColumns.playerChemistry}${player.playerChemistry}.png`}
                  style={{ height: "30px" }}
                />
                <p>{player.playerChemistry}</p>
              </SFlex>
            </SFlex>
          )}
          <SFlex
            direction="column"
            style={{ paddingLeft: "40px", width: "100%" }}
          >
            {[player.trait1, player.trait2].map((trait) => {
              if (!trait?.type) {
                return null;
              }
              const { type, chemistry } = trait;
              return (
                <SFlex align="center" gap="4px" key={trait.type}>
                  <Image
                    title={chemistry}
                    src={`${imageColumns.trait}${chemistry.toLowerCase()}.png`}
                    style={{ height: "30px", width: "20px" }}
                  />
                  <div>{type}</div>
                </SFlex>
              );
            })}
          </SFlex>
        </STraits>
      </SAttrContainer>
    </SPlayerInfoContainer>
  );
};

export default PlayerInfo;
