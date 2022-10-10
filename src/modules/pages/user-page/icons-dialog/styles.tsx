import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import { Colorize } from "@mui/icons-material";

export const IconsSearchResultsArea = styled(
  ({ fontWeight, color, fontSize, fontStyle, ...rest }: any) => (
    <Grid {...rest} />
  )
)`
  height: 50vh;
  overflow-y: auto;
  padding: 12px 0px;

  @media (max-width: 600px) {
    height: 100%;
  }
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

export const ColorPickerIcon = styled(({ ...rest }: any) => (
  <Colorize {...rest} />
))`
  position: absolute;
  z-index: 12;
  color: white;
  left: 0;
  transform: translateX(150%) translateY(-20%);
  padding: 4px;
  background-color: black;
  border-radius: 50%;
  border: 1px solid white;
  width: 16px;
  height: 16px;
`;

export const ColorPickerOverlay = styled(({ ...rest }: any) => (
  <span {...rest} />
))`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

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
