import { Grid, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { IUserComponent } from "../../../../../store/user/types";
import { getYoutubeIdFromUrl } from "../../../../../utils";
import { RENDERED_PAGE_COMPONENT_HEIGHT } from "../../../../constants";
import YoutubeEmbed from "../../../youtube-embed";
import BaseComponentType from "../base";

interface IProps {
  component: IUserComponent;
}

const VideoComponent = ({ component }: IProps) => {
  const isSmallerThan400 = useMediaQuery("(max-width: 399px)");
  const isSmallerThan500 = useMediaQuery("(max-width: 499px)");

  const [widthMultiplier, setWidthMultiplier] = useState<number>(0);

  useEffect(() => {
    console.log("isSmallerThan400 = " + isSmallerThan400);
    console.log("isSmallerThan500 = " + isSmallerThan500);
    if (isSmallerThan400) {
      setWidthMultiplier(4);
    } else if (isSmallerThan500) {
      setWidthMultiplier(3);
    } else {
      setWidthMultiplier(0);
    }
  }, [isSmallerThan400, isSmallerThan500]);

  if (!component.mediaUrl) return null;

  const videoId = getYoutubeIdFromUrl(component.mediaUrl);

  if (!videoId) return null;

  return (
    <BaseComponentType
      layout={component.layout}
      style={{
        ...component.style,
        height:
          RENDERED_PAGE_COMPONENT_HEIGHT * (6 - widthMultiplier) +
          "px !important",
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
