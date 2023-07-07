import { PITCH_TYPE, SKILLS, imageColumns } from "../constants";
import SkillCell from "../components/SkillCell";
import { SFlex, SLink, SPitchCell } from "../styles/styles";
import Image from "../components/Image";
import { IPlayer } from "../types";
import { SFullNameCell, STeamCell } from "../styles/playerTable.styles";

export const getTableCell = (
  attribute: string,
  player: IPlayer,
  isPitchers: boolean
) => {
  // @ts-ignore
  const value = player[attribute];
  if ([undefined, null].includes(value)) {
    return value;
  }

  switch (attribute) {
    case SKILLS.fullName:
      const link = isPitchers ? "/pitchers/player" : "/player";
      return (
        <SFullNameCell align="center">
          <Image
            title={value}
            src={`${imageColumns[SKILLS.teamSlug]}${player.teamSlug}.png`}
            style={{ width: "30px" }}
          />
          <SLink to={`${link}/${player.localID}`}>{value}</SLink>
        </SFullNameCell>
      );
    case SKILLS.arsenal:
      return (
        <SFlex gap="5px" justify="center">
          {value.map((pitch: string) => (
            <SPitchCell key={pitch}>{PITCH_TYPE[pitch].short}</SPitchCell>
          ))}
        </SFlex>
      );
    case SKILLS.team:
      return (
        <STeamCell align="center" gap="4px">
          <Image
            title={value}
            src={`${imageColumns[SKILLS.teamSlug]}${player.teamSlug}.png`}
            style={{ width: "30px" }}
          />
          <div>{value}</div>
        </STeamCell>
      );
    case SKILLS.power:
    case SKILLS.contact:
    case SKILLS.speed:
    case SKILLS.fielding:
    case SKILLS.arm:
    case SKILLS.velocity:
    case SKILLS.junk:
    case SKILLS.accuracy:
      return <SkillCell value={+value} />;
    case SKILLS.trait2:
    case SKILLS.trait1:
      return value?.chemistry && value?.type ? (
        <SFlex align="center" gap="4px" style={{ width: "150px" }}>
          <Image
            title={value.chemistry as string}
            src={`${
              imageColumns[attribute]
            }${value.chemistry.toLowerCase()}.png`}
            style={{ height: "30px", width: "20px" }}
          />
          <div>{value.type}</div>
        </SFlex>
      ) : (
        value.type
      );
    case SKILLS.playerChemistry:
      return (
        <SFlex align="center" gap="4px">
          <Image
            title={value as string}
            src={`${imageColumns[attribute]}${(
              value as string
            ).toLowerCase()}.png`}
            style={{ height: "30px", width: "30px" }}
          />
          <div>{value}</div>
        </SFlex>
      );
    case SKILLS.league:
      return (
        <Image
          title={value as string}
          src={`${imageColumns[attribute]}${value as string}.png`}
          style={{ height: "30px" }}
        />
      );
    default:
      return <div>{value}</div>;
  }
};
