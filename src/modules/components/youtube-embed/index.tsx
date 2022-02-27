import { ResponsiveVideo } from "./style";

interface IProps {
  embedId: string;
  width?: string;
  height?: string;
  allowFullScreen?: boolean | undefined;
}

const YoutubeEmbed = ({ embedId, width, height, allowFullScreen }: IProps) => (
  <ResponsiveVideo
    style={{
      paddingBottom: !width && !height ? "56.25%" : "unset",
      width: width ? width.replaceAll("px", "") + "px" : "unset",
      height: height ? height.replaceAll("px", "") + "px" : "unset",
    }}
  >
    <iframe
      width={width ? width.replaceAll("px", "") + "px" : "853"}
      height={height ? height.replaceAll("px", "") + "px" : "480"}
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen={allowFullScreen || allowFullScreen !== undefined}
      title="Embedded youtube"
    />
  </ResponsiveVideo>
);

export default YoutubeEmbed;
