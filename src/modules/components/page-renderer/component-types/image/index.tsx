import { Grid } from "@mui/material";
import { IUserComponent } from "../../../../../store/user/types";
import {
  RENDERED_PAGE_COMPONENT_HEIGHT,
  RENDERED_PAGE_COMPONENT_RADIUS,
} from "../../../../constants";
import BaseComponentType from "../base";

interface IProps {
  component: IUserComponent;
}

const ImageComponent = ({ component }: IProps) => {
  return (
    <BaseComponentType
      layout={component.layout}
      style={component.style}
      url={component.url}
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
