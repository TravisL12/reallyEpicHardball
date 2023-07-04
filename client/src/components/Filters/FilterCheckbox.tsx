import {
  SFilterAllNone,
  SFilterPositionTitle,
  SFlex,
} from "../../styles/styles";
import { TFilter } from "../../types";
import Checkbox from "./Checkbox";

type TProps = {
  title: string;
  titleWidth?: string;
  type: string;
  isImgType?: boolean;
  filterItem?: TFilter[];
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
          <SFilterAllNone gap="5px" justify="flex-end">
            <span
              onClick={() => {
                setAllFilters(type, true);
              }}
            >
              All
            </span>
            <span
              onClick={() => {
                setAllFilters(type, false);
              }}
            >
              None
            </span>
          </SFilterAllNone>
        )}
      </SFlex>
      {filterItem?.map(({ name, checked }) => (
        <Checkbox
          key={`${type}-${name}`}
          checked={checked}
          onChange={setFilter!}
          type={type}
          isImg={isImgType}
          value={name}
        />
      ))}
    </SFlex>
  );
};

export default FilterCheckbox;
