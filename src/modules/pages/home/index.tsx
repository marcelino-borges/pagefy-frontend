import { Grid, useMediaQuery } from "@mui/material";
import images from "../../../assets/img";
import Header from "../../components/header";
import DashboardContent from "./../../components/site-content/index";
import RecomendedCard from "./../../components/feature-card/index";
import strings from "../../../localization";
import Section1 from "./../../components/section1/index";
import ButtonWhite from "./../../components/button-white/index";
import routes from "./../../../routes/paths";

const Home = () => {
  const isSmallerThan600 = useMediaQuery("(max-width: 600px");
  const isSmallerThan900 = useMediaQuery("(max-width: 900px");

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
        <Grid container>
          <img
            src={
              isSmallerThan600 ? images.bannerMobile1 : images.bannerDesktop1
            }
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="Banner desktop"
          />
        </Grid>
        <Grid container direction={isSmallerThan600 ? "column" : "row"}>
          <RecomendedCard
            item
            sm={!isSmallerThan600 ? 4 : undefined}
            overTitle="Plano"
            title="GRÁTIS"
          >
            <ul>
              <li>Gerencie múltiplas páginas na mesma conta</li>
              <li>Até 2 páginas</li>
              <li>Componentes ilimitados</li>
            </ul>
          </RecomendedCard>
          <RecomendedCard
            item
            sm={!isSmallerThan600 ? 4 : undefined}
            recomendedText={strings.recomended}
            overTitle="Plano"
            title="VIP"
          >
            <ul>
              <li>Será que daqui pra 2023 Netinho e Andrew definem isso?</li>
              <li>Será que daqui pra 2023 Netinho e Andrew definem isso?</li>
              <li>Será que daqui pra 2023 Netinho e Andrew definem isso?</li>
            </ul>
          </RecomendedCard>
          <RecomendedCard
            item
            sm={!isSmallerThan600 ? 4 : undefined}
            overTitle="Plano"
            title="PLATINUM"
          >
            <ul>
              <li>Será que daqui pra 2023 Netinho e Andrew definem isso?</li>
              <li>Será que daqui pra 2023 Netinho e Andrew definem isso?</li>
              <li>Será que daqui pra 2023 Netinho e Andrew definem isso?</li>
            </ul>
          </RecomendedCard>
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
                  Crie sua página agora
                  <br />e ganhe um plano VIP por
                  <br />
                </span>
                <span
                  style={{
                    fontSize: "3.5em",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  30 dias
                </span>
              </Grid>
              <Grid
                item
                xs={12}
                sm={!isSmallerThan600 ? 6 : undefined}
                textAlign="center"
              >
                <ButtonWhite to={routes.signUp}>Cadastre-se</ButtonWhite>
              </Grid>
            </Grid>
          </Section1>
        </Grid>
      </DashboardContent>
    </>
  );
};

export default Home;
