import { Grid } from "@mui/material";
import strings from "../../../localization";
import Footer from "../../components/footer";
import Header from "../../components/header";
import PageTitle from "../../components/page-title";
import ThinWidthContent from "../../components/site-content/thin-width";
import { getTermsByLanguage } from "./utils";

const TermsPage = () => {
  return (
    <>
      <Header />
      <ThinWidthContent>
        <PageTitle
          title={strings.termsOfUse}
          subtitle={strings.termsOfUseSubtitle}
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
