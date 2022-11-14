import Navigation from "../../components/navigation";
import PlansCards1 from "../../components/plans-cards1";
import PrivateRouteChecker from "../../components/private-route-checker";
import FullWidthContent from "./../../components/site-content/full-width";
import TriplePageTitle from "./../../components/page-title/index";
import strings from "../../../localization";

const PlansPage = () => {
  return (
    <>
      <PrivateRouteChecker />
      <Navigation />
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
        <PlansCards1 px="0px" />
      </FullWidthContent>
    </>
  );
};

export default PlansPage;
