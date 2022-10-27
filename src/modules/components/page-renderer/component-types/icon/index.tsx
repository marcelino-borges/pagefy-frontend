import React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Grid } from "@mui/material";
import { Close } from "@mui/icons-material";
import { IUserComponent } from "../../../../../store/user-pages/types";
import CustomTooltip from "../../../tooltip";
import { IconOverlaySpan } from "./style";
import { Icon } from "@iconify/react";
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
              key={uuidv4()}
            >
              <CustomTooltip title={iconComponent.url}>
                <>
                  {!isRenderer && (
                    <div id="delete-icon-bg">
                      <Close id="delete-icon" color="inherit" />
                    </div>
                  )}
                  <Icon
                    id={!isRenderer ? "app-icon-editor" : "app-icon-renderer"}
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
                </>
              </CustomTooltip>
            </IconOverlaySpan>
          );
        }
        return <></>;
      })}
    </Grid>
  );
};

export default React.memo(IconsComponent);
