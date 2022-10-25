import { useEffect, useState } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { Parent } from "./style";
import routes from "./../../../routes/paths";
import { Link } from "react-router-dom";
import logos from "../../../assets/img/logos";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from "../../../constants";

import DesktopHeader from "./desktop-menu";
import MobileHeader from "./mobile-drawer";
import React from "react";

const Navigation = () => {
  const theme = useTheme();
  const isSmallerThanMD = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallerThan420 = useMediaQuery("(max-width:420px)");

  const userState = useSelector((state: IApplicationState) => state.user);

  const [isShowingDrawer, setIsShowingDrawer] = useState(false);

  const toggleDrawer = () => {
    setIsShowingDrawer(!isShowingDrawer);
  };

  useEffect(() => {
    if (!isSmallerThanMD) {
      setIsShowingDrawer(false);
    }
  }, [isSmallerThanMD]);

  return (
    <Parent container alignItems="center" justifyContent="space-between">
      <Grid
        container
        item
        xs={10}
        md={4}
        justifyContent="space-between"
        alignItems="center"
        style={{
          paddingLeft: "32px",
          height: isSmallerThanMD
            ? HEADER_HEIGHT_MOBILE
            : HEADER_HEIGHT_DESKTOP,
        }}
      >
        <Link to={userState.profile?._id ? routes.pages : routes.root}>
          {isSmallerThan420 ? (
            <img
              src={logos.LogoIconColorPng}
              style={{
                margin: "8px",
                height: "50px",
              }}
              alt="Logo"
            />
          ) : (
            <img
              src={logos.LogoHorizontalLightBgPng}
              style={{
                margin: "8px",
                height: "50px",
              }}
              alt="Logo"
            />
          )}
        </Link>
      </Grid>
      {isSmallerThanMD ? (
        <MobileHeader
          toggleDrawer={toggleDrawer}
          isShowingDrawer={isShowingDrawer}
          setIsShowingDrawer={setIsShowingDrawer}
        />
      ) : (
        <DesktopHeader />
      )}
    </Parent>
  );
};

export default React.memo(Navigation);
