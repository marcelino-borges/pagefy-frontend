import { Grid } from "@mui/material";
import { IUserComponent } from "../../../../../store/user-pages/types";
import {
  RENDERED_PAGE_COMPONENT_HEIGHT,
  RENDERED_PAGE_COMPONENT_RADIUS,
} from "../../../../../constants";
import BaseComponentType from "../base";
import { incrementComponentClicks } from "../../../../../store/page-renderer/actions";

interface IProps {
  component: IUserComponent;
  pageId?: string | undefined;
}

const ImageComponent = ({ component, pageId }: IProps) => {
  return (
    <BaseComponentType
      layout={component.layout}
      style={component.style}
      url={component.url}
      animation={component.animation}
      onClick={() => {
        if (pageId && component._id)
          incrementComponentClicks(pageId, component._id);
      }}
    >
      <Grid
        container
        style={{
          backgroundImage: `url(${component.mediaUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: `${RENDERED_PAGE_COMPONENT_RADIUS}px`,
          height: component.layout.rows * RENDERED_PAGE_COMPONENT_HEIGHT,
        }}
      ></Grid>
    </BaseComponentType>
  );
};

export default ImageComponent;
