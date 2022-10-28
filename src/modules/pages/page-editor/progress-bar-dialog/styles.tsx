import { styled } from "@mui/system";
import { Grid, Stack } from "@mui/material";
import { GLOBAL_LIGHT_BG, LIGHT_GREY } from "../../../../styles/colors";

export const DescriptionText = styled(({ ...rest }: any) => <Grid {...rest} />)`
  margin-bottom: 36px;
  font-size: 0.8em;
`;

export const ProgressBarContainer = styled(Stack)`
  margin-top: 32px;
  border-radius: 10px;
  border: 2px dashed ${LIGHT_GREY};
  padding: 16px;
  font-size: 0.85em;
  position: relative;
  background-color: ${GLOBAL_LIGHT_BG};
`;

export const ProgressBarContainerLabel = styled("span")`
  background: linear-gradient(
    to top,
    ${GLOBAL_LIGHT_BG},
    ${GLOBAL_LIGHT_BG},
    #fff
  );
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: bold;
  color: ${LIGHT_GREY};
  position: absolute;
  top: -13px;
  left: 12px;
  padding: 4px;
`;
