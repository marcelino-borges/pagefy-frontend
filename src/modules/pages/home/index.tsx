import { Grid, useMediaQuery } from "@mui/material";
import Header from "../../components/header";
import RecomendedCard from "./../../components/feature-card/index";
import strings from "../../../localization";
import CustomButton from "../../components/button-custom/index";
import routes from "./../../../routes/paths";
import { useDispatch } from "react-redux";
import { setPurchaseValue } from "../../../store/purchase/actions";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useEffect, useState } from "react";
import { clearLoading } from "../../../store/shared/actions";
import FullWidthContent from "../../components/site-content/full-width";
import homeImages, { IHomepageBanner } from "../../../assets/img/home/home";
import { getRandomIntInRange } from "../../../utils";
import { DEEP_DARK_GREEN, PRIMARY_COLOR } from "./../../../styles/colors";
import Footer from "../../components/footer";

const Home = () => {
  const dispatch = useDispatch();
  const [banner, setBanner] = useState<IHomepageBanner>(
    homeImages.desktopBanners[0]
  );

  const isSmallerThan400 = useMediaQuery("(max-width: 400px");
  const isSmallerThan600 = useMediaQuery("(max-width: 600px");
  const isSmallerThan900 = useMediaQuery("(max-width: 900px");

  const getRandomBanner = useCallback(() => {
    const banners: IHomepageBanner[] = isSmallerThan600
      ? homeImages.mobileBanners
      : homeImages.desktopBanners;
    const sortedIndex = getRandomIntInRange(0, banners.length - 1);
    return banners[sortedIndex];
  }, [isSmallerThan600]);

  const setBackgroundImage = () => {
    document.body.style.backgroundImage = `url(${homeImages.bgImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
  };

  const clearBackgroundImage = () => {
    document.body.style.backgroundImage = `unset`;
    document.body.style.backgroundSize = "unset";
    document.body.style.backgroundPosition = "unset";
    document.body.style.backgroundAttachment = "unset";
  };

  useEffect(() => {
    setBackgroundImage();

    return () => {
      clearBackgroundImage();
    };
  }, []);

  useEffect(() => {
    dispatch(clearLoading());
    setBackgroundImage();
  }, [dispatch]);

  useEffect(() => {
    const sortedBanner = getRandomBanner();
    setBanner(sortedBanner);
  }, [getRandomBanner, isSmallerThan400, isSmallerThan600, isSmallerThan900]);

  return (
    <>
      <Header />
      <FullWidthContent
        style={{
          paddingLeft: "0px",
          paddingRight: "0px",
          transform: "translateY(-30px)",
          paddingTop: "0px",
          marginTop: isSmallerThan900 ? "8vw" : "150px",
          position: "relative",
        }}
      >
        {/* BANNER */}
        <Grid container bgcolor="white">
          <span style={{ position: "relative" }}>
            <img
              src={banner?.path}
              style={{
                width: "100%",
                height: "auto",
                zIndex: -1,
              }}
              alt="Banner desktop"
            />
            <Grid
              container
              style={{
                position: "absolute",
                top: !isSmallerThan600 ? 0 : "unset",
                bottom: isSmallerThan600 ? 0 : "unset",
                zIndex: 100,
                fontWeight: 600,
                color: "white",
                textShadow: "2px 2px 2px black",
                padding: "7% 32px",
                height: "70%",
              }}
              fontSize={
                isSmallerThan400 ? "0.8em" : isSmallerThan600 ? "1.2em" : "2em"
              }
              direction="column"
              justifyContent={isSmallerThan600 ? "center" : "flex-start"}
              wrap="nowrap"
            >
              <Grid container fontSize="1.5em">
                {strings.createNowYour}
              </Grid>
              <Grid container alignItems="baseline">
                <Grid item fontSize="1.5em" color={PRIMARY_COLOR} pr="4px">
                  {strings.bio.toUpperCase()}
                </Grid>
                <Grid item>{strings.forYourSocialMedia}</Grid>
              </Grid>
              <Grid container alignItems="baseline">
                <Grid item pr="4px">
                  {strings.or}
                </Grid>
                <Grid item fontSize="1.5em" color={PRIMARY_COLOR}>
                  {strings.landingPage.toUpperCase()}
                </Grid>
              </Grid>
              <Grid container>{strings.forYourProductOrBusiness}</Grid>
              <Grid container fontSize="0.75em !important" pt="5%">
                {strings.dependOnNoneToReleaseCreativity}
                <br />
                {strings.haveAccessToPremiumResources}
                <br />
                {strings.differentiate}
              </Grid>
            </Grid>
          </span>
        </Grid>

        {/* FEATURED CARDS */}
        <Grid
          container
          direction={isSmallerThan600 ? "column" : "row"}
          style={{
            transform: "translateY(-31px)",
          }}
          zIndex={100}
        >
          <RecomendedCard
            item
            sm={!isSmallerThan600 ? 4 : undefined}
            overTitle={strings.plan}
            title={strings.freePlan.name.toUpperCase()}
          >
            <Grid container justifyContent="center">
              <ul>
                {strings.freePlan.benefits.map((benefit: string) => (
                  <li key={uuidv4()}>{benefit}</li>
                ))}
              </ul>
            </Grid>
            <Grid container justifyContent="center">
              <CustomButton to={routes.signUp}>{strings.signUp}</CustomButton>
            </Grid>
          </RecomendedCard>
          <RecomendedCard
            item
            sm={!isSmallerThan600 ? 4 : undefined}
            recomendedText={strings.recomended}
            overTitle={strings.plan}
            title={strings.vipPlan.name.toUpperCase()}
          >
            <Grid container justifyContent="center">
              <ul>
                {strings.freePlan.benefits.map((benefit: string) => (
                  <li key={uuidv4()}>{benefit}</li>
                ))}
                {strings.vipPlan.benefits.map((benefit: string) => (
                  <li key={uuidv4()}>{benefit}</li>
                ))}
              </ul>
            </Grid>
            <Grid container justifyContent="center">
              <CustomButton
                to={routes.signUp}
                onClick={() => dispatch(setPurchaseValue(149.9))}
              >
                {strings.purchase}
              </CustomButton>
            </Grid>
            <Grid container justifyContent="center" fontSize="0.85em" pt="8px">
              <i>
                {strings.currency} 149.90/{strings.year}
              </i>
            </Grid>
          </RecomendedCard>
          <RecomendedCard
            item
            sm={!isSmallerThan600 ? 4 : undefined}
            overTitle={strings.plan}
            title={strings.platinumPlan.name.toUpperCase()}
          >
            <Grid container justifyContent="center">
              <ul>
                {strings.freePlan.benefits.map((benefit: string) => (
                  <li key={uuidv4()}>{benefit}</li>
                ))}
                {strings.vipPlan.benefits.map((benefit: string) => (
                  <li key={uuidv4()}>{benefit}</li>
                ))}
                {strings.platinumPlan.benefits.map((benefit: string) => (
                  <li key={uuidv4()}>{benefit}</li>
                ))}
              </ul>
            </Grid>
            <Grid container justifyContent="center">
              <CustomButton
                to={routes.signUp}
                onClick={() => dispatch(setPurchaseValue(249.9))}
              >
                {strings.purchase}
              </CustomButton>
            </Grid>
            <Grid container justifyContent="center" fontSize="0.85em" pt="8px">
              <i>
                {strings.currency} 249.90/{strings.year}
              </i>
            </Grid>
          </RecomendedCard>
        </Grid>

        {/* LAST SECTION */}
        <Grid container direction={isSmallerThan600 ? "column" : "row"}>
          <Grid container alignItems="center" minHeight="500px">
            <Grid
              item
              xs={12}
              sm={!isSmallerThan600 ? 6 : undefined}
              textAlign={isSmallerThan600 ? "center" : "end"}
              pr="8px"
              color="black"
              fontWeight={600}
            >
              <span
                style={{
                  fontSize: "2em",
                  lineHeight: "2",
                }}
              >
                {strings.createNowYour} {strings.bio}
                <br />
                {strings.or} {strings.landingPage}
                <br />
                {strings.andWinAVipPlanFor}
                <br />
              </span>
              <span
                style={{
                  fontSize: "3.5em",
                  fontWeight: "600",
                  color: "white",
                  textShadow:
                    "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                }}
              >
                30 {strings.days}
              </span>
            </Grid>
            <Grid
              item
              xs={12}
              sm={!isSmallerThan600 ? 6 : undefined}
              textAlign="center"
            >
              <CustomButton
                to={routes.signUp}
                bgColor={PRIMARY_COLOR}
                fontColor={"white"}
                hoverFontColor={"white"}
                hoverBgColor={DEEP_DARK_GREEN}
                w="150px"
              >
                {strings.signUp}
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </FullWidthContent>
      <Footer />
    </>
  );
};

export default Home;
