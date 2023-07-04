import { useAppContext } from "../../AppContext";
import {
  SFilterAllNone,
  SFilterPositionTitle,
  SFlex,
} from "../../styles/styles";
import Checkbox from "./Checkbox";

const Filters = ({
  isPitcher,
  count,
}: {
  isPitcher?: boolean;
  count?: number;
}) => {
  const { filters, setFilter, hasFreeAgents, setAllFilters } = useAppContext();

  return (
    <SFlex justify="space-between" align="center" style={{ width: "100%" }}>
      <SFlex gap="20px" align="center" style={{ margin: "10px 0" }}>
        <SFlex align="center" gap="4px">
          <h4>League</h4>
          {filters?.league.map(({ name, checked }) => (
            <Checkbox
              key={`league-${name}`}
              checked={checked}
              onChange={setFilter!}
              type="league"
              isImg={true}
              value={name}
            />
          ))}
        </SFlex>
        <SFlex direction="column" gap="5px">
          <SFlex align="center" gap="4px">
            <h4>Free Agents</h4>
            <Checkbox
              checked={hasFreeAgents}
              onChange={setFilter!}
              type="freeAgents"
              value="On"
            />
          </SFlex>
          <SFlex align="center" gap="4px">
            <h4>Gender</h4>
            {filters?.gender.map(({ name, checked }) => (
              <Checkbox
                key={`gender-${name}`}
                checked={checked}
                onChange={setFilter!}
                type="gender"
                value={name}
              />
            ))}
          </SFlex>
        </SFlex>
        <SFlex direction="column" gap="5px">
          {!isPitcher && (
            <SFlex align="center" gap="4px">
              <SFilterPositionTitle width="50px">Bats</SFilterPositionTitle>
              {filters?.bats.map(({ name, checked }) => (
                <Checkbox
                  key={`bats-${name}`}
                  checked={checked}
                  onChange={setFilter!}
                  type="bats"
                  value={name}
                />
              ))}
            </SFlex>
          )}
          <SFlex align="center" gap="4px">
            <SFilterPositionTitle width="50px">Throws</SFilterPositionTitle>
            {filters?.throws.map(({ name, checked }) => (
              <Checkbox
                key={`throws-${name}`}
                checked={checked}
                onChange={setFilter!}
                type="throws"
                value={name}
              />
            ))}
          </SFlex>
        </SFlex>
        <SFlex direction="column" gap="5px">
          {isPitcher ? (
            <>
              <SFlex align="center" gap="4px">
                <SFlex direction="column">
                  <SFilterPositionTitle width="55px">Role</SFilterPositionTitle>
                  <SFilterAllNone gap="5px" justify="flex-end">
                    <span
                      onClick={() => {
                        setAllFilters("pitching", true);
                      }}
                    >
                      All
                    </span>
                    <span
                      onClick={() => {
                        setAllFilters("pitching", false);
                      }}
                    >
                      None
                    </span>
                  </SFilterAllNone>
                </SFlex>
                {filters?.pitching.map(({ name, checked }) => (
                  <Checkbox
                    key={`pitching-${name}`}
                    checked={checked}
                    onChange={setFilter!}
                    type="pitching"
                    value={name}
                  />
                ))}
              </SFlex>
              <SFlex align="center" gap="4px">
                <SFlex direction="column">
                  <SFilterPositionTitle width="55px">
                    Pitches
                  </SFilterPositionTitle>
                  <SFilterAllNone gap="5px" justify="flex-end">
                    <span
                      onClick={() => {
                        setAllFilters("pitches", true);
                      }}
                    >
                      All
                    </span>
                    <span
                      onClick={() => {
                        setAllFilters("pitches", false);
                      }}
                    >
                      None
                    </span>
                  </SFilterAllNone>
                </SFlex>
                {filters?.pitches.map(({ name, checked }) => (
                  <Checkbox
                    key={`pitches-${name}`}
                    checked={checked}
                    onChange={setFilter!}
                    type="pitches"
                    value={name}
                  />
                ))}
              </SFlex>
            </>
          ) : (
            <>
              <SFlex align="center" gap="4px">
                <SFlex direction="column">
                  <SFilterPositionTitle>Position</SFilterPositionTitle>
                  <SFilterAllNone gap="5px" justify="flex-end">
                    <span
                      onClick={() => {
                        setAllFilters("position", true);
                      }}
                    >
                      All
                    </span>
                    <span
                      onClick={() => {
                        setAllFilters("position", false);
                      }}
                    >
                      None
                    </span>
                  </SFilterAllNone>
                </SFlex>
                {filters?.position.map(({ name, checked }) => (
                  <Checkbox
                    key={`position-${name}`}
                    checked={checked}
                    onChange={setFilter!}
                    type="position"
                    value={name}
                  />
                ))}
              </SFlex>
              <SFlex align="center" gap="4px">
                <SFlex direction="column">
                  <SFilterPositionTitle>2nd Position</SFilterPositionTitle>
                  <SFilterAllNone gap="5px" justify="flex-end">
                    <span
                      onClick={() => {
                        setAllFilters("secondPosition", true);
                      }}
                    >
                      All
                    </span>
                    <span
                      onClick={() => {
                        setAllFilters("secondPosition", false);
                      }}
                    >
                      None
                    </span>
                  </SFilterAllNone>
                </SFlex>
                {filters?.secondPosition.map(({ name, checked }) => (
                  <Checkbox
                    key={`secondPosition-${name}`}
                    checked={checked}
                    onChange={setFilter!}
                    type="secondPosition"
                    value={name}
                  />
                ))}
              </SFlex>
            </>
          )}
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
