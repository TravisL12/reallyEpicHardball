import { useAppContext } from "../../../AppContext";
import { SFlex } from "../../../styles/styles";
import Checkbox from "./Checkbox";

const Filters = ({ count }: { count?: number }) => {
  const { filters, setFilter } = useAppContext();

  return (
    <SFlex gap="20px" align="center" style={{ margin: "10px 0" }}>
      {!!count && count}
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
      <SFlex align="center" gap="4px">
        <h4>Bats</h4>
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
      <SFlex align="center" gap="4px">
        <h4>Throws</h4>
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
      <SFlex direction="column">
        <SFlex align="center" gap="4px">
          <h4>Position</h4>
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
          <h4>2nd Position</h4>
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
        <SFlex align="center" gap="4px">
          <h4>Pitching</h4>
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
      </SFlex>
    </SFlex>
  );
};

export default Filters;
