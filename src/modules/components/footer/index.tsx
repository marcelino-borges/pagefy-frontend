import { Grid, useMediaQuery, useTheme } from "@mui/material";
import strings from "../../../localization";
import { FooterRoot } from "./style";
import PAGES_ROUTES from "./../../../routes/paths";
import { PRIMARY_COLOR, UPPER_MEDIUM_GREY } from "../../../styles/colors";
import ExternalLink from "../external-link";
import InternalLink from "./../internal-link/index";
import { MIN_WEBSITE_WIDTH } from "../../../constants";

const Footer = () => {
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));

  const SectionTitle = ({ title }: any) => (
    <Grid item fontSize="1.5em" pb="16px" color={UPPER_MEDIUM_GREY}>
      <strong>{title}</strong>
    </Grid>
  );

  return (
    <FooterRoot>
      <Grid container direction="column" p="32px 16px" bgcolor="white">
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
            <SectionTitle title={strings.company} />
            <Grid item>
              <InternalLink to={PAGES_ROUTES.about}>
                {strings.about}
              </InternalLink>
            </Grid>
            <Grid item>
              <a href="https://instagram.com">Instagram</a>
            </Grid>
            <Grid item>
              <InternalLink to={PAGES_ROUTES.signIn}>
                {strings.signIn2}
              </InternalLink>
            </Grid>
            <Grid item>
              <InternalLink to={PAGES_ROUTES.signUp}>
                {strings.signUp}
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
            <SectionTitle title={strings.support} />
            <Grid item>
              <InternalLink to={PAGES_ROUTES.faq}>FAQ</InternalLink>
            </Grid>
            <Grid item>
              <InternalLink to={PAGES_ROUTES.faq}>
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
            <SectionTitle title={strings.legal} />
            <Grid item>
              <InternalLink to="#">{strings.privacy}</InternalLink>
            </Grid>
            <Grid item>
              <InternalLink to="#">{strings.terms}</InternalLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        p="16px"
        justifyContent="center"
        bgcolor={PRIMARY_COLOR}
        minHeight="50px"
        minWidth={MIN_WEBSITE_WIDTH}
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
    </FooterRoot>
  );
};

export default Footer;
