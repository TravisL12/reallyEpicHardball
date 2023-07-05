import { useMemo, useState } from "react";
import {
  FilterDropdownContainer,
  FilterPortalDropdown,
  FilterItems,
  ToggleItemLink,
} from "../../styles/FilterList.styles";
import Portal from "./FilterPortal";
import { usePortal } from "../../utilities/usePortal";
import FilterCheckbox from "./Checkbox";
import FilterAllNone from "./FilterAllNone";
import { SFlex } from "../../styles/styles";

const FILTER_PERCENT_DISPLAY = 0.6;

const FilterDropdown = ({
  title,
  type,
  options,
  setFilter,
  setAllFilters,
}: any) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [coords, setPortalCoordinates] = usePortal({ top: 35 }) as any;

  const selectedFilterCount = useMemo(() => {
    const selectedOptions = options.filter(({ checked }) => checked);
    const count = selectedOptions.length;
    const total = Object.keys(options).length;
    if (count === 0 || count / total > FILTER_PERCENT_DISPLAY) {
      return `${count} of ${total}`;
    } else {
      return selectedOptions.map(({ name }) => name).join(", ");
    }
  }, [options, type]);
  return (
    <FilterDropdownContainer>
      <FilterItems style={{ flexDirection: "column" }}>
        <ToggleItemLink
          style={{ fontSize: "16px", display: "inline-block" }}
          onClick={(e: any) => {
            setPortalCoordinates(e);
            setShowCheckboxes(!showCheckboxes);
          }}
        >
          {title}
        </ToggleItemLink>
        <span style={{ fontSize: "12px" }}>{selectedFilterCount}</span>
      </FilterItems>

      {showCheckboxes && (
        <Portal>
          <FilterPortalDropdown style={{ ...coords }}>
            <SFlex justify="space-between" style={{ padding: "4px 8px" }}>
              <FilterAllNone setAllFilters={setAllFilters} type={type} />
              <ToggleItemLink
                onClick={() => {
                  setShowCheckboxes(false);
                }}
              >
                Close
              </ToggleItemLink>
            </SFlex>
            {Object.keys(options).map((attrKey) => {
              const { name, checked } = options[attrKey];
              return (
                <FilterCheckbox
                  key={`${type}-${name}`}
                  checked={checked}
                  onChange={setFilter!}
                  type={type}
                  value={name}
                />
              );
            })}
          </FilterPortalDropdown>
        </Portal>
      )}
    </FilterDropdownContainer>
  );
};

export default FilterDropdown;
