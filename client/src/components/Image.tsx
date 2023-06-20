import { SImage } from "../styles/styles";

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
    <div style={style}>
      <SImage
        src={src}
        alt={alt || String(Math.random() * 1000)}
        title={title}
      />
    </div>
  );
};

export default Image;
