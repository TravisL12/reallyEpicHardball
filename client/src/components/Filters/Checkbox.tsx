import { SCheckbox } from "../../styles/styles";

const Checkbox = ({ id, value }: { id: string; value: string }) => {
  return (
    <SCheckbox>
      <input type="checkbox" id={id} />
      <label htmlFor={id}>{value}</label>
    </SCheckbox>
  );
};

export default Checkbox;
