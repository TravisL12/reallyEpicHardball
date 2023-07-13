import { useState } from "react";
import { useAppContext } from "../../AppContext";
import { SFilterContainer } from "../../styles/FilterList.styles";
import { SFlex } from "../../styles/styles";
import FilterCheckbox from "./FilterCheckbox";
import FilterDropdown from "./FilterDropdown";
import { TFilter } from "../../types";

const Filters = ({
  isPitcher,
  count,
}: {
  isPitcher?: boolean;
  count?: number;
}) => {
  const [nameQuery, setNameQuery] = useState<string>("");
  const { filters, setFilter, setAllFilters } = useAppContext();

  const submitFilters = (type: string, value: TFilter) => {
    setFilter(type, value, nameQuery);
  };

  const submitAllFilters = (type: string, isOn: boolean) => {
    setAllFilters(type, isOn, nameQuery);
  };

  return (
    <SFilterContainer justify="space-between" align="center">
      <SFlex gap="20px" align="center" style={{ margin: "10px 0" }}>
        <SFlex direction="column" gap="5px">
          <form
            id="search-player-form"
            onSubmit={(e) => {
              e.preventDefault();
              submitFilters("name", {} as TFilter);
            }}
          >
            <label htmlFor="nameQuery">Player Search</label>
            <input
              type="text"
              id="nameQuery"
              placeholder="Search by player name"
              value={nameQuery || ""}
              onChange={(e) => {
                setNameQuery(e.target.value);
              }}
            />
            <button>Search</button>
          </form>
          <FilterCheckbox
            title="League"
            titleWidth="72px"
            type="league"
            isImgType={true}
            setFilter={submitFilters}
            filterItem={filters.league}
          />
        </SFlex>
        <FilterCheckbox
          title="Gender"
          titleWidth="50px"
          type="gender"
          setFilter={submitFilters}
          filterItem={filters.gender}
        />
        <SFlex direction="column" gap="5px">
          {!isPitcher && (
            <FilterCheckbox
              title="Bats"
              titleWidth="50px"
              type="bats"
              setFilter={submitFilters}
              filterItem={filters.bats}
            />
          )}
          <FilterCheckbox
            title="Throws"
            titleWidth="50px"
            type="throws"
            setFilter={submitFilters}
            filterItem={filters.throws}
          />
        </SFlex>
        <SFlex direction="column" gap="5px">
          {isPitcher ? (
            <>
              <FilterCheckbox
                title="Role"
                titleWidth="55px"
                type="pitching"
                setFilter={submitFilters}
                setAllFilters={submitAllFilters}
                filterItem={filters.pitching}
              />
              <FilterCheckbox
                title="Pitches"
                titleWidth="55px"
                type="pitches"
                setFilter={submitFilters}
                setAllFilters={submitAllFilters}
                filterItem={filters.pitches}
              />
            </>
          ) : (
            <>
              <FilterDropdown
                title="Position"
                type="position"
                options={filters.position}
                setFilter={submitFilters}
                setAllFilters={submitAllFilters}
              />
              <FilterDropdown
                title="2nd Position"
                type="secondPosition"
                options={filters.secondPosition}
                setFilter={submitFilters}
                setAllFilters={submitAllFilters}
              />
            </>
          )}
        </SFlex>
        <SFlex direction="column" gap="5px">
          <SFlex gap="5px">
            <FilterDropdown
              title="Teams"
              type="teams"
              options={filters.teams}
              setFilter={submitFilters}
              setAllFilters={submitAllFilters}
            />
            <FilterDropdown
              title="Trait"
              type="traits"
              options={filters.traits}
              setFilter={submitFilters}
              setAllFilters={submitAllFilters}
            />
            <FilterDropdown
              title="Trait 2"
              type="traits2"
              options={filters.traits2}
              setFilter={submitFilters}
              setAllFilters={submitAllFilters}
            />
          </SFlex>
          <FilterCheckbox
            title="Chemistry"
            titleWidth="72px"
            type="playerChemistry"
            isImgType={true}
            setFilter={submitFilters}
            setAllFilters={submitAllFilters}
            filterItem={filters.playerChemistry}
          />
        </SFlex>
      </SFlex>
      {!!count && (
        <span>
          {count} {isPitcher ? "Pitchers" : "Players"}
        </span>
      )}
    </SFilterContainer>
  );
};

export default Filters;
