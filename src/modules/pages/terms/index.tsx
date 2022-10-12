import { Grid } from "@mui/material";
import strings from "../../../localization";
import Footer from "../../components/footer";
import Header from "../../components/header";
import TriplePageTitle from "../../components/page-title";
import ThinWidthContent from "../../components/site-content/thin-width";
import { getTermsByLanguage } from "./utils";

const TermsPage = () => {
  return (
    <>
      <Header />
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
