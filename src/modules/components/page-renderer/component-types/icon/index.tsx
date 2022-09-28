import { Grid } from "@mui/material";
import { IUserComponent } from "../../../../../store/user-pages/types";
import CustomTooltip from "../../../tooltip";
import { IconOverlaySpan } from "./style";
import { Icon } from "@iconify/react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { incrementComponentClicks } from "../../../../../store/page-renderer/actions";
import { openExternalLink } from "../../../../../utils";

interface IProps {
  iconsList: IUserComponent[];
  onClickIcon?: (iconComponent: IUserComponent) => void;
  pageId?: string | undefined;
  isRenderer?: boolean | undefined;
}

const IconsComponent = ({
  iconsList,
  onClickIcon,
  pageId,
  isRenderer,
}: IProps) => {
  const dispatch = useDispatch();
  return (
    <Grid
      container
      direction="row"
      style={{
        marginBottom: "24px",
      }}
      justifyContent="center"
      key={uuidv4()}
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
              <IconOverlaySpan
                onClick={() => {
                  if (iconComponent.url)
                    openExternalLink(iconComponent.url, window);
                  if (
                    isRenderer !== undefined &&
                    isRenderer !== false &&
                    pageId &&
                    iconComponent._id
                  )
                    dispatch(
                      incrementComponentClicks(pageId, iconComponent._id)
                    );
                }}
              >
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
