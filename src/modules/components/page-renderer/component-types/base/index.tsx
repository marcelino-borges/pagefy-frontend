import { Grid } from "@mui/material";
import {
  IComponentLayout,
  IComponentAnimation,
} from "../../../../../store/user-pages/types";
import {
  RENDERED_PAGE_COMPONENT_HEIGHT,
  RENDERED_PAGE_COMPONENT_RADIUS,
} from "../../../../../constants";
import { Root } from "./style";
import CustomTooltip from "../../../tooltip";
import { openExternalLink } from "../../../../../utils";

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
  onClick,
  ...rest
}: IProps) => {
  const MainComponent = () => (
    <Root
      container
      item
      xs={6 * layout.columns}
      animation={animation?.name}
      duration={animation?.duration}
      delay={animation?.startDelay}
      infinite={animation?.infinite}
      onClick={() => {
        if (url) openExternalLink(url, window);
        onClick();
      }}
    >
      <Grid
        container
        item
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

  return url ? (
    <CustomTooltip title={url}>
      <MainComponent />
    </CustomTooltip>
  ) : (
    <MainComponent />
  );
};

export default BaseComponentType;
