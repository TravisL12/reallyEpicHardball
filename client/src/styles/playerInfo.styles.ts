import styled from "styled-components";
import { SBox, SFlex } from "./styles";
import { devices } from "./responsiveStyles";
import { mainBgColor } from "./colors";

export const SPlayerInfoContainer = styled.div`
  width: 100%;

  @media ${devices.laptop} {
    width: 300px;
  }
`;

export const SCloseButton = styled(SBox)`
  position: sticky;
  background: ${mainBgColor};
  top: 0;
  padding: 10px;
`;

export const SImageContainer = styled(SBox)`
  @media ${devices.laptop} {
    width: 300px;
  }
`;

export const SAttrContainer = styled.div`
  background: black;
  margin-top: -4px;
`;

export const SInfo = styled(SFlex)`
  background: #090d17;
  margin-bottom: 20px;
  p {
    flex: 1;
    padding: 8px;
    text-align: center;
  }
  .attrValue {
    background: #101623;
  }
`;

export const SArsenal = styled(SFlex)`
  padding: 0 20px;
  margin-bottom: 20px;
`;

export const SAbilities = styled(SFlex)`
  padding: 0 20px 20px;
`;

export const STraits = styled(SAbilities)`
  padding: 0 20px 20px;
`;
