import { useEffect, useState } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import {
  HeaderLinkDesktop,
  Parent,
  HamburguerMenuIcon,
  DrawerMenu,
  MobileMenuGridItem,
  DrawerCloseButton,
  CloseIcon,
} from "./style";
import strings from "../../../localization";
import routes from "./../../../routes/paths";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logos from "../../../assets/img/logos";
import UserLoggedIn from "./user-loggedin";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import { PRIMARY_COLOR } from "../../../styles/colors";
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from "../../../constants";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
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

  const onClickLinkCallback = (navigateTo: string) => {
    setTimeout(() => {
      setIsShowingDrawer(false);
      navigate(navigateTo);
    }, 250);
  };

  const DesktopHeader = () => {
    return (
      <Grid
        container
        item
        md={8}
        justifyContent="flex-end"
        direction="row"
        pr="32px"
        wrap="nowrap"
      >
        <Grid item padding={2}>
          <HeaderLinkDesktop
            to={routes.root}
            style={{
              color: location.pathname === routes.root ? PRIMARY_COLOR : "",
            }}
          >
            {strings.home}
          </HeaderLinkDesktop>
        </Grid>
        <Grid item padding={2}>
          <HeaderLinkDesktop
            to={routes.pages}
            style={{
              color: location.pathname === routes.pages ? PRIMARY_COLOR : "",
            }}
          >
            {strings.pages}
          </HeaderLinkDesktop>
        </Grid>
        <Grid item padding={2}>
          <HeaderLinkDesktop
            to={routes.faq}
            style={{
              color:
                location.pathname === routes.faq ||
                location.pathname === routes.support
                  ? PRIMARY_COLOR
                  : "",
            }}
          >
            {strings.support}
          </HeaderLinkDesktop>
        </Grid>
        <UserLoggedIn />
      </Grid>
    );
  };

  const MobileHeader = () => {
    return (
      <Grid item xs={2}>
        <Grid
          container
          item
          justifyContent="flex-end"
          style={{ paddingRight: "36px" }}
        >
          <HamburguerMenuIcon onClick={toggleDrawer} />
        </Grid>

        <DrawerMenu
          anchor="right"
          open={isShowingDrawer}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
          transitionDuration={500}
        >
          <DrawerCloseButton
            container
            justifyContent="center"
            alignItems="center"
            onClick={toggleDrawer}
          >
            <CloseIcon />
          </DrawerCloseButton>

          <Grid container direction="column" alignItems="center">
            <Grid item style={{ marginTop: "50px" }}>
              <UserLoggedIn />
            </Grid>
            <span style={{ height: "70px" }} />
            <MobileMenuGridItem
              item
              alignItems="center"
              onClick={() => onClickLinkCallback(routes.root)}
              style={{
                color: location.pathname === routes.root ? PRIMARY_COLOR : "",
              }}
            >
              {strings.home}
            </MobileMenuGridItem>

            <MobileMenuGridItem
              item
              alignItems="center"
              onClick={() => onClickLinkCallback(routes.pages)}
              style={{
                color: location.pathname === routes.pages ? PRIMARY_COLOR : "",
              }}
            >
              {strings.pages}
            </MobileMenuGridItem>

            <MobileMenuGridItem
              item
              alignItems="center"
              onClick={() => onClickLinkCallback(routes.faq)}
              style={{
                color:
                  location.pathname === routes.faq ||
                  location.pathname === routes.support
                    ? PRIMARY_COLOR
                    : "",
              }}
            >
              {strings.support}
            </MobileMenuGridItem>
          </Grid>
        </DrawerMenu>
      </Grid>
    );
  };

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
      {isSmallerThanMD ? <MobileHeader /> : <DesktopHeader />}
    </Parent>
  );
};

export default Header;
