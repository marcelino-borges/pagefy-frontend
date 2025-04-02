import { Grid, Stack, useMediaQuery } from "@mui/material";
import images from "../../../../assets/img";
import {
  ANALYTICS_EVENTS,
  CAMPAIGN_ID_PARAM,
  CAMPAIGN_ORIGIN_PARAM,
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from "../../../../constants";
import Footer from "../../../components/footer";
import Navigation from "../../../components/navigation";
import FullWidthContent from "../../../components/site-content/full-width";
import {
  ImageBackground,
  MainHeader,
  MainSubHeader,
  Section2Container,
  PinkBGCheckIcon,
  PinkFloatingCircle,
  Section1BG,
  Section1Container,
  Section1Subtitle,
  Section1Title,
  SmallActressCard,
  Section2Title,
  Section3Container,
  Section3BG,
  Section3ShortLine,
  Section3Title,
  Section3InnerContainer,
  Actress1Image,
  Section3ShortLineWrapper,
} from "./style";
import CustomButton from "./../../../components/button-custom/index";
import {
  COMPLEMENTARY_COLOR,
  COMPLEMENTARY_COLOR_DARK,
  PRIMARY_COLOR,
} from "../../../../styles/colors";
import PAGES_ROUTES from "../../../../routes/paths";
import { PRIMARY_COLOR_DARK } from "./../../../../styles/colors";
import { Icon } from "@iconify/react";
import TriplePageTitle from "../../../components/page-title";
import CardIconTexts from "../../../components/card-icon-texts";
import SpeakerIcon from "../../../../assets/icons/custom-icons/speaker";
import PencilIcon from "../../../../assets/icons/custom-icons/pencil";
import ShareIcon from "../../../../assets/icons/custom-icons/share";
import PlansCards2 from "../../../components/plans-cards2";
import TestimonialsSlidy from "../../../components/user-testimonials-slidy";
import strings from "../../../../localization";
import Meta from "../../../components/meta";
import { useEffect } from "react";
import { logAnalyticsEvent } from "../../../../services/firebase-analytics";
import { useSearchParams } from "react-router-dom";
import { logPixelCustomEvent } from "../../../../services/pixel";

const Home2 = () => {
  const isSmallerThan900 = useMediaQuery("(max-width: 900px");
  const [searchParams] = useSearchParams();
  const campaignIdParam = searchParams.get(CAMPAIGN_ID_PARAM);
  const campaignOriginParam = searchParams.get(CAMPAIGN_ORIGIN_PARAM);

  const Section2Chip = ({ items }: { items: string[] }) => (
    <Stack
      direction={isSmallerThan900 ? "column" : "row"}
      justifyContent="center"
      alignItems="center"
      gap={isSmallerThan900 ? "32px" : "80px"}
    >
      {items.map((item: string) => (
        <Stack direction="row" gap="8px" alignItems="center" key={item}>
          <Icon icon="akar-icons:check" color={PRIMARY_COLOR} fontSize="22px" />
          <span style={{ fontWeight: "600" }}>{item}</span>
        </Stack>
      ))}
    </Stack>
  );

  useEffect(() => {
    logAnalyticsEvent(ANALYTICS_EVENTS.pageView, {
      page_path: PAGES_ROUTES.root,
      page_title: "Home 2",
    });
  }, []);

  useEffect(() => {
    if (campaignIdParam?.length && campaignOriginParam?.length) {
      logPixelCustomEvent(`campaign_${campaignIdParam}`, {
        location: "home2",
        campaignId: campaignIdParam,
        origin: campaignOriginParam,
      });
    }
  }, [campaignIdParam, campaignOriginParam]);

  return (
    <>
      <Meta
        lang={strings.getLanguage()}
        locale={strings.getInterfaceLanguage()}
        title={strings.appName}
        description={strings.appDescription}
        image={images.screenshots.home}
      />
      <Navigation variant="sticky" />
      <FullWidthContent pt="0px">
        <ImageBackground
          src={isSmallerThan900 ? images.bg1home2Mobile : images.bg1home2}
        />
        <Stack
          direction={isSmallerThan900 ? "column" : "row"}
          mt="50px"
          pt={isSmallerThan900 ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT_DESKTOP}
          mb="150px"
          gap="32px"
        >
          <Grid pt={isSmallerThan900 ? "0px" : "30px"}>
            <Stack direction="column" gap="32px">
              <MainHeader item>{strings.home2.mainHeader}</MainHeader>
              <MainSubHeader item>{strings.home2.mainSubheader}</MainSubHeader>
              <Grid item>
                <CustomButton
                  w="fit-content"
                  bgColor={PRIMARY_COLOR}
                  fontColor="white"
                  hoverBgColor={PRIMARY_COLOR_DARK}
                  to={PAGES_ROUTES.signUp}
                >
                  {strings.home2.buttonCreateFreeAccount}
                </CustomButton>
              </Grid>
            </Stack>
          </Grid>
          <Grid
            position="relative"
            pr={isSmallerThan900 ? "0px" : "32px"}
            minWidth="50%"
          >
            <Actress1Image src={images.actress1} alt="Actress" />
            <PinkFloatingCircle />
            <SmallActressCard
              direction="row"
              flexWrap="nowrap"
              gap="16px"
              alignItems="center"
            >
              <Stack justifyContent="center">
                <PinkBGCheckIcon>
                  <Icon
                    fontSize="38px"
                    color="white"
                    icon="akar-icons:circle-check"
                  />
                </PinkBGCheckIcon>
              </Stack>
              <Stack direction="column">
                <div style={{ fontWeight: "500" }}>
                  {strings.home2.areYouGonnaLoseIt}
                </div>
                <div>
                  {`${strings.home2.subscriptionFree[0]} `}
                  <strong>{strings.freePlan.name}</strong>
                  {` ${strings.home2.subscriptionFree[1]}`}
                </div>
              </Stack>
            </SmallActressCard>
          </Grid>
        </Stack>

        <Grid container mb="80px">
          <TriplePageTitle increasingSize titles={strings.home2.tripleTitles} />
        </Grid>

        <CardIconTexts
          cards={[
            {
              icon: <SpeakerIcon></SpeakerIcon>,
              title: strings.home2.iconTextCards[0].title,
              subtitle: strings.home2.iconTextCards[0].subtitle,
            },

            {
              icon: <PencilIcon></PencilIcon>,
              title: strings.home2.iconTextCards[1].title,
              subtitle: strings.home2.iconTextCards[1].subtitle,
            },
            {
              icon: <ShareIcon></ShareIcon>,
              title: strings.home2.iconTextCards[2].title,
              subtitle: strings.home2.iconTextCards[2].subtitle,
            },
          ]}
        />
      </FullWidthContent>

      <Section1Container
        flexWrap="nowrap"
        direction={isSmallerThan900 ? "column" : "row"}
        alignItems={isSmallerThan900 ? "center" : "unset"}
      >
        <Section1BG />
        <img
          src={images.actress2}
          width="100%"
          style={{ maxWidth: "390px" }}
          alt="Actress"
        />
        <Stack
          direction="column"
          gap="16px"
          alignItems={isSmallerThan900 ? "center" : "unset"}
          textAlign={isSmallerThan900 ? "center" : "unset"}
        >
          <Section1Title>{strings.home2.section1.title}</Section1Title>
          <Section1Subtitle>{strings.home2.section1.subtitle}</Section1Subtitle>
          <CustomButton
            bgColor={COMPLEMENTARY_COLOR}
            fontColor="white"
            hoverBgColor={COMPLEMENTARY_COLOR_DARK}
            style={{ width: "fit-content" }}
            to={PAGES_ROUTES.signUp}
          >
            {`${strings.home2.section1.button[0]} `}
            {strings.freePlan.name}
            {` ${strings.home2.section1.button[1]}`}
          </CustomButton>
        </Stack>
      </Section1Container>

      <Section2Container direction="column">
        <Section2Title>{strings.home2.section2.title}</Section2Title>
        <Section2Chip items={strings.home2.section2.chips} />
      </Section2Container>

      <PlansCards2
        pt={isSmallerThan900 ? "50px" : "100px"}
        pb="100px"
        pl="24px"
        pr="24px"
      />

      <Section3Container direction="column" alignItems="center">
        <Section3BG />
        <Section3InnerContainer direction="column">
          <Section3ShortLineWrapper>
            <Section3ShortLine />
          </Section3ShortLineWrapper>
          <Section3Title>{strings.home2.section3.title}</Section3Title>
        </Section3InnerContainer>
        <TestimonialsSlidy language={strings.getLanguage()} />
      </Section3Container>

      <Footer />
    </>
  );
};

export default Home2;
