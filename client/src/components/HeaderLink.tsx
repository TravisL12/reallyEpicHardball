import { SHeaderLink } from "../styles/styles";

const HeaderLink = ({ text, to }: { text: string; to: string }) => {
  return (
    <SHeaderLink to={to}>
      <div className="text">{text}</div>
    </SHeaderLink>
  );
};

export default HeaderLink;
