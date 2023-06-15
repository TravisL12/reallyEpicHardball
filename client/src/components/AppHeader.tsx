import { SLink } from "./styles";

const AppHeader = () => {
  return (
    <header>
      <SLink to="/">Players</SLink>
      <SLink to="/teams">Teams</SLink>
    </header>
  );
};

export default AppHeader;
