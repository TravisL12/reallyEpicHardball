import { useAppContext } from "../../AppContext";
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
  const { filters, setFilter, setAllFilters } = useAppContext();

  return (
    <SFlex justify="space-between" align="center" style={{ width: "100%" }}>
      <SFlex gap="20px" align="center" style={{ margin: "10px 0" }}>
        <FilterCheckbox
          title="League"
          titleWidth="72px"
          type="league"
          isImgType={true}
          setFilter={setFilter}
          filterItem={filters.league}
        />
        <FilterDropdown
          title="Teams"
          type="teams"
          options={filters.teams}
          setFilter={setFilter}
          setAllFilters={setAllFilters}
        />
        <FilterCheckbox
          title="Gender"
          titleWidth="50px"
          type="gender"
          setFilter={setFilter}
          filterItem={filters.gender}
        />
        <SFlex direction="column" gap="5px">
          {!isPitcher && (
            <FilterCheckbox
              title="Bats"
              titleWidth="50px"
              type="bats"
              setFilter={setFilter}
              filterItem={filters.bats}
            />
          )}
          <FilterCheckbox
            title="Throws"
            titleWidth="50px"
            type="throws"
            setFilter={setFilter}
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
                setFilter={setFilter}
                setAllFilters={setAllFilters}
                filterItem={filters.pitching}
              />
              <FilterCheckbox
                title="Pitches"
                titleWidth="55px"
                type="pitches"
                setFilter={setFilter}
                setAllFilters={setAllFilters}
                filterItem={filters.pitches}
              />
            </>
          ) : (
            <>
              <FilterDropdown
                title="Position"
                type="position"
                options={filters.position}
                setFilter={setFilter}
                setAllFilters={setAllFilters}
              />
              <FilterDropdown
                title="2nd Position"
                type="secondPosition"
                options={filters.secondPosition}
                setFilter={setFilter}
                setAllFilters={setAllFilters}
              />
            </>
          )}
        </SFlex>
        <SFlex direction="column" gap="5px">
          <SFlex gap="5px">
            <FilterDropdown
              title="Trait"
              type="traits"
              options={filters.traits}
              setFilter={setFilter}
              setAllFilters={setAllFilters}
            />
            <FilterDropdown
              title="Trait 2"
              type="traits2"
              options={filters.traits2}
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
            filterItem={filters.playerChemistry}
          />
        </SFlex>
      </SFlex>
      {!!count && (
        <span>
          {count} {isPitcher ? "Pitchers" : "Players"}
        </span>
      )}
    </SFlex>
  );
};

export default Filters;
