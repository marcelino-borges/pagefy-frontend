import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import { DragHandleRounded } from "@mui/icons-material";

export const Parent = styled(Grid)`
  border: 1px solid black;
  border-radius: 8px;
  min-height: 100px;
  background-color: white;
`;

export const DragHandle = styled(DragHandleRounded)`
  &:hover {
    cursor: grab;
  }
  &:active {
    cursor: grabbing !important;
  }
`;
