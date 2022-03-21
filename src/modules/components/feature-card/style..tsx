import { Grid, styled } from "@mui/material";

export const CardRoot = styled(({ ...props }: any) => <Grid {...props} />)`
  border-radius: 10px;

  & li {
    margin: 8px 0px;
  }
`;

export const CardInner = styled(({ ...props }: any) => <Grid {...props} />)`
  background-color: #d0f5e8;
  border-radius: 6px;
`;
