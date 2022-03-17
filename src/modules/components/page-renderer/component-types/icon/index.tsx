import { Grid } from "@mui/material";
import { IUserComponent } from "../../../../../store/user-pages/types";
import CustomTooltip from "../../../tooltip";
import { IconOverlaySpan } from "./style";
import { Icon } from "@iconify/react";

interface IProps {
  iconsList: IUserComponent[];
  onClickIcon?: (iconComponent: IUserComponent) => void;
}

const IconsComponent = ({ iconsList, onClickIcon }: IProps) => {
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
        if (
          iconComponent.iconDetails &&
          iconComponent.url &&
          iconComponent.visible &&
          (!iconComponent.visibleDate ||
            new Date(iconComponent.visibleDate) >= new Date())
        ) {
          return (
            <CustomTooltip title={iconComponent.url} key={iconComponent._id}>
              <IconOverlaySpan>
                <Icon
                  onClick={() => {
                    if (onClickIcon) onClickIcon(iconComponent);
                  }}
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
        return <span key={iconComponent._id}></span>;
      })}
    </Grid>
  );
};

export default IconsComponent;
