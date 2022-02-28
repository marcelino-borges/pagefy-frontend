import { styled } from "@mui/system";
import { Grid } from "@mui/material";

export const Root = styled(Grid)`
  max-width: var(--max-site-width);
  padding: 50px 32px 32px 32px;

  & a {
    text-decoration: none;
  }
`;
