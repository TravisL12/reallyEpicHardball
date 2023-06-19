import { SFlex, SHeader, SLink } from "../styles/styles";

const AppHeader = () => {
  return (
    <SFlex gap="20px" align="center">
      <SHeader>Really Epic Hardball</SHeader>
      <SFlex gap="5px">
        <SLink to="/">Players</SLink>
        <SLink to="/teams">Teams</SLink>
      </SFlex>
    </SFlex>
  );
};

export default AppHeader;
