import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import { MEDIUM_GREY } from "./../../../../styles/colors";

export const IconsSearchResultsArea = styled(
  ({ fontWeight, color, fontSize, fontStyle, ...rest }: any) => (
    <Grid {...rest} />
  )
)`
  min-height: 200px;
  overflow-y: scroll;
  padding: 12px;
`;

export const IconsResult = styled(
  ({ fontWeight, color, fontSize, fontStyle, ...rest }: any) => (
    <Grid {...rest} />
  )
)`
  color: ${MEDIUM_GREY};
  font-size: 64px;
  padding: 8px;
`;
