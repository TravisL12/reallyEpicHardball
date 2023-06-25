import { useAppContext } from "../AppContext";
import { SFlex, SHeader, SLink } from "../styles/styles";
import Filters from "./Filters";

const AppHeader = () => {
  const { loading } = useAppContext();

  return (
    <SFlex justify="space-between" style={{ width: "100%" }}>
      <SFlex gap="20px" align="center">
        <SHeader>Really Epic Hardball</SHeader>
        <SFlex gap="5px">
          <SLink to="/">Players</SLink>
          <SLink to="/teams">Teams</SLink>
        </SFlex>
        <Filters />
      </SFlex>
      {loading.players && (
        <div style={{ justifySelf: "flex-end" }}>loading players</div>
      )}
    </SFlex>
  );
};

export default AppHeader;
