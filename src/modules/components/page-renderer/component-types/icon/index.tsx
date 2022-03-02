import { Grid } from "@mui/material";
import { IUserComponent } from "../../../../../store/user/types";
import CustomTooltip from "../../../tooltip";
import { IconOverlaySpan } from "./style";
import { Icon } from "@iconify/react";

interface IProps {
  iconsList: IUserComponent[];
}

const IconsComponent = ({ iconsList }: IProps) => {
  return (
    <Grid
      container
      direction="row"
      style={{
        marginBottom: "24px",
      }}
      justifyContent="center"
    >
      {iconsList.map((iconComponent: IUserComponent) => {
        if (iconComponent.iconDetails && iconComponent.url) {
          return (
            <CustomTooltip title={iconComponent.url} key={iconComponent._id}>
              <IconOverlaySpan>
                <Icon
                  icon={iconComponent.iconDetails.icon}
                  style={{
                    fontSize: "46px",
                    cursor: "pointer",
                    color:
                      iconComponent.iconDetails.icon.includes("logos") ||
                      iconComponent.iconDetails.icon.includes("grommet")
                        ? "unset"
                        : iconComponent.style?.color || "black",
                  }}
                />
              </IconOverlaySpan>
            </CustomTooltip>
          );
        }
        return null;
      })}
    </Grid>
  );
};

export default IconsComponent;
