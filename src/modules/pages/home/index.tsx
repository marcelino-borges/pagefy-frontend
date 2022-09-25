import { Grid, useMediaQuery } from "@mui/material";
import images from "../../../assets/img";
import Header from "../../components/header";
import DashboardContent from "./../../components/site-content/index";
import RecomendedCard from "./../../components/feature-card/index";
import strings from "../../../localization";
import Section1 from "./../../components/section1/index";
import ButtonWhite from "./../../components/button-white/index";
import routes from "./../../../routes/paths";
import { DEEP_DARK_GREEN } from "../../../styles/colors";
import { useDispatch } from "react-redux";
import { setPurchaseValue } from "../../../store/purchase/actions";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { clearLoading } from "../../../store/shared/actions";

const Home = () => {
  const dispatch = useDispatch();

  const isSmallerThan400 = useMediaQuery("(max-width: 400px");
  const isSmallerThan600 = useMediaQuery("(max-width: 600px");
  const isSmallerThan900 = useMediaQuery("(max-width: 900px");

  useEffect(() => {
    dispatch(clearLoading());
  }, [dispatch]);

  return (
    <>
      <Header />
      <DashboardContent
        style={{
          backgroundColor: "white",
          paddingLeft: "0px",
          paddingRight: "0px",
          transform: "translateY(-30px)",
          paddingTop: "0px",
          marginTop: isSmallerThan900 ? "14vw" : "150px",
          position: "relative",
        }}
      >
        {/* BANNER */}
        <Grid container>
          <span style={{ position: "relative" }}>
            <img
              src={
                isSmallerThan600 ? images.bannerMobile1 : images.bannerDesktop1
              }
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
                color: DEEP_DARK_GREEN,
                padding: "7% 32px",
                height: "70%",
              }}
              fontSize={isSmallerThan400 ? "0.8em" : "1.2em"}
              direction="column"
              justifyContent={isSmallerThan600 ? "center" : "flex-start"}
              wrap="nowrap"
            >
              <Grid container fontSize="1.5em">
                {strings.createNowYour}
              </Grid>
              <Grid container alignItems="baseline">
                <Grid item fontSize="1.5em" color="white" pr="4px">
                  {strings.bio.toUpperCase()}
                </Grid>
                <Grid item>{strings.forYourSocialMedia}</Grid>
              </Grid>
              <Grid container alignItems="baseline">
                <Grid item pr="4px">
                  {strings.or}
                </Grid>
                <Grid item fontSize="1.5em" color="white">
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
          pt="32px"
          pb="50px"
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
              <ButtonWhite to={routes.signUp}>{strings.signUp}</ButtonWhite>
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
              <ButtonWhite
                to={routes.signUp}
                onClick={() => dispatch(setPurchaseValue(149.9))}
              >
                {strings.purchase}
              </ButtonWhite>
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
            title={strings.premiumPlan.name.toUpperCase()}
          >
            <Grid container justifyContent="center">
              <ul>
                {strings.freePlan.benefits.map((benefit: string) => (
                  <li key={uuidv4()}>{benefit}</li>
                ))}
                {strings.vipPlan.benefits.map((benefit: string) => (
                  <li key={uuidv4()}>{benefit}</li>
                ))}
                {strings.premiumPlan.benefits.map((benefit: string) => (
                  <li key={uuidv4()}>{benefit}</li>
                ))}
              </ul>
            </Grid>
            <Grid container justifyContent="center">
              <ButtonWhite
                to={routes.signUp}
                onClick={() => dispatch(setPurchaseValue(249.9))}
              >
                {strings.purchase}
              </ButtonWhite>
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
          <Section1>
            <Grid container alignItems="center" minHeight="400px">
              <Grid
                item
                xs={12}
                sm={!isSmallerThan600 ? 6 : undefined}
                textAlign={isSmallerThan600 ? "center" : "end"}
                pr="8px"
              >
                <span
                  style={{
                    fontSize: "1.5em",
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
                    color: "white",
                    fontWeight: "600",
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
                <ButtonWhite to={routes.signUp}>{strings.signUp}</ButtonWhite>
              </Grid>
            </Grid>
          </Section1>
        </Grid>
      </DashboardContent>
    </>
  );
};

export default Home;
