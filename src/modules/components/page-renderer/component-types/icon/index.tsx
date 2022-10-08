import { Grid } from "@mui/material";
import { IUserComponent } from "../../../../../store/user-pages/types";
import CustomTooltip from "../../../tooltip";
import { IconOverlaySpan } from "./style";
import { Icon } from "@iconify/react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { incrementComponentClicks } from "../../../../../store/page-renderer/actions";

interface IIconsComponentProps {
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
}: IIconsComponentProps) => {
  const dispatch = useDispatch();

  const isRendererPage = isRenderer !== undefined && isRenderer !== false;

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
            <IconOverlaySpan
              isRendererPage={isRendererPage}
              href={isRendererPage ? iconComponent.url : ""}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (onClickIcon) onClickIcon(iconComponent);
                if (isRendererPage && pageId && iconComponent._id) {
                  dispatch(incrementComponentClicks(pageId, iconComponent._id));
                }
              }}
            >
              <CustomTooltip title={iconComponent.url} key={uuidv4()}>
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
              </CustomTooltip>
            </IconOverlaySpan>
          );
        }
        return <></>;
      })}
    </Grid>
  );
};

export default IconsComponent;
