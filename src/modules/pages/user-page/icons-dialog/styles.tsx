import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import { Colorize } from "@mui/icons-material";

export const IconsSearchResultsArea = styled(
  ({ fontWeight, color, fontSize, fontStyle, ...rest }: any) => (
    <Grid {...rest} />
  )
)`
  min-height: 200px;
  overflow-y: auto;
  padding: 12px 0px;
`;

export const IconsResult = styled(
  ({ fontWeight, color, fontSize, fontStyle, ...rest }: any) => (
    <Grid {...rest} />
  )
)`
  font-size: 64px;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  color: grey;
`;

export const ColorizeIcon = styled(({ ...rest }: any) => (
  <Colorize {...rest} />
))`
  position: absolute;
  z-index: 12;
  color: rgba(1, 1, 1, 1);
  left: 0;
  transform: translateX(150%) translateY(-20%);
  padding: 4px;
  background-color: white;
  border-radius: 50%;
  border: 1px solid var(--primary);
  width: 16px;
  height: 16px;
`;

export const ColorizeBG = styled(({ ...rest }: any) => <span {...rest} />)`
  position: absolute;
  left: 0;
  top: 0;
  width: 56px;
  height: 56px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }

  &:hover svg {
    background-color: var(--primary);
    color: white;
    border: 1px solid white;
  }
`;

export const SelectedIconButton = styled(({ ...rest }: any) => (
  <span {...rest} />
))`
  position: static;
`;

export const ColorPickerSpan = styled(({ ...rest }: any) => <span {...rest} />)`
  position: fixed;
  z-index: 100;
`;
