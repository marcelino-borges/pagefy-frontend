import React, { useEffect, useState } from "react";
import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Parent } from "./style";
import PAGES_ROUTES from "./../../../routes/paths";
import { Link } from "react-router-dom";
import logos from "../../../assets/img/logos";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from "../../../constants";
import UserLoggedIn from "./user-loggedin";

import DesktopHeader from "./desktop-menu";
import MobileHeader from "./mobile-drawer";

type NavitationVariant =
  | "fixed"
  | "sticky"
  | "rollTransparent"
  | "rollNotTransparent";

interface INavigationProps {
  variant?: NavitationVariant;
}

const Navigation = ({ variant = "fixed" }: INavigationProps) => {
  const theme = useTheme();
  const isSmallerThanMD = useMediaQuery(theme.breakpoints.down("md"));

  const userState = useSelector((state: IApplicationState) => state.user);

  const [isShowingDrawer, setIsShowingDrawer] = useState(false);
  const [transparent, setTransparent] = useState(true);
  const [isFixed, setIsFixed] = useState(true);

  const toggleDrawer = () => {
    setIsShowingDrawer(!isShowingDrawer);
  };

  const stickNavigation = () => {
    if (window.scrollY > 50) {
      setTransparent(false);
      setIsFixed(true);
    } else {
      setTransparent(true);
      setIsFixed(false);
    }
  };

  useEffect(() => {
    switch (variant) {
      case "fixed":
        setIsFixed(true);
        setTransparent(false);
        break;
      case "sticky":
        setIsFixed(false);
        setTransparent(true);
        document.addEventListener("scroll", stickNavigation);
        break;
      case "rollTransparent":
        setIsFixed(false);
        setTransparent(true);
        break;
      case "rollNotTransparent":
        setIsFixed(false);
        setTransparent(false);
        break;
    }

    return () => {
      document.removeEventListener("scroll", stickNavigation);
    };
  }, [variant]);

  useEffect(() => {
    if (!isSmallerThanMD) {
      setIsShowingDrawer(false);
    }
  }, [isSmallerThanMD]);

  const paddingsParent = isSmallerThanMD ? "16px" : "32px";

  return (
    <Parent
      container
      alignItems="center"
      justifyContent="space-between"
      transparent={transparent}
      isFixed={isFixed}
      maxWidth="100vw"
      pr={paddingsParent}
      pl={paddingsParent}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{
          height: isSmallerThanMD
            ? HEADER_HEIGHT_MOBILE
            : HEADER_HEIGHT_DESKTOP,
        }}
      >
        <Link
          to={
            userState.profile?._id ? PAGES_ROUTES.userPages : PAGES_ROUTES.root
          }
        >
          <img
            src={logos.LogoHorizontalLightBgPng}
            style={{
              margin: "8px",
              height: isSmallerThanMD
                ? `${Number(HEADER_HEIGHT_MOBILE.replace("px", "")) * 0.5}px`
                : "50px",
            }}
            alt="Logo"
          />
        </Link>
      </Stack>
      {isSmallerThanMD ? (
        <MobileHeader
          toggleDrawer={toggleDrawer}
          isShowingDrawer={isShowingDrawer}
          setIsShowingDrawer={setIsShowingDrawer}
        />
      ) : (
        <DesktopHeader />
      )}
      {!isSmallerThanMD && <UserLoggedIn />}
    </Parent>
  );
};

export default React.memo(Navigation);
