import { SFlex } from "../styles/styles";
import {
  SSkillCell,
  SSkillCellInner,
  SSkillCellText,
} from "../styles/tableStyles";

const SkillCell = ({ value }: { value: number }) => {
  return (
    <SFlex style={{ position: "relative" }}>
      <SSkillCell>
        <SSkillCellInner width={value} />
      </SSkillCell>
      <SSkillCellText>{value}</SSkillCellText>
    </SFlex>
  );
};

export default SkillCell;
