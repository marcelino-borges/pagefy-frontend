import { Grid } from "@mui/material";
import { IComponentLayout } from "../../../../../store/user/types";
import {
  RENDERED_PAGE_COMPONENT_HEIGHT,
  RENDERED_PAGE_COMPONENT_RADIUS,
} from "../../../../constants";
import { IComponentAnimation } from "./../../../../../store/user/types";
import { Root } from "./style";

interface IProps {
  layout: IComponentLayout;
  style: any;
  children: any;
  url: string | undefined;
  animation?: IComponentAnimation | undefined;
  [x: string]: any;
}

const BaseComponentType = ({
  layout,
  style,
  children,
  url,
  animation,
  ...rest
}: IProps) => {
  const openUrl = () => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Root
      container
      item
      xs={6 * layout.columns}
      animation={animation?.name}
      duration={animation?.duration}
      delay={animation?.startDelay}
      infinite={animation?.infinite}
    >
      <Grid
        container
        item
        onClick={openUrl}
        style={{
          minHeight: layout.rows * RENDERED_PAGE_COMPONENT_HEIGHT,
          borderRadius: `${RENDERED_PAGE_COMPONENT_RADIUS}px`,
          ...style,
        }}
        {...rest}
      >
        {children}
      </Grid>
    </Root>
  );
};

export default BaseComponentType;
