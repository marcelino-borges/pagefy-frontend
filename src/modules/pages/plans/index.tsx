import Header from "../../components/header";
import PlansCards from "../../components/plans-cards";
import PrivateRouteChecker from "../../components/private-route-checker";
import FullWidthContent from "./../../components/site-content/full-width";
import TriplePageTitle from "./../../components/page-title/index";
import strings from "../../../localization";

const PlansPage = () => {
  return (
    <>
      <PrivateRouteChecker />
      <Header />
      <FullWidthContent>
        <TriplePageTitle
          titles={[
            strings.youAreSpecial,
            strings.getAPlanNow,
            strings.checkOurPlans,
          ]}
          sizes={[1, 2, 1]}
          increasingSize
        />
        <PlansCards px="0px" />
      </FullWidthContent>
    </>
  );
};

export default PlansPage;
