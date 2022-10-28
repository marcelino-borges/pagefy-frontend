import { v4 as uuid } from "uuid";
import { ResponsiveVideo } from "./style";

interface IYoutubeEmbedProps {
  embedId: string;
  width?: string;
  height?: string;
  allowFullScreen?: boolean | undefined;
}

const YoutubeEmbed = ({
  embedId,
  width,
  height,
  allowFullScreen,
}: IYoutubeEmbedProps) => (
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
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen={allowFullScreen || allowFullScreen !== undefined}
      title={uuid()}
      srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href="https://www.youtube.com/embed/${embedId}"><img src="https://img.youtube.com/vi/${embedId}/hqdefault.jpg" alt='Embed Video'><span>▶</span></a>`}
    />
  </ResponsiveVideo>
);

export default YoutubeEmbed;
