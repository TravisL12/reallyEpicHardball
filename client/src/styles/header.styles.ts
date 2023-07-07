import styled from "styled-components";
import { SFlex } from "./styles";
import { devices } from "./responsiveStyles";
import { NavLink } from "react-router-dom";
import { rowHoverColor } from "./colors";

export const SAppHeader = styled(SFlex)`
  width: 100%;
  padding: 20px 0;
  justify-content: center;
  @media ${devices.laptop} {
    justify-content: space-between;
    flex-direction: row;
    padding: 0 20px;
  }
`;

export const SLinksContainer = styled(SFlex)<{ $isOpen?: boolean }>`
  position: fixed;
  top: 60px;
  right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
  z-index: 3;
  flex-direction: column;
  background: gray;
  padding: 24px 40px;
  transition: 0.2s linear right;

  @media ${devices.laptop} {
    position: unset;
    background: unset;
    padding: unset;
    flex-direction: row;
  }
`;

export const SMenuBtn = styled(SFlex)<{ $isOpen?: boolean }>`
  cursor: pointer;
  position: absolute;
  right: ${({ $isOpen }) => ($isOpen ? "10px" : "10px")};
  box-sizing: unset;
  background: ${rowHoverColor};
  padding: 10px;
  width: 30px;
  height: 20px;

  .line {
    width: 30px;
    height: 2px;
    background: red;
    top: 20px;
    position: ${({ $isOpen }) => ($isOpen ? "absolute" : "")};
    &:nth-child(1) {
      transform: ${({ $isOpen }) => ($isOpen ? "rotate(45deg)" : "")};
    }
    &:nth-child(2) {
      transform: ${({ $isOpen }) => ($isOpen ? "rotate(-45deg)" : "")};
    }
    &:nth-child(3) {
      display: ${({ $isOpen }) => ($isOpen ? "none" : "")};
    }
  }

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
