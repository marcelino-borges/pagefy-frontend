import { Grid, styled } from "@mui/material";
import { GLOBAL_LIGHT_BG } from "../../../styles/colors";
import { Link } from "react-router-dom";
import { PRIMARY_COLOR } from "./../../../styles/colors";

export const FeaturedCardsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  background-color: ${GLOBAL_LIGHT_BG};
  gap: 16px;
  padding: 32px;

  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

export const BannerContainer = styled(
  ({ imageUrl, children, ...props }: any) => <span {...props}>{children}</span>
)(
  ({ imageUrl }) => `
  position: relative;
  width: 100%;
  height: calc(0.5625 * 100vw);
  background-image: url(${imageUrl});
  background-size: cover;
  box-shadow: 0 8px 16px rgb(18 38 63 / 16%);

  @media(max-width: 600px) {
    height: calc(100vw);
  }
`
);

export const BannerOverlay = styled(({ children, ...props }: any) => (
  <div {...props}>{children}</div>
))(
  () => `
  position: absolute;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  top: !isSmallerThan600 ? 0 : unset;
  bottom: isSmallerThan600 ? 0 : unset;
  z-index: 100;
  font-weight: 600;
  color: white;
  text-shadow: 2px 2px 2px black;
  padding: 7% 32px;
  height: 70%;

  @media(max-width: 300px) {
    padding-top: 20px;
    font-size: 0.8em;
  }

  @media(min-width: 301px) and (max-width: 400px) {
    padding-top: 50px;
    font-size: 1em;
  }

  @media(min-width: 401px) and (max-width: 600px) {
    padding-top: 50px;
    font-size: 1.2em;
  }

  @media(min-width: 601px) and (max-width: 900px) {
    padding-top: 50px;
    font-size: 1.5em;
  }

  @media(min-width: 901px) {
    font-size: 1.8em;
  }
`
);

export const SignUpSection = styled(({ children, ...props }: any) => (
  <Grid {...props}>{children}</Grid>
))(
  () => `
  padding: 100px 32px;
  color: black;
  font-weight: 600;
  gap: 32px;
  text-align: center;
`
);

export const CreateYourBio = styled(({ children, ...props }: any) => (
  <Grid {...props}>{children}</Grid>
))(
  () => `
  font-size: 2em;
  line-height: 2;
  text-shadow: 1px 1px 0 #fff;
`
);

export const PromoDuration = styled(({ children, ...props }: any) => (
  <Grid {...props}>{children}</Grid>
))(
  () => `
  font-size: 3.5em;
  font-weight: 600;
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
`
);

export const SignupButton = styled(({ children, ...props }: any) => (
  <Link {...props}>{children}</Link>
))(
  () => `
  background-color: ${PRIMARY_COLOR};
  color: white;
  max-width: 400px;
  width: 100%;
  padding: 16px;
  border-radius: 10px;

  &:hover {
    background-color: white;
    color: ${PRIMARY_COLOR};
  }
`
);

export const TestimonialsSection = styled(({ children, ...props }: any) => (
  <Grid {...props}>{children}</Grid>
))(
  () => `
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 100px 32px;
  gap: 32px;
  background-color: ${GLOBAL_LIGHT_BG};
`
);
