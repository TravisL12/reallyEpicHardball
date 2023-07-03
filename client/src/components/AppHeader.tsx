import { useAppContext } from "../AppContext";
import { SFlex, SHeader } from "../styles/styles";
import HeaderLink from "./HeaderLink";
import Image from "./Image";

const AppHeader = () => {
  const { loading } = useAppContext();

  return (
    <SFlex align="center" justify="space-between" style={{ width: "100%" }}>
      <SFlex gap="20px" align="center">
        <SFlex gap="5px" style={{ marginLeft: "20px" }}>
          <HeaderLink to="/" text="Players" />
          <HeaderLink to="/pitchers" text="Pitchers" />
          <HeaderLink to="/teams" text="Teams" />
        </SFlex>
      </SFlex>
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
    </SFlex>
  );
};

export default AppHeader;
