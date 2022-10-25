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

export default React.memo(DesktopHeader);
