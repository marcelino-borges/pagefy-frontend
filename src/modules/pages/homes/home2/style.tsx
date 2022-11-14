import { Grid, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { COMPLEMENTARY_COLOR, PRIMARY_COLOR } from "../../../../styles/colors";

export const ImageBackground = styled("img")`
  position: absolute;
  width: 100%;
  opacity: 0.5;
  z-index: -1;
  left: -16px;
`;

export const MainHeader = styled(Grid)`
  font-size: 4em;
  font-weight: 800;
  line-height: 86px;
  text-size-adjust: auto;
`;

export const MainSubHeader = styled(Grid)`
  font-size: 1.25em;
  font-weight: 400;
  line-height: 28px;
  text-size-adjust: auto;
`;

export const PinkFloatingCircle = styled(Grid)`
  position: absolute;
  bottom: -50px;
  right: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${COMPLEMENTARY_COLOR};
  animation-name: PinkFloatingCircleAnimation;
  animation-duration: 1s;
  animation-delay: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;

  @keyframes PinkFloatingCircleAnimation {
    0% {
      transform: translateX(0px);
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    50% {
      transform: translateX(-10px);
      width: 120px;
      height: 70px;
      border-radius: 50px;
    }
    60% {
      transform: translateX(0px);
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    70% {
      transform: translateX(-8px);
    }
    80% {
      transform: translateX(0px);
    }
    90% {
      transform: translateX(-4px);
    }
    100% {
      transform: translateX(0px);
    }
  }

  @media (max-width: 1143px) {
    display: none;
  }
`;

export const Actress1Image = styled("img")`
  width: 100%;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const SmallActressCard = styled(Stack)`
  position: absolute;
  right: 0;
  top: 150px;
  background-color: #ffffff;
  border-radius: 10px;
  z-index: 4;
  padding: 16px;
`;

export const PinkBGCheckIcon = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${COMPLEMENTARY_COLOR};
  width: 46px;
  height: 46px;
`;

export const Section1Container = styled(Stack)`
  position: relative;
  width: 100%;
  padding: 0px 32px 0px 32px;
  margin-top: 150px;
  padding-left: 32px;
  gap: 15%;

  @media (max-width: 900px) {
    padding: 0px 24px 24px 24px;
    gap: 0px;
  }

  @media (max-width: 400px) {
    padding: 0px 8px 8px 8px;
  }
`;

export const Section1BG = styled("div")`
  position: absolute;
  top: 5px;
  left: 0;
  width: 100%;
  height: 76%;
  background-color: ${PRIMARY_COLOR}25;
  z-index: -1;

  @media (max-width: 900px) {
    height: 100%;
  }
`;

export const Section1Title = styled("div")`
  margin-top: 65px;
  font-weight: 700;
  line-height: 1.6em;
  font-size: 2.3em;
`;

export const Section1Subtitle = styled("div")`
  line-height: 2em;
  font-size: 1em;
  margin-bottom: 16px;
`;

export const Section2Container = styled(Stack)`
  line-height: 1.6em;
  font-size: 1em;
  margin-top: 150px;
  width: 100%;
`;

export const Section2Title = styled("div")`
  line-height: 1.6em;
  font-size: 3em;
  font-weight: 800;
  text-align: center;
  margin-bottom: 16px;
`;

export const Section3Container = styled(Stack)`
  position: relative;
  width: 100%;
  padding: 0px 32px 0px 32px;
  margin-top: 80px;
  margin-bottom: 150px;
  gap: 15%;

  @media (max-width: 900px) {
    padding: 0px 24px 24px 24px;
    gap: 15%;
  }

  @media (max-width: 400px) {
    padding: 0px 8px 8px 8px;
  }
`;

export const Section3InnerContainer = styled(Stack)`
  max-width: 50vw;
  padding-top: 68px;
  padding-bottom: 68px;
  overflow: hidden;

  @media (max-width: 900px) {
    max-width: 100%;
    margin-left: 0px;
  }
`;

export const Section3BG = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: 60%;
  height: 100%;
  background-color: ${PRIMARY_COLOR}25;
  z-index: -1;
  border-radius: 0px 10px 10px 0px;

  @media (max-width: 900px) {
    width: 100%;
    border-radius: 0px;
  }
`;
export const Section3ShortLineWrapper = styled("div")`
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const getSection3ShortlineKeyframes = (smallerThan900: boolean) => `
  @keyframes Section3ShortLineAnimation {
    0% {
      transform: translateX(0px);
      width: 67px;
      height: 8px;
      border-radius: 4px;
    }
    25% {
      width: 100px;
      height: 6px;
      border-radius: 8px;
    }
    50% {
      transform: translateX(${
        !smallerThan900 ? "calc(50vw - 70px)" : "calc(100vw - 134px)"
      });
      width: 67px;
      height: 8px;
      border-radius: 4px;
    }
    75% {
      width: 100px;
      height: 6px;
      border-radius: 8px;
    }
    100% {
      transform: translateX(0px);
      width: 67px;
      height: 8px;
      border-radius: 4px;
    }
  }
`;

export const Section3ShortLine = styled("div")`
  width: 67px;
  height: 8px;
  background-color: ${COMPLEMENTARY_COLOR};
  border-radius: 4px;
  margin-bottom: 8px;
  animation-name: Section3ShortLineAnimation;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;

  @media (min-width: 901px) {
    ${getSection3ShortlineKeyframes(false)}
  }

  @media (max-width: 900px) {
    ${getSection3ShortlineKeyframes(true)}
  }
`;

export const Section3Title = styled("div")`
  font-size: 3em;
  font-weight: 700;
`;
