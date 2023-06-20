import { Link } from "react-router-dom";
import styled from "styled-components";

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
`;

export const SHeader = styled.h1`
  color: red;
`;

export const SAppContainer = styled(SFlex)`
  height: 100vh;
  padding: ${Spacing[3]};
  color: white;
`;

export const SBodyContainer = styled(SFlex)`
  width: 100%;
  flex: 1;
  overflow: auto;
`;
