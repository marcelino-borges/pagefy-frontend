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
import images from "../../../assets/img";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const isSmallerThanMD = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

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
        <Grid container item xs={6} justifyContent="center">
          <Grid item>
            <HeaderLinkDesktop to={routes.root}>
              {strings.home}
            </HeaderLinkDesktop>
          </Grid>
          <Grid item>
            <HeaderLinkDesktop to={routes.pages}>
              {strings.pages}
            </HeaderLinkDesktop>
          </Grid>
          <Grid item>
            <HeaderLinkDesktop to={routes.support}>
              {strings.support}
            </HeaderLinkDesktop>
          </Grid>
        </Grid>

        <Grid container item xs={3} justifyContent="center" padding={3}>
          User Logged In
        </Grid>
      </>
    );
  };

  const MobileHeader = () => {
    return (
      <>
        <Grid container item xs={6} justifyContent="flex-end" padding={4}>
          <HamburguerMenuIcon onClick={toggleDrawer} />
        </Grid>

        <DrawerMenu
          anchor="right"
          open={isShowingDrawer}
          onClose={toggleDrawer}
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
            <Grid item>User Logged In</Grid>

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
              onClick={() => onClickLinkCallback(routes.support)}
            >
              {strings.support}
            </MobileMenuGridItem>
          </Grid>
        </DrawerMenu>
      </>
    );
  };

  return (
    <Parent container alignItems="center">
      <Grid
        container
        item
        xs={6}
        md={3}
        justifyContent="flex-start"
        padding={4}
      >
        <Link to={routes.root}>
          <img
            src={images.logoHeader}
            style={{ height: "61px", width: "auto" }}
            alt="Logo"
          />
        </Link>
      </Grid>
      {isSmallerThanMD ? <MobileHeader /> : <DesktopHeader />}
    </Parent>
  );
};

export default Header;
