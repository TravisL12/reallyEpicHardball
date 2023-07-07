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
import { devices } from "./responsiveStyles";

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
  &:after {
    content: "";
    position: absolute;
    left: ${({ width }) => `${width - 4}%`};
    width: 3px;
    height: calc(100% - 2px);
    background: rgba(255, 255, 255, 0.3);
  }
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
    th,
    td {
      font-size: 14px;
    }
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

    @media ${devices.laptop} {
      th,
      td {
        font-size: unset;
      }
    }
  }
`;

export const SFullNameCell = styled(SFlex)`
  @media ${devices.laptop} {
    .img-component {
      display: none;
    }
    width: 130px;
  }
`;

export const STeamCell = styled(SFlex)`
  @media ${devices.laptop} {
    width: 160px;
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
  &:nth-child(1) {
    display: none;
  }
  &:nth-child(3) {
    position: sticky;
    left: 0;
    z-index: 2;
  }
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

  @media ${devices.laptop} {
    position: unset;
    &:nth-child(1) {
      display: table-cell;
    }
  }
`;

export const SCol = styled.td<{
  $isCentered?: boolean;
  $isNumber?: boolean;
  $isSelected?: boolean;
}>`
  &:nth-child(1) {
    display: none;
  }
  // make fullName cell stick
  &:nth-child(3) {
    position: sticky;
    left: 0;
    z-index: 1;
  }

  background: ${({ $isSelected }) =>
    $isSelected ? `${checkedLabel} !important` : "inherit"};
  white-space: nowrap;
  padding: ${({ $isNumber }) => ($isNumber ? "0 2px" : "8px 10px")};
  width: ${({ $isNumber }) => ($isNumber ? "80px" : undefined)};
  text-align: ${({ $isCentered }) => ($isCentered ? "center" : "left")};
  border-right: 2px solid ${mainBgColor};

  @media ${devices.laptop} {
    &:nth-child(1) {
      display: table-cell;
    }
    position: unset;
    z-index: unset;
  }
`;

export const SSortCell = styled(SFlex)`
  position: relative;
`;

export const SSortArrow = styled.div`
  position: absolute;
  right: -5px;
  font-size: 11px;
`;
