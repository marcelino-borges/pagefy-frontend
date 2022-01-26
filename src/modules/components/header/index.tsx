import { Grid } from "@mui/material";
import { HeaderLink, Parent } from "./style";
import strings from "../../../localization";
import routes from "./../../../routes/paths";

const Header = () => {
  return (
    <Parent container item alignItems="center">
      <Grid container item xs={2} justifyContent="center">
        <img
          src="https://www.suportegratuito.com.br/wp-content/uploads/2017/06/spotify-logo-primary-horizontal-light-background-rgb.jpg"
          style={{ height: "auto", width: "100%" }}
          alt="Logo"
        />
      </Grid>
      <Grid container item xs={7} justifyContent="center">
        <Grid item>
          <HeaderLink to={routes.root}>{strings.home}</HeaderLink>
        </Grid>
        <Grid item>
          <HeaderLink to={routes.pages}>{strings.pages}</HeaderLink>
        </Grid>
        <Grid item>
          <HeaderLink to={routes.support}>{strings.support}</HeaderLink>
        </Grid>
      </Grid>
      <Grid container item xs={3} justifyContent="center">
        User Logged In
      </Grid>
    </Parent>
  );
};

export default Header;
