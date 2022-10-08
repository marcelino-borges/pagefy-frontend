import { styled } from "@mui/material";
import { PRIMARY_COLOR } from "./../../../styles/colors";

export const CardRoot = styled(({ isFeatured, ...props }: any) => (
  <div {...props} />
))(
  ({ isFeatured }) => `
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis 0;
  box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
  border-radius: 10px;
  background-color: white;
  ${isFeatured && `border: 2px solid ${PRIMARY_COLOR};`}
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
  transform: rotate(20deg) translate(-5px, 0);
  color: #cb3500;
  font-family: "Brushot";
  font-size: 1.7em;
  text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff,
    2px 2px 0 #fff;

  @media (max-width: 1000px) {
    transform: rotate(20deg) translate(10px, 10px);
    font-size: 1.3em;
  }

  @media (max-width: 400px) {
    font-size: 1.1em;
  }

  @media (max-width: 310px) {
    transform: rotate(0) translate(0, 0);
  }
`;

export const FeaturedOverlayArrow = styled("img")`
  transform: rotate(140deg) translate(0, 40px);
  width: 100px;

  @media (max-width: 1000px) {
    transform: rotate(140deg) translate(5px, 10px);
    width: 80px;
  }

  @media (max-width: 400px) {
    width: 60px;
  }

  @media (max-width: 310px) {
    display: none;
  }
`;
