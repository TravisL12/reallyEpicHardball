import styled from "styled-components";
import {
  rowHoverColor,
  mainBgColor,
  tableEvenRow,
  tableOddRow,
  linkHoverColor,
  checkedLabel,
} from "./colors";
import { SFlex } from "./styles";

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
  width: 100%;

  tr {
    th {
      text-transform: uppercase;
      position: sticky;
      top: 0;
      background: black;
    }

    &:nth-child(even) td {
      background: ${tableEvenRow};
    }

    &:nth-child(odd) td {
      background: ${tableOddRow};
    }

    &:hover td {
      background: ${rowHoverColor};
    }
  }
`;

export const SPlayerTableContainer = styled(SFlex)`
  flex: 1;
  height: 100%;
  overflow: auto;
`;

export const SHead = styled.th<{
  $isCentered?: boolean;
  $isNumber?: boolean;
  $isSort?: boolean;
}>`
  z-index: 1;
  cursor: pointer;
  white-space: nowrap;
  padding: ${({ $isNumber }) => ($isNumber ? "0 2px" : "8px 10px")};
  width: ${({ $isNumber }) => ($isNumber ? "80px" : undefined)};
  text-align: ${({ $isCentered }) => ($isCentered ? "center" : "left")};
  font-weight: ${({ $isSort }) => ($isSort ? 700 : "normal")};
  border-right: 2px solid ${mainBgColor};
  &:hover {
    color: ${linkHoverColor};
  }
`;

export const SCol = styled.td<{
  $isCentered?: boolean;
  $isNumber?: boolean;
  $isSelected?: boolean;
}>`
  background: ${({ $isSelected }) =>
    $isSelected ? `${checkedLabel} !important` : "inherit"};
  white-space: nowrap;
  padding: ${({ $isNumber }) => ($isNumber ? "0 2px" : "8px 10px")};
  width: ${({ $isNumber }) => ($isNumber ? "80px" : undefined)};
  text-align: ${({ $isCentered }) => ($isCentered ? "center" : "left")};
  border-right: 2px solid ${mainBgColor};
`;

export const SSortCell = styled(SFlex)`
  position: relative;
`;

export const SSortArrow = styled.div`
  position: absolute;
  right: -5px;
  font-size: 11px;
`;
