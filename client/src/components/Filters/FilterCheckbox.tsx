import { SFilterPositionTitle, SFlex } from "../../styles/styles";
import { TFilter } from "../../types";
import Checkbox from "./Checkbox";
import FilterAllNone from "./FilterAllNone";

type TProps = {
  title: string;
  titleWidth?: string;
  type: string;
  isImgType?: boolean;
  filterItem: TFilter[];
  setFilter?: (type: string, value: TFilter) => void;
  setAllFilters?: (type: string, isOn: boolean) => void;
};

const FilterCheckbox = ({
  title,
  titleWidth,
  type,
  isImgType,
  filterItem,
  setFilter,
  setAllFilters,
}: TProps) => {
  return (
    <SFlex align="center" gap="4px">
      <SFlex direction="column">
        <SFilterPositionTitle width={titleWidth}>{title}</SFilterPositionTitle>
        {setAllFilters && (
          <FilterAllNone setAllFilters={setAllFilters} type={type} />
        )}
      </SFlex>
      {filterItem.map(({ name, checked }) => (
        <Checkbox
          key={`${type}-${name}`}
          checked={checked}
          onChange={setFilter!}
          type={type}
          isImg={isImgType && name !== "None"}
          value={name}
        />
      ))}
    </SFlex>
  );
};

export default FilterCheckbox;
