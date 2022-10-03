import InternalLink from "../internal-link";
import { GDPRPopupRoot } from "./style";
import routes from "./../../../routes/paths";
import strings from "../../../localization";
import { Grid } from "@mui/material";
import CustomButton from "./../button-custom/index";
import { DEEP_DARK_GREEN, PRIMARY_COLOR } from "./../../../styles/colors";

interface IGDPRPopupProps {
  onConsentCallback: () => void;
}

const GDPRPopup = ({ onConsentCallback }: IGDPRPopupProps) => {
  return (
    <GDPRPopupRoot>
      <p>
        <strong>Cookies</strong>
      </p>
      {strings.cookiesConsent}
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <p>
            <InternalLink to={routes.cookies}>{strings.cookies}</InternalLink>
            {" | "}
            <InternalLink to={routes.privacy}>{strings.privacy}</InternalLink>
            {" | "}
            <InternalLink to={routes.terms}>{strings.terms}</InternalLink>
          </p>
        </Grid>
        <Grid item>
          <CustomButton
            bgColor={PRIMARY_COLOR}
            fontColor="white"
            hoverBgColor={DEEP_DARK_GREEN}
            onClick={onConsentCallback}
          >
            {strings.ok}
          </CustomButton>
        </Grid>
      </Grid>
    </GDPRPopupRoot>
  );
};

export default GDPRPopup;
