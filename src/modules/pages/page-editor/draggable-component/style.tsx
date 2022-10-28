import { styled } from "@mui/system";
import { Grid, IconButton, Stack } from "@mui/material";
import { DragIndicator } from "@mui/icons-material";
import {
  LIGHTER_GREY,
  PRIMARY_COLOR,
  MEDIUM_GREY,
  LIGHTEST_GREY,
  ACESSIBILITY_RED,
} from "../../../../styles/colors";

export const Parent = styled(Grid)`
  position: relative;
  margin-bottom: 24px;
  min-width: 250px;
`;

export const Container = styled(({ isHoveringComponent, ...rest }: any) => (
  <Grid {...rest} />
))`
  position: relative;
  border-radius: 15px;
  min-height: 220px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  z-index: 0;
`;

export const DeleteContainer = styled(({ ...rest }: any) => <Grid {...rest} />)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${ACESSIBILITY_RED};
  opacity: 0.7;
  border-radius: 15px;
  z-index: 20;
`;

export const Overlay = styled(({ isHoveringComponent, ...rest }: any) => (
  <Grid {...rest} />
))`
  border: ${(props) =>
    props.isHoveringComponent
      ? `1px solid ${PRIMARY_COLOR}`
      : `1px solid rgba(0, 0, 0, 0)`};
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 15px;
  z-index: 10;
  pointer-events: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const DragHandle = styled(({ isHoveringComponent, ...rest }: any) => (
  <DragIndicator {...rest} />
))`
  font-size: 30px;
  color: ${(props) => (props.isHoveringComponent ? PRIMARY_COLOR : "#EBEBEB")};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    cursor: grab;
  }
  &:active {
    cursor: grabbing !important;
  }import { ACESSIBILITY_RED } from './../../../../styles/colors';

`;

export const ContentRow = styled(({ children }: any) => (
  <Stack direction="row">{children}</Stack>
))`
  @media (max-width: 600px) {
    margin-left: 0px;
    .MuiGrid-item,
    svg {
      font-size: 16px;
    }
  }
`;

export const LabelText = styled(({ transform, children, ...rest }: any) => (
  <Grid {...rest}>{children}</Grid>
))`
  padding-right: 16px;
  font-size: 18px;
  font-weight: bold;
  transform: ${({ transform }) => transform || "translateY(-5px)"};
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;

  @media (max-width: 600px) {
    padding-right: 4px;
  }
`;

export const PrefixIconItem = styled(Grid)`
  color: ${LIGHTER_GREY};
`;

export const UrlTextItem = styled(Grid)`
  padding: 0px 8px;
  padding-bottom: 12px;
  font-size: 15px;
  color: ${MEDIUM_GREY};
  font-style: italic;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 600px) {
    padding: 0px 4px;
  }
`;

export const EditIconItem = styled(Grid)`
  color: ${LIGHTER_GREY};
  cursor: pointer;

  &:hover {
    color: ${PRIMARY_COLOR};
  }
`;

export const ToolsColumn = styled(({ isHoveringComponent, ...rest }: any) => (
  <div {...rest} />
))`
  color: white;
  background-color: ${PRIMARY_COLOR};
  position: absolute;
  z-index: -10;
  top: ${(props) => (props.isHoveringComponent ? "0px" : "1px")};
  right: ${(props) => (props.isHoveringComponent ? "0px" : "150px")};
  box-shadow: ${(props) =>
    props.isHoveringComponent
      ? "10px 10px 25px rgba(0, 0, 0, 0.2)"
      : "10px 10px 25px rgba(0, 0, 0, 0)"};
  bottom: ${(props) => (props.isHoveringComponent ? "0px" : "1px")};
  left: ${(props) => (props.isHoveringComponent ? "0px" : "1px")};
  border-radius: 20px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const DarkBG = styled(({ isHoveringComponent, ...rest }: any) => (
  <div {...rest} />
))`
  color: white;
  background-color: ${LIGHTER_GREY};
  position: absolute;
  z-index: -11;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 20px;
`;

export const ToolGridItem = styled(Grid)`
  margin: 0;
  padding: 0;
`;

export const ToolIconButton = styled(
  ({
    transitionDuration,
    isHoveringComponent,
    hoveringWhite,
    disabled,
    ...rest
  }: any) => <IconButton disabled={disabled} {...rest} />
)`
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${(props) =>
      props.isHoveringComponent ? props.transitionDuration : "0s"},
    0s;
  transition-property: visibility, background-color;
  visibility: ${(props) =>
    props.isHoveringComponent ? "visible" : "collapse"};
  text-align: center;
  color: ${(props) =>
    props.isHoveringComponent
      ? props.hoveringWhite !== undefined
        ? "white"
        : null
      : "rgba(0, 0, 0, 0)"};

  &.MuiButtonBase-root.MuiIconButton-root {
    border-radius: 20px;
    width: 100%;
  }

  &.MuiButtonBase-root.MuiIconButton-root:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const AnalyticsGridContainer = styled(Grid)`
  padding-right: 32px;

  @media (max-width: 550px) {
    padding-right: 16px;
  }
`;

export const AnalyticsGridItem = styled(Grid)`
  color: ${LIGHTER_GREY};
  font-size: 16px;
  display: inline-flex;
`;

export const ComponentArrowGridItem = styled(({ up, down, ...rest }: any) => (
  <Grid {...rest} />
))`
  padding: 8px 8px;
  cursor: pointer;
  border-radius: ${(props) => {
    if (props.up !== undefined) {
      return "15px 0px 15px 0px";
    } else if (props.down !== undefined) {
      return "0px 15px 0px 15px";
    } else {
      return "unset";
    }
  }};
  transform: translateX(-2px);

  &:hover {
    background-color: ${LIGHTEST_GREY};
  }

  &:active {
    background-color: ${LIGHTER_GREY};
  }
`;

export const DropzoneFileReady = styled(({ ...rest }: any) => (
  <Grid {...rest} />
))`
  color: #3dd381;
`;
