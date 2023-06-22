import { SFlex, SImage } from "../styles/styles";

const Image = ({
  src,
  alt,
  title,
  style,
}: {
  src: string;
  alt?: string;
  title?: string;
  style?: any;
}) => {
  return (
    <SFlex align="center" style={style}>
      <SImage
        src={src}
        alt={alt || String(Math.random() * 1000)}
        title={title}
      />
    </SFlex>
  );
};

export default Image;
