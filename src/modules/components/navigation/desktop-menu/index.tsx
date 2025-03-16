import { Grid, Stack } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import strings from "../../../../localization";
import PAGES_ROUTES from "../../../../routes/paths";
import { HeaderLinkDesktop } from "../style";
import { IApplicationState } from "../../../../store";

const DesktopHeader = () => {
  const location = useLocation();

  const accessToken = useSelector(
    (state: IApplicationState) => state.auth.auth?.accessToken
  );

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-evenly"
      direction="row"
      flexWrap="nowrap"
      flexGrow={2}
    >
      <Stack
        flexDirection="row"
        padding={2}
        justifyContent="center"
        flexWrap="nowrap"
      >
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
              to={PAGES_ROUTES.userPages}
              isLocation={location.pathname === PAGES_ROUTES.userPages}
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
      </Stack>
    </Stack>
  );
};

export default React.memo(DesktopHeader);
