import { useState } from "react";
import { useAppContext } from "../AppContext";
import { SAppHeader, SLinksContainer, SMenuBtn } from "../styles/header.styles";
import { SFlex, SHeader } from "../styles/styles";
import HeaderLink from "./HeaderLink";
import Image from "./Image";

const AppHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { loading } = useAppContext();

  const close = () => {
    setIsOpen(false);
  };

  return (
    <SAppHeader align="center">
      <SLinksContainer gap="5px" $isOpen={isOpen} onClick={() => close()}>
        <HeaderLink to="/" text="Players" />
        <HeaderLink to="/pitchers" text="Pitchers" />
        <HeaderLink to="/teams" text="Teams" />
      </SLinksContainer>
      <SFlex gap="5px" align="center">
        <SHeader>Really Epic</SHeader>
        <Image
          src={
            loading.players
              ? `${process.env.PUBLIC_URL}/baseball-ball.gif`
              : `${process.env.PUBLIC_URL}/baseball-120.png`
          }
          style={{ height: "30px" }}
        />
      </SFlex>
      <SMenuBtn
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
        direction="column"
        justify="space-between"
        gap="5px"
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </SMenuBtn>
    </SAppHeader>
  );
};

export default AppHeader;
