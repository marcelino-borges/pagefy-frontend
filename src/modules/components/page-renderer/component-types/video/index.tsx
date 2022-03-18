import { Grid, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { IUserComponent } from "../../../../../store/user-pages/types";
import { getYoutubeIdFromUrl } from "../../../../../utils";
import { RENDERED_PAGE_COMPONENT_HEIGHT } from "../../../../../constants";
import YoutubeEmbed from "../../../youtube-embed";
import BaseComponentType from "../base";
import { incrementComponentClicks } from "../../../../../store/page-renderer/actions";

interface IProps {
  component: IUserComponent;
  pageId?: string | undefined;
}

const VideoComponent = ({ component, pageId }: IProps) => {
  const isSmallerThan500 = useMediaQuery("(max-width: 499px)");

  const [widthMultiplier, setWidthMultiplier] = useState<number>(0);

  useEffect(() => {
    if (isSmallerThan500) {
      setWidthMultiplier(2);
    } else {
      setWidthMultiplier(0);
    }
  }, [isSmallerThan500]);

  if (!component.mediaUrl) return null;

  const videoId = getYoutubeIdFromUrl(component.mediaUrl);

  if (!videoId) return null;

  return (
    <BaseComponentType
      url={component.url}
      layout={component.layout}
      style={{
        ...component.style,
        height:
          RENDERED_PAGE_COMPONENT_HEIGHT * (6 - widthMultiplier) +
          "px !important",
      }}
      onClick={() => {
        if (pageId && component._id)
          incrementComponentClicks(pageId, component._id);
      }}
    >
      <Grid style={{ width: "100%" }}>
        <YoutubeEmbed
          embedId={videoId}
          height={String(
            RENDERED_PAGE_COMPONENT_HEIGHT * (6 - widthMultiplier)
          )}
        />
      </Grid>
    </BaseComponentType>
  );
};

export default VideoComponent;
