import { useMemo, useState } from "react";
// import { positionsAbbrev } from "./utilities/constants";
// import FilterAllNoneControls from "./FilterAllNoneControls";
import {
  FilterDropdownContainer,
  FilterPortalDropdown,
  FilterDropdownCheckbox,
  FilterItems,
  ToggleItemLink,
  FilterPortalDropdownTitle,
} from "../../styles/FilterList.styles";
import Portal from "./FilterPortal";
import { usePortal } from "../../utilities/usePortal";

const FILTER_PERCENT_DISPLAY = 0.6;

const FilterDropdown = ({ title, type, options, setFilter }: any) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [coords, setPortalCoordinates] = usePortal({ top: 35 }) as any;

  const selectedFilterCount = useMemo(() => {
    const count = Object.keys(options).filter((key) => options[key]).length;
    const total = Object.keys(options).length;
    if (count === 0 || count / total > FILTER_PERCENT_DISPLAY) {
      return `${count} of ${total}`;
    } else {
      const allSelected = Object.keys(options).filter((key) => options[key]);
      return allSelected.join(", ");
    }
  }, [options, type]);
  return (
    <FilterDropdownContainer>
      <FilterItems style={{ flexDirection: "column" }}>
        <div>
          <ToggleItemLink
            style={{ fontSize: "16px", display: "inline-block" }}
            onClick={(e: any) => {
              setPortalCoordinates(e);
              setShowCheckboxes(!showCheckboxes);
            }}
          >
            {title}
          </ToggleItemLink>
        </div>
        <span style={{ fontSize: "12px" }}>{selectedFilterCount}</span>
      </FilterItems>

      {showCheckboxes && (
        <Portal>
          <FilterPortalDropdown style={{ ...coords }}>
            <FilterPortalDropdownTitle>
              {/* <FilterAllNoneControls
                setFilters={setFilters}
                type={type}
              /> */}
              <ToggleItemLink
                onClick={() => {
                  setShowCheckboxes(false);
                }}
              >
                Close
              </ToggleItemLink>
            </FilterPortalDropdownTitle>
            {Object.keys(options).map((attrKey) => {
              const { name, checked } = options[attrKey];
              return (
                <FilterDropdownCheckbox key={`${type}-${name}`}>
                  <input
                    type="checkbox"
                    id={`${type}-${name}`}
                    checked={checked}
                    // onChange={() =>
                    //   setFilter((prevFilters) => {
                    //     const values = { ...prevFilters };
                    //     values[value] = !values[value];
                    //     return { ...prevFilters, [type]: values };
                    //   })
                    // }
                  />
                  <label htmlFor={`${type}-${name}`}>{name}</label>
                </FilterDropdownCheckbox>
              );
            })}
          </FilterPortalDropdown>
        </Portal>
      )}
    </FilterDropdownContainer>
  );
};

export default FilterDropdown;
