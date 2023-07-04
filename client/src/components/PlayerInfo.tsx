import { useParams } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { useCallback, useEffect, useState } from "react";
import { IPlayer } from "../types";
import Image from "./Image";
import { SKILLS, imageColumns, tableHeaders } from "../constants";
import { SBox, SFlex, SLink } from "../styles/styles";
import {
  SAbilities,
  SAttrContainer,
  SInfo,
  SPlayerInfoContainer,
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
      <SBox mb="8px" style={{ textAlign: "right" }}>
        <SLink to={isPitchers ? "/pitchers" : "/"}>Close</SLink>
      </SBox>
      <SBox>
        {player.team ? (
          <Image
            alt={player.fullName}
            src={`${imageColumns.playerImage}${player.localID}.png`}
          />
        ) : (
          <div>Free Agents don't have pictures</div>
        )}
      </SBox>
      <SAttrContainer>
        <SInfo>
          <p>AGE</p>
          <p className="attrValue">{player.age}</p>
          <p>BAT</p>
          <p className="attrValue">{player.bats}</p>
          <p>THR</p>
          <p className="attrValue">{player.throws}</p>
        </SInfo>
        <SFlex justify="space-around">
          <SAbilities direction="column" gap="8px" align="center">
            {playerAttr.map((attr) => {
              // @ts-expect-error
              if (!player[attr]) {
                return null;
              }
              return (
                <SFlex gap="8px" align="center">
                  <SBox>{tableHeaders[attr].toUpperCase()}</SBox>
                  <SBox width="80px" style={{ textAlign: "center" }}>
                    {/* @ts-expect-error */}
                    <SkillCell value={+player[attr]} />
                  </SBox>
                </SFlex>
              );
            })}
          </SAbilities>
          {hasPitcherRole && (
            <SAbilities direction="column" gap="8px" align="center">
              {pitcherAttr.map((attr) => (
                <SFlex gap="8px" align="center">
                  <SBox>{tableHeaders[attr].toUpperCase()}</SBox>
                  <SBox width="80px" style={{ textAlign: "center" }}>
                    {/* @ts-expect-error */}
                    <SkillCell value={+player[attr]} />
                  </SBox>
                </SFlex>
              ))}
            </SAbilities>
          )}
        </SFlex>
        <SBox>
          <SFlex>
            <span>CHEMISTRY</span>
            <SFlex>
              <Image
                title={player.playerChemistry}
                src={`${
                  imageColumns.playerChemistry
                }${player.playerChemistry.toLowerCase()}.png`}
                style={{ height: "30px" }}
              />
              <p>{player.playerChemistry}</p>
            </SFlex>
          </SFlex>
          {[player.trait1, player.trait2].map((trait) => {
            if (!trait) {
              return null;
            }
            const { type, chemistry } = trait;
            return (
              <SFlex align="center" gap="4px" style={{ width: "150px" }}>
                <Image
                  title={chemistry}
                  src={`${imageColumns.trait}${chemistry.toLowerCase()}.png`}
                  style={{ height: "30px", width: "20px" }}
                />
                <div>{type}</div>
              </SFlex>
            );
          })}
        </SBox>
      </SAttrContainer>
    </SPlayerInfoContainer>
  );
};

export default PlayerInfo;
