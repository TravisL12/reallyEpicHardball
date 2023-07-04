import { SFlex } from "../styles/styles";
import Image from "./Image";

const BaseballLoader = () => {
  return (
    <SFlex
      justify="center"
      align="center"
      style={{ height: "100%", width: "100%" }}
    >
      <Image
        alt="loading baseball"
        src={`${process.env.PUBLIC_URL}/baseball-ball.gif`}
        style={{
          height: "100px",
        }}
      />
    </SFlex>
  );
};

export default BaseballLoader;
