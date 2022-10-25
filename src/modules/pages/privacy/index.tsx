import { Grid } from "@mui/material";
import strings from "../../../localization";
import Footer from "../../components/footer";
import Navigation from "../../components/navigation";
import TriplePageTitle from "../../components/page-title";
import ThinWidthContent from "../../components/site-content/thin-width";
import { getPrivacyByLanguage } from "./utils";

const PrivacyPage = () => {
  return (
    <>
      <Navigation />
      <ThinWidthContent>
        <TriplePageTitle
          titles={[strings.privacyPolicies, strings.privacyPoliciesSubtitle]}
          increasingSize
        />
        <Grid container direction="column">
          {getPrivacyByLanguage()}
        </Grid>
      </ThinWidthContent>
      <Footer />
    </>
  );
};

export default PrivacyPage;
