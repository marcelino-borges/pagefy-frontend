import { styled } from "@mui/system";
import { Grid } from "@mui/material";

export const Root = styled(Grid)`
  padding: 32px 32px 32px 32px;
  width: 100%;

  @media (max-width: 450px) {
    padding: 32px 16px 32px 16px;
  }

  & a {
    text-decoration: none;
  }
`;
