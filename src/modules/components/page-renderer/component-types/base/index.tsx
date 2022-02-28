import { Grid } from "@mui/material";
import { IComponentLayout } from "../../../../../store/user/types";
import {
  RENDERED_PAGE_COMPONENT_HEIGHT,
  RENDERED_PAGE_COMPONENT_RADIUS,
} from "../../../../constants";

interface IProps {
  layout: IComponentLayout;
  style: any;
  children: any;
  url: string | undefined;
  [x: string]: any;
}

const BaseComponentType = ({
  layout,
  style,
  children,
  url,
  ...rest
}: IProps) => {
  const openUrl = () => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Grid
      container
      item
      xs={6 * layout.columns}
      style={{ padding: "8px", cursor: "pointer" }}
    >
      <Grid
        container
        item
        onClick={openUrl}
        style={{
          height: layout.rows * RENDERED_PAGE_COMPONENT_HEIGHT,
          borderRadius: `${RENDERED_PAGE_COMPONENT_RADIUS}px`,
          ...style,
        }}
        {...rest}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default BaseComponentType;
