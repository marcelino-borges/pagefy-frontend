import { Grid, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { IUserComponent } from "../../../../../store/user-pages/types";
import { RENDERED_PAGE_COMPONENT_HEIGHT } from "../../../../../constants";
import BaseComponentType from "../base";
import { incrementComponentClicks } from "../../../../../store/page-renderer/actions";
import MapEmbed from "../../../map-embed";

interface IMapComponentProps {
  component: IUserComponent;
  pageId?: string | undefined;
  fontColor?: string | undefined;
}

const MapComponent = ({ component, pageId, fontColor }: IMapComponentProps) => {
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
        <MapEmbed
          mapUrl={component.url}
          height={String(
            RENDERED_PAGE_COMPONENT_HEIGHT * (6 - widthMultiplier)
          )}
        />
      </Grid>
    </BaseComponentType>
  );
};

export default MapComponent;
