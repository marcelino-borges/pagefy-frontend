import { Grid } from "@mui/material";
import {
  IComponentLayout,
  IComponentStyle,
} from "../../../../../store/user/types";
import {
  RENDERED_PAGE_COMPONENT_HEIGHT,
  RENDERED_PAGE_COMPONENT_RADIUS,
} from "../../../../constants";

interface IProps {
  layout: IComponentLayout;
  style: any;
  children: any;
  [x: string]: any;
}

const BaseComponentType = ({ layout, style, children, ...rest }: IProps) => {
  return (
    <Grid container item xs={6 * layout.columns} style={{ padding: "8px" }}>
      <Grid
        container
        item
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
