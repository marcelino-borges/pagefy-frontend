import { Grid } from "@mui/material";
import { IUserComponent } from "../../../../../store/user-pages/types";
import {
  ComponentShadowStyle,
  RENDERED_PAGE_COMPONENT_HEIGHT,
} from "../../../../../constants";
import BaseComponentType from "../base";
import { incrementComponentClicks } from "../../../../../store/page-renderer/actions";

interface IImageComponentProps {
  component: IUserComponent;
  pageId?: string | undefined;
}

const ImageComponent = ({ component, pageId }: IImageComponentProps) => {
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
          borderRadius: `${component.style?.borderRadius || 0}px`,
          height: component.layout.rows * RENDERED_PAGE_COMPONENT_HEIGHT,
          boxShadow: component.style?.boxShadow || ComponentShadowStyle.NONE,
        }}
      ></Grid>
    </BaseComponentType>
  );
};

export default ImageComponent;
