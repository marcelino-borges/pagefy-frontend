import { Grid } from "@mui/material";
import strings from "../../../localization";
import Footer from "../../components/footer";
import Header from "../../components/header";
import PageTitle from "../../components/page-title";
import ThinWidthContent from "../../components/site-content/thin-width";
import { getCookiesByLanguage } from "./utils";

const CoockiesPoliciesPage = () => {
  return (
    <>
      <Header />
      <ThinWidthContent>
        <PageTitle
          title={strings.cookiesPolicies}
          subtitle={strings.cookiesPoliciesSubtitle}
          increasingSize
        />
        <Grid container direction="column">
          {getCookiesByLanguage()}
        </Grid>
      </ThinWidthContent>
      <Footer />
    </>
  );
};

export default CoockiesPoliciesPage;
