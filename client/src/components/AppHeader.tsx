import { SFlex, SHeader, SLink } from "./styles";

const AppHeader = () => {
  return (
    <SFlex gap="20px">
      <SHeader>Welcome to Really Epic Hardball</SHeader>
      <SFlex gap="5px">
        <SLink to="/">Players</SLink>
        <SLink to="/teams">Teams</SLink>
      </SFlex>
    </SFlex>
  );
};

export default AppHeader;
