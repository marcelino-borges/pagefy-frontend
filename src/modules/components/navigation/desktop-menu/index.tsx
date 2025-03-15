import { Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import strings from "../../../../localization";
import PAGES_ROUTES from "../../../../routes/paths";
import { HeaderLinkDesktop } from "../style";
import UserLoggedIn from "../user-loggedin";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../../store";

const DesktopHeader = () => {
  const location = useLocation();

  const accessToken = useSelector(
    (state: IApplicationState) => state.auth.auth?.accessToken
  );

  return (
    <Grid
      container
      item
      md={8}
      justifyContent="center"
      direction="row"
      pr="32px"
      wrap="nowrap"
    >
      <Grid container item padding={2} justifyContent="center">
        <Grid item padding={2}>
          <HeaderLinkDesktop
            to={PAGES_ROUTES.root}
            isLocation={location.pathname === PAGES_ROUTES.root}
          >
            {strings.home}
          </HeaderLinkDesktop>
        </Grid>
        {!!accessToken?.length && (
          <Grid item padding={2}>
            <HeaderLinkDesktop
              to={PAGES_ROUTES.pages}
              isLocation={location.pathname === PAGES_ROUTES.pages}
            >
              {strings.pages}
            </HeaderLinkDesktop>
          </Grid>
        )}
        <Grid item padding={2}>
          <HeaderLinkDesktop
            to={PAGES_ROUTES.plans}
            isLocation={location.pathname === PAGES_ROUTES.plans}
          >
            {strings.plans}
          </HeaderLinkDesktop>
        </Grid>
        <Grid item padding={2}>
          <HeaderLinkDesktop
            to={PAGES_ROUTES.faq}
            isLocation={
              location.pathname === PAGES_ROUTES.faq ||
              location.pathname === PAGES_ROUTES.support
            }
          >
            {strings.support}
          </HeaderLinkDesktop>
        </Grid>
      </Grid>
      <UserLoggedIn />
    </Grid>
  );
};

export default React.memo(DesktopHeader);
