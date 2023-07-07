import { Link } from "react-router-dom";
import styled from "styled-components";
import { checkedLabel, linkHoverColor } from "./colors";
import { devices } from "./responsiveStyles";

const Spacing = {
  0: "2px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
};

export const SImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const SBox = styled.div<{
  width?: string;
  height?: string;
  margin?: string;
  mt?: string;
  mb?: string;
  mr?: string;
  ml?: string;
}>`
  width: ${({ width }) => width ?? undefined};
  height: ${({ height }) => height ?? undefined};
  margin: ${({ margin }) => margin ?? undefined};
  margin-top: ${({ mt }) => mt ?? undefined};
  margin-bottom: ${({ mb }) => mb ?? undefined};
  margin-right: ${({ mr }) => mr ?? undefined};
  margin-left: ${({ ml }) => ml ?? undefined};
`;

export const SFlex = styled.div<{
  align?: string;
  direction?: string;
  justify?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.direction ?? "row"};
  align-items: ${(props) => props.align ?? "flex-start"};
  justify-content: ${(props) => props.justify ?? "flex-start"};
  gap: ${(props) => props.gap ?? "0"};
`;

export const SLink = styled(Link)`
  color: white;

  &:hover {
    color: ${linkHoverColor};
  }
`;

export const SHeader = styled.h1`
  color: red;
`;

export const SAppContainer = styled(SFlex)`
  height: calc(100vh - 100px);
  color: white;
  overflow: auto;
  width: 100%;

  @media ${devices.laptop} {
    height: 100vh;
    padding: ${Spacing[3]};
  }
`;

export const SBodyContainer = styled(SFlex)`
  width: 100%;
  flex: 1;
  overflow: auto;

  @media ${devices.laptop} {
    gap: 12px;
  }
`;

export const SCheckbox = styled.div`
  label {
    color: white;
    display: block;
    padding: 4px 6px;
    background: gray;
    min-width: 32px;
    cursor: pointer;
    box-shadow: inset 0 0 0px 1px white;
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"]:checked + label {
    background: ${checkedLabel};
  }
`;

export const SFilterPositionTitle = styled.h4<{ width?: string }>`
  width: ${({ width }) => width ?? "90px"};
  text-align: right;
`;

export const SPitchCell = styled.div`
  color: white;
  background: black;
  padding: 1px 2px;
  border: 1px solid white;
`;

export const SFilterAllNone = styled(SFlex)`
  font-size: 14px;
  width: 100%;

  span {
    text-decoration: underline;
    cursor: pointer;
  }
`;
