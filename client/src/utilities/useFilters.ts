import { useState } from "react";
import { TFilter } from "../types";
import {
  ALL_GENDER,
  ALL_BATS,
  ALL_THROWS,
  ALL_LEAGUE,
  ALL_PITCHING,
  ALL_POSITIONS,
  ALL_PITCHES,
  ALL_TRAITS,
  ALL_CHEMISTRY,
  ALL_TEAMS,
  SECOND_POSITIONS,
} from "../constants";

const changeItem = (cPrev: TFilter[], value: TFilter) => {
  const findName = cPrev.find((i) => i.name === value.name);
  if (findName) {
    findName.checked = value.checked;
  }
  return cPrev;
};

export const useFilters = () => {
  const [gender, setGender] = useState<TFilter[]>(
    ALL_GENDER.map((name) => ({ name, checked: true }))
  );
  const [bats, setBats] = useState<TFilter[]>(
    ALL_BATS.map((name) => ({ name, checked: true }))
  );
  const [throws, setThrows] = useState<TFilter[]>(
    ALL_THROWS.map((name) => ({ name, checked: true }))
  );
  const [league, setLeague] = useState<TFilter[]>(
    ALL_LEAGUE.map((name) => ({ name, checked: true }))
  );
  const [position, setPosition] = useState<TFilter[]>(
    ALL_POSITIONS.map((name) => ({ name, checked: true }))
  );
  const [pitching, setPitching] = useState<TFilter[]>(
    ALL_PITCHING.map((name) => ({ name, checked: true }))
  );
  const [secondPosition, setSecondPosition] = useState<TFilter[]>(
    SECOND_POSITIONS.map((name) => ({ name, checked: true }))
  );
  const [pitches, setPitches] = useState<TFilter[]>(
    ALL_PITCHES.map((name) => ({ name, checked: false }))
  );
  const [traits, setTraits] = useState<TFilter[]>(
    ALL_TRAITS.map((name) => ({ name, checked: true }))
  );
  const [traits2, setTraits2] = useState<TFilter[]>(
    ALL_TRAITS.map((name) => ({ name, checked: true }))
  );
  const [playerChemistry, setPlayerChemistry] = useState<TFilter[]>(
    ALL_CHEMISTRY.map((name) => ({ name, checked: true }))
  );
  const [teams, setTeams] = useState<TFilter[]>(
    ALL_TEAMS.map((name) => ({ name, checked: true }))
  );

  const setAllFilters = (type: string, isOn: boolean) => {
    if (type === "position") {
      const values = position.map((item) => ({ ...item, checked: isOn }));
      setPosition(values);
    }
    if (type === "pitching") {
      const values = pitching.map((item) => ({ ...item, checked: isOn }));
      setPitching(values);
    }
    if (type === "secondPosition") {
      const values = secondPosition.map((item) => ({ ...item, checked: isOn }));
      setSecondPosition(values);
    }
    if (type === "pitches") {
      const values = pitches.map((item) => ({ ...item, checked: isOn }));
      setPitches(values);
    }
    if (type === "playerChemistry") {
      const values = playerChemistry.map((item) => ({
        ...item,
        checked: isOn,
      }));
      setPlayerChemistry(values);
    }
    if (type === "traits") {
      const values = traits.map((item) => ({ ...item, checked: isOn }));
      setTraits(values);
    }
    if (type === "traits2") {
      const values = traits2.map((item) => ({ ...item, checked: isOn }));
      setTraits2(values);
    }
    if (type === "teams") {
      const values = teams.map((item) => ({ ...item, checked: isOn }));
      setTeams(values);
    }
  };

  const setFilter = (type: string, value: TFilter) => {
    if (type === "gender") {
      setGender(changeItem([...gender], value));
    }
    if (type === "bats") {
      setBats(changeItem([...bats], value));
    }
    if (type === "throws") {
      setThrows(changeItem([...throws], value));
    }
    if (type === "league") {
      setLeague(changeItem([...league], value));
    }
    if (type === "position") {
      setPosition(changeItem([...position], value));
    }
    if (type === "pitching") {
      setPitching(changeItem([...pitching], value));
    }
    if (type === "secondPosition") {
      setSecondPosition(changeItem([...secondPosition], value));
    }
    if (type === "pitches") {
      setPitches(changeItem([...pitches], value));
    }
    if (type === "traits") {
      setTraits(changeItem([...traits], value));
    }
    if (type === "traits2") {
      setTraits2(changeItem([...traits2], value));
    }
    if (type === "playerChemistry") {
      setPlayerChemistry(changeItem([...playerChemistry], value));
    }
    if (type === "teams") {
      setTeams(changeItem([...teams], value));
    }
  };

  return {
    filters: {
      gender,
      bats,
      throws,
      league,
      position,
      pitching,
      secondPosition,
      pitches,
      traits,
      traits2,
      playerChemistry,
      teams,
    },
    setFilter,
    setAllFilters,
  };
};
