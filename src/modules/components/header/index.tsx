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
import { Link, useNavigate } from "react-router-dom";
import logos from "../../../assets/img/logos";
import UserLoggedIn from "./user-loggedin";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallerThanMD = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallerThan400 = useMediaQuery("(max-width:400px)");

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
      <>
        <Grid container item md={4} justifyContent="center">
          <Grid item padding={2}>
            <HeaderLinkDesktop to={routes.root}>
              {strings.home}
            </HeaderLinkDesktop>
          </Grid>
          <Grid item padding={2}>
            <HeaderLinkDesktop to={routes.pages}>
              {strings.pages}
            </HeaderLinkDesktop>
          </Grid>
          <Grid item padding={2}>
            <HeaderLinkDesktop to={routes.faq}>
              {strings.faq.menu}
            </HeaderLinkDesktop>
          </Grid>
          <Grid item padding={2}>
            <HeaderLinkDesktop to={routes.support}>
              {strings.support}
            </HeaderLinkDesktop>
          </Grid>
        </Grid>

        <Grid container item md={4} justifyContent="center" padding={3}>
          <UserLoggedIn />
        </Grid>
      </>
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
            >
              {strings.home}
            </MobileMenuGridItem>

            <MobileMenuGridItem
              item
              alignItems="center"
              onClick={() => onClickLinkCallback(routes.pages)}
            >
              {strings.pages}
            </MobileMenuGridItem>

            <MobileMenuGridItem
              item
              alignItems="center"
              onClick={() => onClickLinkCallback(routes.faq)}
            >
              {strings.faq.menu}
            </MobileMenuGridItem>

            <MobileMenuGridItem
              item
              alignItems="center"
              onClick={() => onClickLinkCallback(routes.support)}
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
          height: isSmallerThanMD ? "unset" : "117px",
        }}
      >
        <Link to={userState.profile?._id ? routes.pages : routes.root}>
          <img
            src={logos.LogoHorizontalLightBGPNG}
            style={{
              height: "auto",
              width: isSmallerThan400 ? "125px" : "80%",
              margin: "8px",
              maxHeight: "80px",
            }}
            alt="Logo"
          />
        </Link>
      </Grid>
      {isSmallerThanMD ? <MobileHeader /> : <DesktopHeader />}
    </Parent>
  );
};

export default Header;
