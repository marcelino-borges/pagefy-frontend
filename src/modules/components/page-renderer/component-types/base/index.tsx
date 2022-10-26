import { Grid } from "@mui/material";
import {
  IComponentLayout,
  IComponentAnimation,
} from "../../../../../store/user-pages/types";
import {
  RENDERED_PAGE_COMPONENT_HEIGHT,
  DEFAULT_COMPONENT_RADIUS,
  ComponentShadowStyle,
} from "../../../../../constants";
import { Root } from "./style";
import CustomTooltip from "../../../tooltip";
import { openExternalLink } from "../../../../../utils";

interface IBaseComponentTypeProps {
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
}: IBaseComponentTypeProps) => {
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
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ width: "100%", height: "100%" }}
      >
        <Grid
          container
          item
          style={{
            ...style,
            boxShadow: style.boxShadow || ComponentShadowStyle.NONE,
            minHeight: layout.rows * RENDERED_PAGE_COMPONENT_HEIGHT,
            borderRadius: style.borderRadius || `${DEFAULT_COMPONENT_RADIUS}px`,
          }}
          {...rest}
        >
          {children}
        </Grid>
      </a>
    </Root>
  );

  return (
    <CustomTooltip disabled={!url} title={url || ""}>
      <MainComponent />
    </CustomTooltip>
  );
};

export default BaseComponentType;
