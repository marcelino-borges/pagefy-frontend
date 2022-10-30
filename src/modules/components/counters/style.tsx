import { Grid, styled } from "@mui/material";

export const Root = styled(Grid)`
  border-radius: 10px;
  padding: 32px 16px;
`;

export const VerticalLine = styled(Grid)`
  height: 100%;
  width: 1px;
  border-right: 1px solid transparent;
`;

export const LargeNumber = styled(Grid)`
  font-weight: 800;
  font-size: 2em;
`;
