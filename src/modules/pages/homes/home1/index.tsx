import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, useMediaQuery } from "@mui/material";
import Navigation from "../../../components/navigation";
import strings from "../../../../localization";
import routes from "../../../../routes/paths";
import { clearLoading } from "../../../../store/shared/actions";
import FullWidthContent from "../../../components/site-content/full-width";
import homeImages, { IHomepageBanner } from "../../../../assets/img/home/home";
import { getRandomIntInRange } from "../../../../utils";
import { GLOBAL_LIGHT_BG, PRIMARY_COLOR } from "../../../../styles/colors";
import Footer from "../../../components/footer";
import {
  BannerContainer,
  BannerOverlay,
  CreateYourBio,
  PromoDuration,
  SignupButton,
  SignUpSection,
  TestimonialsSection,
} from "./style";
import { clearBackgroundImage, setBackgroundImage } from "./utils";
import UserTestimonialCard from "../../../components/user-testimonial-card";
import TriplePageTitle from "../../../components/page-title";
import PlansCards1 from "../../../components/plans-cards1";
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from "../../../../constants";

const Home1 = () => {
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

  useEffect(() => {
    setBackgroundImage(document, homeImages.bgImage);

    return () => {
      clearBackgroundImage(document);
    };
  }, []);

  useEffect(() => {
    dispatch(clearLoading());
  }, [dispatch]);

  useEffect(() => {
    const sortedBanner = getRandomBanner();
    setBanner(sortedBanner);
  }, [getRandomBanner, isSmallerThan400, isSmallerThan600, isSmallerThan900]);

  return (
    <>
      <Navigation />
      <FullWidthContent
        pl="0px"
        pr="0px"
        pt={isSmallerThan900 ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT_DESKTOP}
      >
        {/* BANNER */}
        <Grid container bgcolor="white">
          <BannerContainer imageUrl={banner.path}>
            <BannerOverlay>
              <Grid container fontSize="1.5em">
                {strings.createNowYour}
              </Grid>
              <Grid container alignItems="baseline">
                <Grid fontSize="1.5em" color={PRIMARY_COLOR} pr="4px">
                  {strings.page.toUpperCase()}
                </Grid>
                <Grid>{strings.forYourSocialMedia}</Grid>
              </Grid>
              <Grid container alignItems="baseline">
                <Grid pr="4px">{strings.or}</Grid>
                <Grid fontSize="1.5em" color={PRIMARY_COLOR}>
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
            </BannerOverlay>
          </BannerContainer>
        </Grid>

        {/* PLANS FEATURED CARDS */}
        <PlansCards1 py="70px" />

        {/* LAST SECTION */}
        <SignUpSection container direction="column">
          <CreateYourBio item>
            {strings.createNowYour} {strings.page}
            <br />
            {strings.or} {strings.landingPage}
            <br />
            {strings.andWinAVipPlanFor}
            <br />
          </CreateYourBio>
          <PromoDuration item>30 {strings.days}</PromoDuration>
          <Grid container justifyContent="center">
            <SignupButton to={routes.signUp}>{strings.clickHere}</SignupButton>
          </Grid>
        </SignUpSection>
        <Grid
          container
          bgcolor={GLOBAL_LIGHT_BG}
          p="32px"
          pt="64px"
          justifyContent="center"
        >
          <Grid container direction="column" alignItems="center">
            <TriplePageTitle
              titles={[
                strings.testimonials.testimonialsTitle,
                strings.testimonials.testimonialsSubtitle,
                "",
              ]}
              baseSize={2}
              colors={["#000", "grey", "#000"]}
              textAlign="center"
            />
          </Grid>
          <TestimonialsSection>
            <UserTestimonialCard
              userPictureUrl={
                "https://firebasestorage.googleapis.com/v0/b/socialbio-41362.appspot.com/o/users%2F632a0e935b549e00541d0dca%2Fuploaded-images%2F632a0e935b549e00541d0dca_20220929224637090.jpg?alt=media&token=b62fc3f1-afd1-415b-b68a-08a784aef174"
              }
              testimonial={
                "Desde que comecei a utilizar a Pagefy minha vida mudou completamente, pois consegui dar um pontapé da minha visibilidade na internet."
              }
              userName={"Marcelino Borges"}
              userProfession={"Engenheiro"}
              userCompany={"Kneat Solutions"}
            />
            <UserTestimonialCard
              userPictureUrl={
                "https://firebasestorage.googleapis.com/v0/b/socialbio-41362.appspot.com/o/users%2F6334a75bc4f9bf00556bb03f%2Fuploaded-images%2F6334a75bc4f9bf00556bb03f_20220930100913209.jpg?alt=media&token=63c4725d-72f0-45b8-a678-f3c95148bada"
              }
              testimonial={
                "A Pagefy fez a diferença para meus clientes. Agora posso criar bios de forma muito mais fácil e ágil!"
              }
              userName={"Neto Torres"}
              userProfession={"Designer"}
              userCompany={"Agency Midias"}
            />
            <UserTestimonialCard
              userPictureUrl={
                "https://firebasestorage.googleapis.com/v0/b/socialbio-41362.appspot.com/o/test%2Fluana_perfil.png?alt=media&token=6cdbf1d2-b880-4114-bc93-685404dc3a9c"
              }
              testimonial={
                "Agora tenho uma ferramenta fácil de usar, que resolve meus problemas sem eu precisar sofrer"
              }
              userName={"Luana Borges"}
              userProfession={"Avogada"}
              userCompany={"LN Advocacia"}
            />
          </TestimonialsSection>
        </Grid>
      </FullWidthContent>
      <Footer />
    </>
  );
};

export default Home1;
