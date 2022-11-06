import { Grid } from "@mui/material";
import strings from "../../../localization";
import Footer from "../../components/footer";
import Navigation from "../../components/navigation";
import TriplePageTitle from "../../components/page-title";
import ThinWidthContent from "../../components/site-content/thin-width";
import { getCookiesByLanguage } from "./utils";

const CoockiesPoliciesPage = () => {
  return (
    <>
      <Navigation />
      <ThinWidthContent center>
        <TriplePageTitle
          titles={[strings.cookiesPolicies, strings.cookiesPoliciesSubtitle]}
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
