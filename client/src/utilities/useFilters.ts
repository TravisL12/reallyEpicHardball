import { useState } from "react";
import { TFilter } from "../types";

const ALL_GENDER = ["M", "F"];
const ALL_BATS = ["R", "L", "S"];
const ALL_THROWS = ["R", "L"];
const ALL_LEAGUE = ["superMega", "legends", "creators"];
const ALL_PITCHING = ["SP", "SP/RP", "RP", "CP"];
const ALL_POSITIONS = ["C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "P"];
const SECOND_POSITIONS = [
  ...ALL_POSITIONS.slice(0, -1), // remove "P"
  "IF",
  "OF",
  "1B/OF",
  "IF/OF",
  "None",
];

const changeItem = (cPrev: TFilter[], value: TFilter) => {
  const findName = cPrev.find((i) => i.name === value.name);
  if (findName) {
    findName.checked = value.checked;
  }
  return cPrev;
};

export const useFilters = () => {
  const [hasFreeAgents, setHasFreeAgents] = useState<boolean>(true);
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
    if (type === "freeAgents") {
      setHasFreeAgents(value.checked);
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
    },
    hasFreeAgents,
    setFilter,
  };
};
