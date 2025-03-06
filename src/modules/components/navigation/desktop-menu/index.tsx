import { Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import strings from "../../../../localization";
import routes from "../../../../routes/paths";
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
            to={routes.root}
            isLocation={location.pathname === routes.root}
          >
            {strings.home}
          </HeaderLinkDesktop>
        </Grid>
        {!!accessToken?.length && (
          <Grid item padding={2}>
            <HeaderLinkDesktop
              to={routes.pages}
              isLocation={location.pathname === routes.pages}
            >
              {strings.pages}
            </HeaderLinkDesktop>
          </Grid>
        )}
        <Grid item padding={2}>
          <HeaderLinkDesktop
            to={routes.plans}
            isLocation={location.pathname === routes.plans}
          >
            {strings.plans}
          </HeaderLinkDesktop>
        </Grid>
        <Grid item padding={2}>
          <HeaderLinkDesktop
            to={routes.faq}
            isLocation={
              location.pathname === routes.faq ||
              location.pathname === routes.support
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
