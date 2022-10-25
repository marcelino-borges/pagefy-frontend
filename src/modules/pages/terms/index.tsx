import { Grid } from "@mui/material";
import strings from "../../../localization";
import Footer from "../../components/footer";
import Navigation from "../../components/navigation";
import TriplePageTitle from "../../components/page-title";
import ThinWidthContent from "../../components/site-content/thin-width";
import { getTermsByLanguage } from "./utils";

const TermsPage = () => {
  return (
    <>
      <Navigation />
      <ThinWidthContent>
        <TriplePageTitle
          titles={[strings.termsOfUse, strings.termsOfUseSubtitle]}
          increasingSize
        />
        <Grid container direction="column">
          {getTermsByLanguage()}
        </Grid>
      </ThinWidthContent>
      <Footer />
    </>
  );
};

export default TermsPage;
