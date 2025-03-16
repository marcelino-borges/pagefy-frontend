import { Grid } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import strings from "../../../../localization";
import PAGES_ROUTES from "../../../../routes/paths";
import { PRIMARY_COLOR } from "../../../../styles/colors";
import {
  CloseIcon,
  DrawerCloseButton,
  DrawerMenu,
  HamburguerMenuIcon,
  MobileMenuGridItem,
} from "../style";
import UserLoggedIn from "../user-loggedin";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../../store";

interface IMobileHeaderProps {
  toggleDrawer: () => void;
  isShowingDrawer: boolean;
  setIsShowingDrawer: (value: boolean) => void;
}

const MobileHeader = ({
  toggleDrawer,
  isShowingDrawer,
  setIsShowingDrawer,
}: IMobileHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = useSelector(
    (state: IApplicationState) => state.auth.auth?.accessToken
  );

  const onClickLinkCallback = (navigateTo: string) => {
    setTimeout(() => {
      setIsShowingDrawer(false);
      navigate(navigateTo);
    }, 250);
  };

  return (
    <Grid item xs={2}>
      <Grid container item justifyContent="flex-end">
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
            onClick={() => onClickLinkCallback(PAGES_ROUTES.root)}
            style={{
              color:
                location.pathname === PAGES_ROUTES.root ? PRIMARY_COLOR : "",
            }}
          >
            {strings.home}
          </MobileMenuGridItem>

          {!!accessToken?.length && (
            <MobileMenuGridItem
              item
              alignItems="center"
              onClick={() => onClickLinkCallback(PAGES_ROUTES.userPages)}
              style={{
                color:
                  location.pathname === PAGES_ROUTES.userPages
                    ? PRIMARY_COLOR
                    : "",
              }}
            >
              {strings.pages}
            </MobileMenuGridItem>
          )}

          <MobileMenuGridItem
            item
            alignItems="center"
            onClick={() => onClickLinkCallback(PAGES_ROUTES.plans)}
            style={{
              color:
                location.pathname === PAGES_ROUTES.plans ? PRIMARY_COLOR : "",
            }}
          >
            {strings.plans}
          </MobileMenuGridItem>

          <MobileMenuGridItem
            item
            alignItems="center"
            onClick={() => onClickLinkCallback(PAGES_ROUTES.faq)}
            style={{
              color:
                location.pathname === PAGES_ROUTES.faq ||
                location.pathname === PAGES_ROUTES.support
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

export default React.memo(MobileHeader);
