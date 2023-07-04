import { getSkillColor } from "../styles/colors";
import { SFlex } from "../styles/styles";
import {
  SSkillCell,
  SSkillCellInner,
  SSkillCellText,
} from "../styles/playerTable.styles";

const SkillCell = ({ value }: { value: number }) => {
  const color = getSkillColor(value);
  return (
    <SFlex style={{ position: "relative" }}>
      <SSkillCell>
        <SSkillCellInner width={value} color={color} />
      </SSkillCell>
      <SSkillCellText>{value}</SSkillCellText>
    </SFlex>
  );
};

export default SkillCell;
