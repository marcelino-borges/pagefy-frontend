import { Grid } from "@mui/material";
import { IUserComponent } from "../../../../../store/user-pages/types";
import { getYoutubeIdFromUrl } from "../../../../../utils";
import YoutubeEmbed from "../../../youtube-embed";
import BaseComponentType from "../base";
import { incrementComponentClicks } from "../../../../../store/page-renderer/actions";

interface IVideoComponentProps {
  component: IUserComponent;
  pageId?: string | undefined;
}

const VideoComponent = ({ component, pageId }: IVideoComponentProps) => {
  if (!component.mediaUrl) return null;

  const videoId = getYoutubeIdFromUrl(component.mediaUrl);

  if (!videoId) return null;

  return (
    <BaseComponentType
      url={component.url}
      layout={component.layout}
      style={{
        ...component.style,
      }}
      onClick={() => {
        if (pageId && component._id)
          incrementComponentClicks(pageId, component._id);
      }}
    >
      <Grid style={{ width: "100%" }}>
        <YoutubeEmbed embedId={videoId} />
      </Grid>
    </BaseComponentType>
  );
};

export default VideoComponent;
