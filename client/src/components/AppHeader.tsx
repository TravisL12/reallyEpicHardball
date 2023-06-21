import { useAppContext } from "../AppContext";
import { SFlex, SHeader, SLink } from "../styles/styles";

const AppHeader = () => {
  const { loading } = useAppContext();

  return (
    <SFlex gap="20px" align="center">
      <SHeader>Really Epic Hardball</SHeader>
      <SFlex gap="5px">
        <SLink to="/">Players</SLink>
        <SLink to="/teams">Teams</SLink>
      </SFlex>
      {loading.players && <div>loading players</div>}
    </SFlex>
  );
};

export default AppHeader;
