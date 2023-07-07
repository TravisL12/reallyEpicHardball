import styled from "styled-components";
import { SFlex } from "./styles";
import { devices } from "./responsiveStyles";
import { NavLink } from "react-router-dom";

export const SAppHeader = styled(SFlex)`
  flex-direction: column;
  width: 100%;
  @media ${devices.laptop} {
    flex-direction: row;
    padding: 0 20px;
  }
`;

export const SLinksContainer = styled(SFlex)<{ $isOpen?: boolean }>`
  position: fixed;
  top: 40px;
  right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
  z-index: 2;
  flex-direction: column;
  background: gray;
  padding: 24px 40px;

  @media ${devices.laptop} {
    position: unset;
    background: unset;
    padding: unset;
    flex-direction: row;
  }
`;

export const SMenuBtn = styled.button`
  align-self: flex-end;
  margin: 10px 10px 0 0;
  @media ${devices.laptop} {
    display: none;
  }
`;

const skew = 40;
export const SHeaderLink = styled(NavLink)`
  font-family: "barlow-bold-italic";
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2px;
  background: #30344c;
  width: 200px;
  height: 50px;
  transform: skew(${skew * -1}deg, 0);
  color: white;

  &.active,
  &:hover {
    color: white;
    background: rgb(28, 35, 106);
    background: linear-gradient(
      ${skew}deg,
      rgba(28, 35, 106, 1) 0%,
      rgba(126, 70, 151, 1) 33%,
      rgba(168, 39, 42, 1) 64%,
      rgba(106, 20, 14, 1) 100%
    );
  }

  & .text {
    font-size: 28px;
    transform: skew(${skew}deg, 0);
  }
`;
