import styled from "styled-components";

import { SBox, SFlex } from "./styles";
import { devices } from "./responsiveStyles";

export const SFilterContainer = styled(SFlex)`
  display: none;
  @media ${devices.laptop} {
    display: flex;
    width: 100%;
  }
`;

export const SSearchForm = styled.form`
  position: relative;
  min-width: 300px;
  height: 30px;
  font-size: 16px;

  input[type="text"] {
    width: 100%;
    height: 100%;
    font-size: inherit;
    padding: 4px 8px;
    background: black;
    color: white;
    &::placeholder {
      font-weight: 300;
    }
  }

  button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    height: 100%;
  }
`;

export const FilterPortalDropdown = styled(SFlex)`
  position: absolute;
  z-index: 10;
  flex-direction: column;
  width: 200px;
  background: white;
  max-height: 400px;
`;

export const FilterDropdownContainer = styled.div`
  position: relative;
  display: flex;

  .dropdown {
    position: relative;
    width: 200px;
  }
`;

export const FilterItems = styled.div`
  display: flex;
  min-width: 100px;
  max-width: 300px;
  padding-bottom: 8px;

  .filter-items--title {
    width: 90px;
  }

  .filter-items--title.dropdown {
    display: flex;
    gap: 10px;
    font-size: 16px;
    width: 150px;
  }

  .filter-items--list {
    display: flex;
  }

  .filter-checkbox-container {
    label {
      text-align: center;
      min-width: 35px;
    }
  }

  .title {
    font-size: 16px;
    min-width: 90px;
  }
`;

export const FilterListContainer = styled(SBox)`
  grid-column: 1 / 3;
  grid-row: 2;
  gap: 10px;
  padding: 0 10px;
  background: lightblue;
  overflow: hidden;
  font-size: 14px;

  .all-items {
    cursor: pointer;
    padding: 4px 10px;
    margin-bottom: 2px;
  }

  label {
    display: block;
    padding: 4px 10px;
    background: lightblue;
    cursor: pointer;
    transition: 0.05s linear background;

    &:hover {
      background: lightblue;
    }
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"]:checked + label {
    background: lightblue;
    box-shadow: inset 0 0 0px 1px white;
  }
`;

const teamLogoTile = "50px";
export const StyledTeamFilter = styled.div`
  padding-right: 15px;

  .team-filter-grid {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(10, ${teamLogoTile});
    grid-template-rows: ${teamLogoTile} ${teamLogoTile};

    .team-checkbox-container {
      label {
        padding: 2px;
        width: 100%;
        height: 100%;

        img {
          filter: grayscale(0.9);
        }
      }

      input[type="checkbox"]:checked + label {
        img {
          filter: grayscale(0);
        }
      }
    }
  }
`;

export const ToggleItemLink = styled.div`
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

export const SelectedPlayers = styled.div`
  height: 90%;
  margin-left: 10px;

  p {
    margin-right: 10px;
  }

  ul {
    display: inline-flex;
    flex-flow: column wrap;
    height: 100%;

    li {
      padding-right: 10px;

      span:first-child {
        display: inline-block;
        width: 18px;
      }
    }
  }
`;
