import { Grid, styled } from "@mui/material";
import { SECONDARY_COLOR } from "../../../../../styles/colors";

export const Root = styled(Grid)`
  padding: 16px;
  border-radius: 10px;
  background-color: white;
  position: relative;
  cursor: pointer;

  &:hover .borderDiv {
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.03);
    border: 1px solid ${SECONDARY_COLOR};
  }
`;

export const BorderDiv = styled(Grid)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
