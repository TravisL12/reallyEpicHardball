import { useAppContext } from "../../AppContext";
import { SFlex } from "../../styles/styles";
import Checkbox from "./Checkbox";

const Filters = () => {
  const { filters, setFilter } = useAppContext();

  return (
    <SFlex gap="20px" align="center" style={{ margin: "10px 0" }}>
      <SFlex align="center" gap="4px">
        <h4>League</h4>
        {filters?.league.map(({ name, checked }) => (
          <Checkbox
            key={name}
            checked={checked}
            onChange={setFilter!}
            type="league"
            isImg={true}
            value={name}
          />
        ))}
      </SFlex>
      <SFlex align="center" gap="4px">
        <h4>Gender</h4>
        {filters?.gender.map(({ name, checked }) => (
          <Checkbox
            key={name}
            checked={checked}
            onChange={setFilter!}
            type="gender"
            value={name}
          />
        ))}
      </SFlex>
      <SFlex align="center" gap="4px">
        <h4>Bats</h4>
        {filters?.bats.map(({ name, checked }) => (
          <Checkbox
            key={name}
            checked={checked}
            onChange={setFilter!}
            type="bats"
            value={name}
          />
        ))}
      </SFlex>
      <SFlex align="center" gap="4px">
        <h4>Throws</h4>
        {filters?.throws.map(({ name, checked }) => (
          <Checkbox
            key={name}
            checked={checked}
            onChange={setFilter!}
            type="throws"
            value={name}
          />
        ))}
      </SFlex>
    </SFlex>
  );
};

export default Filters;
