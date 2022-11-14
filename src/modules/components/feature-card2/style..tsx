import { styled } from "@mui/material";
import { COMPLEMENTARY_COLOR, PRIMARY_COLOR } from "../../../styles/colors";

export const CardRoot = styled(({ isFeatured, ...props }: any) => (
  <div {...props} />
))(
  ({ isFeatured }) => `
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis 0;
  ${isFeatured && `box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);`}
  border-radius: 10px;
  ${isFeatured && `border: 1px solid ${PRIMARY_COLOR};`}
  z-index: 900;

  width: calc(33% - 96px);

  @media (max-width: 900px) {
    width: 100%;
  }
`
);

export const CardInner = styled(({ ...props }: any) => <div {...props} />)`
  line-height: 1.8em;
`;

export const FeaturedOverlayContainer = styled("div")`
  position: absolute;
  display: flex;
  background-size: cover;
  z-index: 901;
  right: -50px;
  top: -10px;
  width: 150px;
  height: 150px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    top: -20px;
    right: calc(50% - 190px);
    width: 120px;
    height: 120px;
  }

  @media (max-width: 400px) {
    right: calc(50% - 155px);
  }

  @media (max-width: 310px) {
    right: calc(50% - 75px);
    top: 5px;
  }
`;

export const FeaturedOverlayText = styled("div")`
  transform: rotate(-9deg) translate(-88px, -62px);
  color: ${COMPLEMENTARY_COLOR};
  font-family: "Brushot";
  font-size: 1.7em;
  text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff,
    2px 2px 0 #fff;

  @media (max-width: 1000px) {
    transform: rotate(-9deg) translate(-39px, -48px);
    font-size: 1.3em;
  }

  @media (max-width: 900px) {
    transform: rotate(-9deg) translate(-58px, -34px);
  }

  @media (max-width: 400px) {
    transform: rotate(-9deg) translate(-21px, 3px);
    font-size: 1.1em;
  }

  @media (max-width: 310px) {
    transform: rotate(0) translate(0, 0);
  }
`;

export const FeaturedOverlayArrow = styled("img")`
  transform: rotate(180deg) translate(26px, 51px) scaleX(-1);
  width: 30px;

  @media (max-width: 1000px) {
    transform: rotate(180deg) translate(-15px, 50px) scaleX(-1);
  }

  @media (max-width: 900px) {
    transform: rotate(180deg) translate(10px, 24px) scaleX(-1);
  }

  @media (max-width: 400px) {
    transform: rotate(180deg) translate(-21px, 6px) scaleX(-1);
    width: 20px;
  }

  @media (max-width: 310px) {
    display: none;
  }
`;
