import Navigation from "../../components/navigation";
import FullWidthContent from "./../../components/site-content/full-width";
import TriplePageTitle from "./../../components/page-title/index";
import strings from "../../../localization";
import PlansCards2 from "../../components/plans-cards2";
import { useMediaQuery } from "@mui/material";

const PlansPage = () => {
  const isSmallerThan900 = useMediaQuery("(max-width: 900px");

  return (
    <>
      <Navigation />
      <FullWidthContent pt="132px">
        <TriplePageTitle
          titles={[
            strings.youAreSpecial,
            strings.getAPlanNow,
            strings.checkOurPlans,
          ]}
          sizes={[1, 2, 1]}
          increasingSize
        />
        <PlansCards2
          pt={isSmallerThan900 ? "50px" : "100px"}
          pb="100px"
          pl="24px"
          pr="24px"
        />
      </FullWidthContent>
    </>
  );
};

export default PlansPage;
