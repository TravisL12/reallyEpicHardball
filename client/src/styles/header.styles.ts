import styled from "styled-components";
import { SFlex } from "./styles";
import { devices } from "./responsiveStyles";

export const SAppHeader = styled(SFlex)`
  flex-direction: column;
  @media ${devices.laptop} {
    width: 100%;
    flex-direction: row;
    padding: 0 20px;
  }
`;

export const SLinksContainer = styled(SFlex)<{ $isOpen?: boolean }>`
  position: fixed;
  right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
  z-index: 2;
  flex-direction: column;

  @media ${devices.laptop} {
    flex-direction: row;
  }
`;

export const SMenuBtn = styled.button`
  @media ${devices.tablet} {
    display: hidden;
  }
`;
