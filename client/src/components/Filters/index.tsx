import { useAppContext } from "../../AppContext";
import { SFilterContainer } from "../../styles/FilterList.styles";
import { SFlex } from "../../styles/styles";
import FilterCheckbox from "./FilterCheckbox";
import FilterDropdown from "./FilterDropdown";

const Filters = ({
  isPitcher,
  count,
}: {
  isPitcher?: boolean;
  count?: number;
}) => {
  const { filters, searchPlayers, setFilter, setAllFilters } = useAppContext();

  return (
    <SFilterContainer justify="space-between" align="center">
      <SFlex gap="20px" align="center" style={{ margin: "10px 0" }}>
        <SFlex direction="column" gap="5px">
          <form
            id="search-player-form"
            onSubmit={() => {
              searchPlayers(filters.nameQuery);
            }}
          >
            <label htmlFor="nameQuery">Player Search</label>
            <input
              type="text"
              id="nameQuery"
              placeholder="Search by player name"
              value={filters.nameQuery || ""}
              onChange={(e) => {
                searchPlayers();
              }}
            />
            <button>Search</button>
          </form>
          <FilterCheckbox
            title="League"
            titleWidth="72px"
            type="league"
            isImgType={true}
            setFilter={setFilter}
            filterItem={filters.checkbox.league}
          />
        </SFlex>
        <FilterCheckbox
          title="Gender"
          titleWidth="50px"
          type="gender"
          setFilter={setFilter}
          filterItem={filters.checkbox.gender}
        />
        <SFlex direction="column" gap="5px">
          {!isPitcher && (
            <FilterCheckbox
              title="Bats"
              titleWidth="50px"
              type="bats"
              setFilter={setFilter}
              filterItem={filters.checkbox.bats}
            />
          )}
          <FilterCheckbox
            title="Throws"
            titleWidth="50px"
            type="throws"
            setFilter={setFilter}
            filterItem={filters.checkbox.throws}
          />
        </SFlex>
        <SFlex direction="column" gap="5px">
          {isPitcher ? (
            <>
              <FilterCheckbox
                title="Role"
                titleWidth="55px"
                type="pitching"
                setFilter={setFilter}
                setAllFilters={setAllFilters}
                filterItem={filters.checkbox.pitching}
              />
              <FilterCheckbox
                title="Pitches"
                titleWidth="55px"
                type="pitches"
                setFilter={setFilter}
                setAllFilters={setAllFilters}
                filterItem={filters.checkbox.pitches}
              />
            </>
          ) : (
            <>
              <FilterDropdown
                title="Position"
                type="position"
                options={filters.checkbox.position}
                setFilter={setFilter}
                setAllFilters={setAllFilters}
              />
              <FilterDropdown
                title="2nd Position"
                type="secondPosition"
                options={filters.checkbox.secondPosition}
                setFilter={setFilter}
                setAllFilters={setAllFilters}
              />
            </>
          )}
        </SFlex>
        <SFlex direction="column" gap="5px">
          <SFlex gap="5px">
            <FilterDropdown
              title="Teams"
              type="teams"
              options={filters.checkbox.teams}
              setFilter={setFilter}
              setAllFilters={setAllFilters}
            />
            <FilterDropdown
              title="Trait"
              type="traits"
              options={filters.checkbox.traits}
              setFilter={setFilter}
              setAllFilters={setAllFilters}
            />
            <FilterDropdown
              title="Trait 2"
              type="traits2"
              options={filters.checkbox.traits2}
              setFilter={setFilter}
              setAllFilters={setAllFilters}
            />
          </SFlex>
          <FilterCheckbox
            title="Chemistry"
            titleWidth="72px"
            type="playerChemistry"
            isImgType={true}
            setFilter={setFilter}
            setAllFilters={setAllFilters}
            filterItem={filters.checkbox.playerChemistry}
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
