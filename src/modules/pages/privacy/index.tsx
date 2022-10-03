import { Grid } from "@mui/material";
import strings from "../../../localization";
import Footer from "../../components/footer";
import Header from "../../components/header";
import PageTitle from "../../components/page-title";
import ThinWidthContent from "../../components/site-content/thin-width";
import { getPrivacyByLanguage } from "./utils";

const PrivacyPage = () => {
  return (
    <>
      <Header />
      <ThinWidthContent>
        <PageTitle
          title={strings.privacyPolicies}
          subtitle={strings.privacyPoliciesSubtitle}
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
