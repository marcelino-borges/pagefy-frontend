import { Grid, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { IUserComponent } from "../../../../../store/user-pages/types";
import { RENDERED_PAGE_COMPONENT_HEIGHT } from "../../../../../constants";
import BaseComponentType from "../base";
import { incrementComponentClicks } from "../../../../../store/page-renderer/actions";
import SpotifyEmbed from "../../../spotify-embed";

interface ISpotifyComponentProps {
  component: IUserComponent;
  pageId?: string | undefined;
  fontColor?: string | undefined;
}

const DEFAULT_ROWS = 3;

const SpotifyComponent = ({
  component,
  pageId,
  fontColor,
}: ISpotifyComponentProps) => {
  const isSmallerThan500 = useMediaQuery("(max-width: 499px)");

  const [widthMultiplier, setWidthMultiplier] = useState<number>(0);

  useEffect(() => {
    if (isSmallerThan500) {
      setWidthMultiplier(2);
    } else {
      setWidthMultiplier(0);
    }
  }, [isSmallerThan500]);

  if (!component.url) return null;

  const height =
    RENDERED_PAGE_COMPONENT_HEIGHT * DEFAULT_ROWS - widthMultiplier;

  return (
    <BaseComponentType
      url={component.url}
      layout={component.layout}
      style={{
        ...component.style,
        height: `${height}px !important`,
      }}
      onClick={() => {
        if (pageId && component._id)
          incrementComponentClicks(pageId, component._id);
      }}
    >
      <Grid style={{ width: "100%", paddingTop: "16px" }}>
        <div
          style={{
            marginBottom: "16px",
            textAlign: "center",
            color: fontColor || "black",
          }}
        >
          {component.text}
        </div>
        <SpotifyEmbed url={component.url} height={String(height)} />
      </Grid>
    </BaseComponentType>
  );
};

export default SpotifyComponent;
