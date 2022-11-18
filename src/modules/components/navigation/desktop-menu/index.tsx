import { Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import strings from "../../../../localization";
import routes from "../../../../routes/paths";
import { PRIMARY_COLOR } from "../../../../styles/colors";
import { HeaderLinkDesktop } from "../style";
import UserLoggedIn from "../user-loggedin";

const DesktopHeader = () => {
  const location = useLocation();

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
        <Grid item padding={2}>
          <HeaderLinkDesktop
            to={routes.pages}
            isLocation={location.pathname === routes.pages}
          >
            {strings.pages}
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
