import { styled } from "@mui/system";
import { Grid, IconButton, Stack } from "@mui/material";
import { DragIndicator } from "@mui/icons-material";
import {
  LIGHTER_GREY,
  PRIMARY_COLOR,
  MEDIUM_GREY,
  LIGHTEST_GREY,
  ACESSIBILITY_RED,
  PRIMARY_COLOR_DARK,
} from "../../../../styles/colors";
import { Layers } from "../style";

export const Parent = styled(Grid)`
  position: relative;
  margin-bottom: 24px;
  min-width: 250px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  border-radius: 15px;
`;

export const MainContent = styled(Grid)`
  border-radius: 15px;
  min-height: 220px;
  background-color: white;
  z-index: ${Layers.MAIN_CONTENT};
`;

export const DeleteContainer = styled(Grid)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${ACESSIBILITY_RED};
  opacity: 0.7;
  border-radius: 15px;
`;

export const Overlay = styled(({ isHoveringComponent, ...rest }: any) => (
  <Grid {...rest} />
))(
  ({ isHoveringComponent }) => `
  border: ${
    isHoveringComponent
      ? `1px solid ${PRIMARY_COLOR_DARK}`
      : `1px solid rgba(0, 0, 0, 0)`
  };
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 15px;
  pointer-events: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: ${Layers.OVERLAY};
`
);

export const DragHandle = styled(({ isHoveringComponent, ...rest }: any) => (
  <DragIndicator {...rest} />
))(
  ({ isHoveringComponent }) => `
  font-size: 30px;
  color: ${isHoveringComponent ? PRIMARY_COLOR : "#EBEBEB"};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    cursor: grab;
  }

  &:active {
    cursor: grabbing !important;
  }


`
);

export const ContentRow = styled(Stack)`
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
))(
  ({ transform }) => `
  padding-right: 16px;
  font-size: 18px;
  font-weight: bold;
  transform: ${transform || "translateY(-5px)"};
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;

  @media (max-width: 600px) {
    padding-right: 4px;
  }
`
);

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

export const ToolsColumn = styled(Grid)`
  z-index: ${Layers.TOOLS_COLUMN};
  position: relative;
  border-radius: 0px 15px 15px 0px;
  min-wdth: 48px;
`;

export const ToolsColumnAnimatedBG = styled(
  ({ isHoveringComponent, ...rest }: any) => <div {...rest} />
)(
  ({ isHoveringComponent }: any) => `
background-color: ${PRIMARY_COLOR};
border-radius: 0px 15px 15px 0px;
transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
position: absolute;
left: -16px;
top: 0;
width: ${isHoveringComponent ? "calc(100% + 16px)" : 0};
height: 100%;
`
);

export const ToolGridItem = styled(Grid)`
  margin: 0;
  padding: 0;
  z-index: ${Layers.TOOLS_GRID_ITEM};
`;

export const ToolIconButton = styled(
  ({
    transitionDuration,
    isHoveringComponent,
    hoveringWhite,
    disabled,
    ...rest
  }: any) => <IconButton disabled={disabled} {...rest} />
)(
  ({ transitionDuration, isHoveringComponent, hoveringWhite }) => `
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${isHoveringComponent ? transitionDuration : "0s"},
    0s;
  transition-property: visibility, background-color;
  visibility: ${isHoveringComponent ? "visible" : "collapse"};
  text-align: center;
  color: ${
    isHoveringComponent
      ? hoveringWhite !== undefined
        ? "white"
        : null
      : "rgba(0, 0, 0, 0)"
  };
  margin-left: -16px;

  svg {
    margin-left: 16px;
  }

  &.MuiButtonBase-root.MuiIconButton-root {
    border-radius: 0px 15px 15px 0px;
    width: calc(100% + 16px);
  }

  &.MuiButtonBase-root.MuiIconButton-root:hover {
    background-color: ${PRIMARY_COLOR_DARK};
  }
`
);

export const DarkBG = styled("div")`
  color: white;
  background-color: ${LIGHTER_GREY};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 15px;
  z-index: ${Layers.DARK_BG};
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
))(
  ({ up, down }) => `
  padding: 8px 8px;
  cursor: pointer;
  border-radius: ${() => {
    if (up !== undefined) {
      return "15px 0px 15px 0px";
    } else if (down !== undefined) {
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
`
);

export const DropzoneFileReady = styled(Grid)`
  color: #3dd381;
`;
