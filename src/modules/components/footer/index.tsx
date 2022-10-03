import { Grid, useMediaQuery, useTheme } from "@mui/material";
import strings from "../../../localization";
import { FooterRoot } from "./style";
import routes from "./../../../routes/paths";
import { PRIMARY_COLOR } from "../../../styles/colors";
import ExternalLink from "../external-link";
import InternalLink from "./../internal-link/index";

const Footer = () => {
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <FooterRoot>
        <Grid container direction="column">
          <Grid
            container
            direction={isSmallerThanSM ? "column" : "row"}
            gap={isSmallerThanSM ? "16px" : "0px"}
          >
            <Grid
              container
              item
              direction="column"
              xs={12}
              md={4}
              alignItems="center"
              gap="8px"
            >
              <Grid item fontSize="1.5em" pb="16px">
                <strong>{strings.company}</strong>
              </Grid>
              <Grid item>
                <InternalLink to={routes.about}>{strings.about}</InternalLink>
              </Grid>
              <Grid item>
                <a href="https://instagram.com">Instagram</a>
              </Grid>
              <Grid item>
                <InternalLink to={routes.signIn}>
                  {strings.signIn2}
                </InternalLink>
              </Grid>
              <Grid item>
                <InternalLink to={routes.signUp}>{strings.signUp}</InternalLink>
              </Grid>
            </Grid>
            <Grid
              container
              item
              direction="column"
              xs={12}
              md={4}
              alignItems="center"
              gap="8px"
            >
              <Grid item fontSize="1.5em" pb="16px">
                <strong>{strings.support}</strong>
              </Grid>
              <Grid item>
                <InternalLink to={routes.faq}>FAQ</InternalLink>
              </Grid>
              <Grid item>
                <InternalLink to={routes.support}>
                  {strings.support}
                </InternalLink>
              </Grid>
            </Grid>
            <Grid
              container
              item
              direction="column"
              xs={12}
              md={4}
              alignItems="center"
              gap="8px"
            >
              <Grid item fontSize="1.5em" pb="16px">
                <strong>{strings.legal}</strong>
              </Grid>
              <Grid item>
                <InternalLink to="#">{strings.privacy}</InternalLink>
              </Grid>
              <Grid item>
                <InternalLink to="#">{strings.terms}</InternalLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FooterRoot>
      <Grid
        container
        direction="row"
        pt="16px"
        justifyContent="center"
        bgcolor={PRIMARY_COLOR}
        height="50px"
      >
        {`${strings.webiseCreatedBy}`}&nbsp;
        <ExternalLink
          to="http://devbox.eng.br"
          color="white"
          hoverColor="black"
        >
          Devbox
        </ExternalLink>
        &nbsp;
        {`©. ${strings.allRightsReserved} ®.`}
      </Grid>
    </>
  );
};

export default Footer;
