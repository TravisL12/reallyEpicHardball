import { useAppContext } from "../AppContext";
import { SAppHeader, SLinksContainer } from "../styles/header.styles";
import { SFlex, SHeader } from "../styles/styles";
import HeaderLink from "./HeaderLink";
import Image from "./Image";

const AppHeader = () => {
  const { loading } = useAppContext();

  return (
    <SAppHeader align="center" justify="space-between">
      <SLinksContainer gap="5px">
        <HeaderLink to="/" text="Players" />
        <HeaderLink to="/pitchers" text="Pitchers" />
        <HeaderLink to="/teams" text="Teams" />
      </SLinksContainer>
      {loading.players && (
        <div style={{ justifySelf: "flex-end" }}>loading players</div>
      )}
      <SFlex gap="5px" align="center">
        <SHeader>Really Epic</SHeader>
        <Image
          src={`${process.env.PUBLIC_URL}/baseball-120.png`}
          style={{ height: "30px" }}
        />
      </SFlex>
    </SAppHeader>
  );
};

export default AppHeader;
