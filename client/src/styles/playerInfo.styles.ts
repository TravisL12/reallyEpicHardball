import styled from "styled-components";
import { SFlex } from "./styles";

export const SPlayerInfoContainer = styled.div`
  width: 300px;
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
