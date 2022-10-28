import { v4 as uuid } from "uuid";
import { ResponsivePlayer } from "./style";

interface ISpotifyIFrameProps {
  url: string;
  width?: string;
  height?: string;
}

const SpotifyEmbed = ({ url, width, height }: ISpotifyIFrameProps) => {
  const getPlayerURLToEmbed = (url: string) => {
    if (url.includes("spotify.com/embed/")) {
      return url;
    }
    const [, embed] = url.split("spotify.com");

    return `https://open.spotify.com/embed${embed}`;
  };

  return (
    <ResponsivePlayer
      style={{
        paddingBottom: !width && !height ? "56.25%" : "unset",
        width: width ? width.replaceAll("px", "") + "px" : "unset",
        height: height ? height.replaceAll("px", "") + "px" : "unset",
      }}
    >
      <iframe
        title={uuid()}
        src={getPlayerURLToEmbed(url)}
        width={width ? width.replaceAll("px", "") + "px" : "853"}
        height={height ? height.replaceAll("px", "") + "px" : "480"}
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </ResponsivePlayer>
  );
};

export default SpotifyEmbed;
