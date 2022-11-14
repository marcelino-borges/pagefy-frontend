import { Grid, Stack, useMediaQuery } from "@mui/material";
import images from "../../../../assets/img";
import {
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
} from "./style";
import CustomButton from "./../../../components/button-custom/index";
import {
  COMPLEMENTARY_COLOR,
  COMPLEMENTARY_COLOR_DARK,
  PRIMARY_COLOR,
} from "../../../../styles/colors";
import routes from "../../../../routes/paths";
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

const Home2 = () => {
  const isSmallerThan900 = useMediaQuery("(max-width: 900px");
  const isSmallerThan1143 = useMediaQuery("(max-width: 1143px");

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

  return (
    <>
      <Navigation variant="sticky" />
      <FullWidthContent pt="0px">
        <ImageBackground
          src={isSmallerThan900 ? images.bg1home2Mobile : images.bg1home2}
        />
        <Grid
          container
          direction={isSmallerThan1143 ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
          mt="50px"
          gap="32px"
          pt={isSmallerThan900 ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT_DESKTOP}
          mb="150px"
        >
          <Grid item maxWidth="30%">
            <Stack direction="column" gap="32px">
              <MainHeader item>
                Tudo o que você faz. Simples e direto.
              </MainHeader>
              <MainSubHeader item>
                Mostre para o mundo o conteúdo que só você <br />
                sabe fazer.
              </MainSubHeader>
              <Grid item>
                <CustomButton
                  w="fit-content"
                  bgColor={PRIMARY_COLOR}
                  fontColor="white"
                  hoverBgColor={PRIMARY_COLOR_DARK}
                  to={routes.signUp}
                >
                  Criar minha conta grátis agora
                </CustomButton>
              </Grid>
            </Stack>
          </Grid>
          <Grid
            item
            borderRadius="50%"
            position="relative"
            pr={isSmallerThan900 ? "0px" : "32px"}
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
                <div style={{ fontWeight: "500" }}>Vai perder?</div>
                <div>
                  Ganhe assinatura <strong>PREMIUM</strong> vitalícia
                </div>
              </Stack>
            </SmallActressCard>
          </Grid>
        </Grid>

        <Grid container mb="80px">
          <TriplePageTitle
            increasingSize
            titles={[
              "Para você ou para sua empresa",
              "Recursos excelusivos e interativos",
            ]}
          />
        </Grid>

        <CardIconTexts
          cards={[
            {
              icon: <SpeakerIcon></SpeakerIcon>,
              title: "Mostre seus vídeos",
              subtitle:
                "Apresente seus vídeos mais importantes de uma forma rápida e simples",
            },

            {
              icon: <PencilIcon></PencilIcon>,
              title: "Customize cores e layout",
              subtitle:
                "Deixe sua bio com a sua cara, editre cores, imagens e componentes",
            },
            {
              icon: <ShareIcon></ShareIcon>,
              title: "Compartilhe onde quiser",
              subtitle:
                "Mostre para todos os seus seguires o conteúdo incrível que você tem!",
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
          <Section1Title>A melhor forma de compartilhar conteúdo</Section1Title>
          <Section1Subtitle>
            Acompanhe dados sobre seus links, agende eventos, mostre vídeos e
            direcione seu público para o conteúdo certo.
          </Section1Subtitle>
          <CustomButton
            bgColor={COMPLEMENTARY_COLOR}
            fontColor="white"
            hoverBgColor={COMPLEMENTARY_COLOR_DARK}
            style={{ width: "fit-content" }}
          >
            Ganhar minha assinatura PREMIUM vitalícia agora!
          </CustomButton>
        </Stack>
      </Section1Container>

      <Section2Container direction="column">
        <Section2Title>
          Gerencie todo o seu conteúdo de um só lugar.
        </Section2Title>
        <Section2Chip
          items={[
            "Teste gratuito de 30 dias",
            "Membros de equipe ilimitados",
            "Cancelar a qualquer momento",
          ]}
        />
      </Section2Container>

      <PlansCards2 />

      <Section3Container direction="column" alignItems="center">
        <Section3BG />
        <Section3InnerContainer direction="column">
          <Section3ShortLine />
          <Section3Title>
            O que nossos clientes falam sobre a gente?
          </Section3Title>
        </Section3InnerContainer>
        <TestimonialsSlidy locale={strings.getLanguage()} />
      </Section3Container>

      <Footer />
    </>
  );
};

export default Home2;
