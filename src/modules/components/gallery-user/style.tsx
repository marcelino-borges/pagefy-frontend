import { styled } from "@mui/material";
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
  Delete,
} from "@mui/icons-material";
import { PRIMARY_COLOR, PRIMARY_COLOR_DARKER } from "./../../../styles/colors";

const HEIGHT = 150;
const BASIC_ARROW = `
  position: absolute;
  cursor: pointer;
  z-index: 5;
  bottom: 2;
  background-color: #ffffff70;
  color: black;
  height: ${HEIGHT}px;
  width: 22px;

  &:hover {
    background-color: ${PRIMARY_COLOR}90;
    color: black;
  }

  &:active {
    background-color: ${PRIMARY_COLOR_DARKER}90;
    color: white;
  }
`;

export const Root = styled("div")`
  position: relative;
  margin-bottom: 16px;
`;

export const Title = styled("div")`
  font-size: 18px;
  margin-bottom: 16px;
`;

export const ImagesContainer = styled("div")`
  position: relative;
  display: inline-flex;
  overflow-x: hidden;
  gap: 8px;
  height: ${HEIGHT}px;
  width: calc(100% - 50px);
  margin: 0px 25px;
`;

export const Image = styled(
  ({
    width,
    height,
    bgColor,
    backgroundImage,
    marginX,
    isSystemOwned,
    ...rest
  }: any) => <div {...rest} />
)(
  ({ width, height, bgColor, backgroundImage, marginX, isSystemOwned }) => `
  position: relative;
  width: ${width ? width : HEIGHT + "px"};
  height: ${height ? height : HEIGHT + "px"};
  flex: 1 0 auto;
  z-index: 0;
  cursor: ${bgColor && width ? "" : "pointer"};
  border-radius: 5px;
  background-color: ${bgColor ? bgColor : ""};
  background-image: ${backgroundImage ? `url(${backgroundImage})` : ""};
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0px ${marginX ? marginX : "0px"};

  ${
    !bgColor &&
    !width &&
    `&:hover {
      div {
        visibility: visible;
        background-color: #ffffff50;
      }
    }

    ${
      !isSystemOwned &&
      `&:hover {
        .MuiSvgIcon-root {
          display: block;
        }
      }
    `
    }
    
    &:active {
      div {
        visibility: visible;
        background-color: #ffffff80;
      }
    }`
  }
`
);

export const ImageOverlay = styled("div")`
  visibility: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

export const ArrowBackIcon = styled(ArrowBackIosNewRounded)`
  ${BASIC_ARROW}
  left: 0;
  border-radius: 6px 0px 0px 6px;
`;
export const ArrowForwardIcon = styled(ArrowForwardIosRounded)`
  ${BASIC_ARROW}
  right: 0;
  border-radius: 0px 6px 6px 0px;
`;

export const NoImagesOrLoading = styled("div")`
  padding-top: 30px;
`;

export const DeleteIcon = styled(Delete)`
  position: absolute;
  color: black;
  display: none;
  z-index: 10;
  bottom: 30px;
  right: 4px;
  background-color: #ffffff80;
  border-radius: 50%;
  padding: 4px;

  &:hover {
    color: ${PRIMARY_COLOR};
    background-color: #ffffff;
  }
`;
