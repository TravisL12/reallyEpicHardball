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
  const [pitches, setPitches] = useState<TFilter[]>(
    ALL_PITCHES.map((name) => ({ name, checked: false }))
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
    if (type === "pitches") {
      setPitches(changeItem([...pitches], value));
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
      pitches,
    },
    hasFreeAgents,
    setFilter,
  };
};
