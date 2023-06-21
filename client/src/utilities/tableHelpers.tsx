import { SKILLS } from "../constants";
import SkillCell from "../components/SkillCell";
import { SFlex } from "../styles/styles";
import Image from "../components/Image";
import { imageColumns } from "../styles/tableStyles";

export const getTableCell = (attribute: string, value: any) => {
  if ([undefined, null].includes(value)) {
    return value;
  }

  switch (attribute) {
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
        <SFlex align="center" gap="4px">
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
        <Image
          title={value as string}
          src={`${imageColumns[attribute]}${(
            value as string
          ).toLowerCase()}.png`}
          style={{ height: "30px" }}
        />
      );
    case SKILLS.league:
      return (
        <Image
          title={value as string}
          src={`${imageColumns[attribute]}${(
            value as string
          ).toLowerCase()}.png`}
          style={{ height: "30px" }}
        />
      );
    default:
      return <div>{value}</div>;
  }
};
