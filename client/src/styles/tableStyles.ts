import styled from "styled-components";
import { mainBgColor, tableEvenRow, tableOddRow } from "./colors";
import { BASE_URL, SKILLS } from "../constants";

export const centeredColumns: string[] = [
  SKILLS.primaryPositionShort,
  SKILLS.secondaryPositionShort,
  SKILLS.power,
  SKILLS.contact,
  SKILLS.speed,
  SKILLS.fielding,
  SKILLS.arm,
  SKILLS.bats,
  SKILLS.throws,
  SKILLS.age,
  SKILLS.pitcherRoleShort,
  SKILLS.velocity,
  SKILLS.junk,
  SKILLS.accuracy,
  SKILLS.playerChemistry,
];

export const imageColumns = {
  [SKILLS.playerChemistry]: `${BASE_URL}/images/chemistry/player_chem_`,
  [SKILLS.trait1]: `${BASE_URL}/images/chemistry/trait_chem_`,
  [SKILLS.trait2]: `${BASE_URL}/images/chemistry/trait_chem_`,
};

export const numberColumns: string[] = [
  SKILLS.power,
  SKILLS.contact,
  SKILLS.speed,
  SKILLS.fielding,
  SKILLS.arm,
  SKILLS.velocity,
  SKILLS.junk,
  SKILLS.accuracy,
];

export const SSkillCell = styled.div`
  flex: 1;
  background: black;
  border: 1px solid black;
  height: 28px;
`;

export const SSkillCellInner = styled.div<{ width: number; color: string }>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  background: ${({ color }) => color};
  color: white;
`;

export const SSkillCellText = styled.div`
  position: absolute;
  align-self: center;
  width: 100%;
  color: white;
`;

export const STable = styled.table`
  border-collapse: collapse;
  min-width: 1000px;

  tr {
    th {
      text-transform: uppercase;
      position: sticky;
      top: 0;
      background: ${mainBgColor};
    }

    &:nth-child(even) td {
      background: ${tableEvenRow};
    }

    &:nth-child(odd) td {
      background: ${tableOddRow};
    }

    &:hover td {
      background: #b4b8d3;
      color: black;
    }
  }
`;

export const SCol = styled.td<{ $isCentered?: boolean; $isNumber?: boolean }>`
  white-space: nowrap;
  padding: ${({ $isNumber }) => ($isNumber ? "0 2px" : "8px 12px")};
  width: ${({ $isNumber }) => ($isNumber ? "80px" : undefined)};
  text-align: ${({ $isCentered }) => ($isCentered ? "center" : "left")};
`;
