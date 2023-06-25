import { SFlex } from "../../styles/styles";
import Checkbox from "./Checkbox";

const gender = ["M", "F"];
const bats = ["R", "L", "S"];
const throws = ["R", "L"];

const Filters = () => {
  return (
    <SFlex gap="20px">
      <SFlex align="center" gap="4px">
        <h4>gender</h4>
        {gender.map((value) => (
          <Checkbox key={value} id={`gender-${value}`} value={value} />
        ))}
      </SFlex>
      <SFlex align="center" gap="4px">
        <h4>bats</h4>
        {bats.map((value) => (
          <Checkbox key={value} id={`bats-${value}`} value={value} />
        ))}
      </SFlex>
      <SFlex align="center" gap="4px">
        <h4>throws</h4>
        {throws.map((value) => (
          <Checkbox key={value} id={`throws-${value}`} value={value} />
        ))}
      </SFlex>
    </SFlex>
  );
};

export default Filters;
