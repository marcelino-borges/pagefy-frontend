import { Grid } from "@mui/material";
import { HeaderLink, Parent } from "./style";
import strings from "../../../localization";
import routes from "./../../../routes/paths";
import images from "../../../assets/img";

const Header = () => {
  return (
    <Parent container alignItems="center">
      <Grid
        container
        item
        xs={3}
        justifyContent="center"
        padding={3}
        style={{ height: "100%" }}
      >
        <img
          src={images.logoHeader}
          style={{ height: "100%", width: "auto" }}
          alt="Logo"
        />
      </Grid>
      <Grid container item xs={6} justifyContent="center">
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
      <Grid container item xs={3} justifyContent="center" padding={3}>
        User Logged In
      </Grid>
    </Parent>
  );
};

export default Header;
