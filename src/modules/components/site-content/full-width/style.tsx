import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import { FOOTER_HEIGHT } from "../../../../constants";

export const Root = styled(Grid)`
  min-height: calc(100vh - ${FOOTER_HEIGHT});
  padding: 150px 32px 32px 32px;

  @media (max-width: 900px) {
    padding: 13vw 24px 24px 24px;
  }

  @media (max-width: 400px) {
    padding: 19vw 8px 8px 8px;
  }
`;
