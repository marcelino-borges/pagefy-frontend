import Navigation from "../../components/navigation";
import FullWidthContent from "./../../components/site-content/full-width";
import TriplePageTitle from "./../../components/page-title/index";
import strings from "../../../localization";
import PlansCards2 from "../../components/plans-cards2";
import { useMediaQuery } from "@mui/material";
import images from "../../../assets/img";
import { useRandomElementOnRender } from "../../../assets/hooks/use-random-image";
import { useEffect } from "react";
import { ANALYTICS_EVENTS } from "../../../constants";
import PAGES_ROUTES from "../../../routes/paths";
import { logAnalyticsEvent } from "../../../services/firebase-analytics";

const BANNER_HEIGHT = "65vh";

const PlansPage = () => {
  const isSmallerThan900 = useMediaQuery("(max-width: 900px");
  const { element } = useRandomElementOnRender(
    images.horizontalBanners.slice(1)
  );

  useEffect(() => {
    logAnalyticsEvent(ANALYTICS_EVENTS.pageView, {
      page_path: PAGES_ROUTES.plans,
      page_title: "Plans",
    });
  }, []);

  return (
    <>
      <Navigation />
      <div
        style={{
          marginTop: isSmallerThan900 ? "71px" : "101px",
          width: "100%",
          position: "fixed",
        }}
      >
        <img
          src={element}
          alt="Banner"
          style={{
            height: BANNER_HEIGHT,
            width: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <FullWidthContent
        sx={{
          backgroundColor: "#F7F9FC",
          marginTop: `calc(${BANNER_HEIGHT} + ${
            isSmallerThan900 ? "71px" : "101px"
          })`,
          paddingTop: "32px !important",
          borderRadius: "16px 16px 0 0",
        }}
      >
        <TriplePageTitle
          titles={[
            strings.youAreSpecial,
            strings.getAPlanNow,
            strings.checkOurPlans,
          ]}
          sizes={[1, 2, 1]}
          increasingSize
        />
        <PlansCards2 pt="50px" pb="100px" featuredCardIndex={2} />
      </FullWidthContent>
    </>
  );
};

export default PlansPage;
