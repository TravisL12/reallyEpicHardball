import { useAppContext } from "../AppContext";
import { SFlex, SHeader } from "../styles/styles";
import Filters from "./Filters";
import HeaderLink from "./HeaderLink";

const AppHeader = () => {
  const { loading } = useAppContext();

  return (
    <SFlex justify="space-between" style={{ width: "100%" }}>
      <SFlex gap="20px" align="center">
        <SHeader>Really Epic Hardball</SHeader>
        <SFlex gap="5px">
          <HeaderLink to="/" text="Players" />
          <HeaderLink to="/teams" text="Teams" />
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
