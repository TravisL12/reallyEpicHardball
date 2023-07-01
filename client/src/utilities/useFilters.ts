import { useState } from "react";
import { TFilter } from "../types";

const ALL_GENDER = ["M", "F"];
const ALL_BATS = ["R", "L", "S"];
const ALL_THROWS = ["R", "L"];
const ALL_LEAGUE = ["superMega", "legends", "creators"];

const changeItem = (cPrev: TFilter[], value: TFilter) => {
  const findName = cPrev.find((i: any) => i.name === value.name);
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
  };

  return {
    filters: {
      gender,
      bats,
      throws,
      league,
    },
    setFilter,
  };
};
