import { styled } from "@mui/system";
import { Grid, IconButton } from "@mui/material";
import { DragIndicator } from "@mui/icons-material";
import { PRIMARY_COLOR } from "./../../../../../styles/colors";

export const Parent = styled(Grid)`
  position: relative;
  transform: translateX(30px);
  margin-bottom: 24px;
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
  z-index: 1000;
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
  }
`;

export const LabelText = styled(Grid)`
  padding-right: 16px;
  font-size: 24px;
`;

export const ContentGridItem = styled(Grid)`
  display: inline-flex;
`;

export const UrlIconItem = styled(Grid)`
  color: #b9b9b9;
`;

export const UrlTextItem = styled(Grid)`
  padding: 0px 16px;
  font-size: 24px;
  color: #b9b9b9;
`;

export const EditIconItem = styled(Grid)`
  color: #b9b9b9;
`;

export const ToolsColumn = styled(({ isHoveringComponent, ...rest }: any) => (
  <div {...rest} />
))`
  color: white;
  background-color: ${PRIMARY_COLOR};
  position: absolute;
  z-index: -10;
  top: 0;
  right: ${(props) => (props.isHoveringComponent ? "0px" : "150px")};
  box-shadow: ${(props) =>
    props.isHoveringComponent
      ? "10px 10px 25px rgba(0, 0, 0, 0.2)"
      : "10px 10px 25px rgba(0, 0, 0, 0)"};
  bottom: 0;
  left: 0;
  border-radius: 20px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const ToolGridItem = styled(Grid)`
  margin: 0;
  padding: 0;
`;

export const ToolIconButton = styled(
  ({ transitionDuration, isHoveringComponent, ...rest }: any) => (
    <IconButton {...rest} />
  )
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
    props.isHoveringComponent ? "white" : "rgba(0, 0, 0, 0)"};

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
`;

export const AnalyticsGridItem = styled(Grid)`
  color: #e2e2e2;
  font-size: 16px;
  display: inline-flex;
`;
