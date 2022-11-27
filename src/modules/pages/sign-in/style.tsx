import { Grid, styled } from "@mui/material";
import { PRIMARY_COLOR } from "../../../styles/colors";

export const Banner = styled(({ image, children, ...rest }: any) => (
  <div {...rest}>{children}</div>
))(
  ({ image }) => `
  background-image: url(${image});
  background-size: cover;
  background-position: center;
  width: 50vw;
  height: 100%;

  & #logo-signin {
    width: 200px;
    margin-left: 32px;
    margin-top: 32px;
  }

  @media(max-width: 800px) {
    height: 50vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    & #logo-signin {
      width: 200px;
      height: 34px;
      margin-bottom: 32px;
      margin-left: 0px;
    }
  }
`
);

export const PrimaryColoredText = styled("span")`
  color: ${PRIMARY_COLOR};
`;

export const LoginProviderContainer = styled(Grid)`
  font-size: 2.5em;

  svg {
    cursor: pointer;
  }
`;
