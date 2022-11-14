import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import {
  FOOTER_HEIGHT,
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from "../../../../constants";

export const Root = styled(Grid)`
  position: relative;
  min-height: calc(100vh - ${FOOTER_HEIGHT});
  padding: calc(${HEADER_HEIGHT_DESKTOP} + 16px) 32px 0px 32px;

  @media (max-width: 900px) {
    padding: calc(${HEADER_HEIGHT_MOBILE} + 24px) 24px 24px 24px;
  }

  @media (max-width: 400px) {
    padding: calc(${HEADER_HEIGHT_MOBILE} + 16px) 8px 8px 8px;
  }
`;
