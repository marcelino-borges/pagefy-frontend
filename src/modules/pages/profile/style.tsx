import { Grid, styled } from "@mui/material";
import {
  FOOTER_HEIGHT,
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from "../../../constants";

export const ProfileContent = styled(Grid)`
  min-height: calc(100vh - ${FOOTER_HEIGHT});
  padding: calc(${HEADER_HEIGHT_DESKTOP} + 32px) 32px 100px 32px;
  flex-grow: 1;

  @media (max-width: 900px) {
    padding: calc(${HEADER_HEIGHT_MOBILE} + 24px) 24px 16px 24px;
  }

  @media (max-width: 400px) {
    padding: calc(${HEADER_HEIGHT_MOBILE} + 16px) 8px 8px 8px;
  }
`;
