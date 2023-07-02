import { SCheckbox } from "../../../styles/styles";
import { imageColumns } from "../../../styles/tableStyles";
import { TFilter } from "../../../types";
import Image from "../../Image";

const Checkbox = ({
  type,
  checked,
  onChange,
  isImg,
  value,
}: {
  type: string;
  checked: boolean;
  onChange: (type: string, value: TFilter) => void;
  isImg?: boolean;
  value: string;
}) => {
  const id = `${type}-${value}`;
  return (
    <SCheckbox>
      <input
        checked={checked}
        onChange={(event) => {
          onChange(type, {
            name: value,
            checked: event.target.checked,
          });
        }}
        type="checkbox"
        id={id}
      />
      <label htmlFor={id}>
        {isImg ? (
          <Image
            title={value}
            src={`${imageColumns.league}${value}.png`}
            style={{ height: "30px" }}
          />
        ) : (
          value
        )}
      </label>
    </SCheckbox>
  );
};

export default Checkbox;
