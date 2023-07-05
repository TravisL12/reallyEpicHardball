import { SFilterAllNone } from "../../styles/styles";

const FilterAllNone = ({
  setAllFilters,
  type,
}: {
  setAllFilters: (type: string, isOn: boolean) => void;
  type: string;
}) => {
  return (
    <SFilterAllNone gap="5px">
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
  );
};

export default FilterAllNone;
