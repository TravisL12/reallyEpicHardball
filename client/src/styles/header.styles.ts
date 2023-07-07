import styled from "styled-components";
import { SFlex } from "./styles";
import { devices } from "./responsiveStyles";

export const SAppHeader = styled(SFlex)`
  flex-direction: column;
  @media ${devices.laptop} {
    flex-direction: row;
    margin: 0 20px;
  }
`;

export const SLinksContainer = styled(SFlex)`
  flex-direction: column;
  @media ${devices.laptop} {
    flex-direction: row;
  }
`;
