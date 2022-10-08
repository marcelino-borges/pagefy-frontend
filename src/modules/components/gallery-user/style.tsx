import { styled } from "@mui/material";
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import { PRIMARY_COLOR } from "./../../../styles/colors";

const HEIGHT = 150;
const BASIC_ARROW = `
  position: absolute;
  cursor: pointer;
  z-index: 5;
  bottom: 2;
  background-color: #ffffff70;
  color: white;
  height: ${HEIGHT}px;
  width: 22px;

  &:hover {
    background-color: #ffffff90;
    color: black;
  }

  &:active {
    background-color: ${PRIMARY_COLOR}90;
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
  max-width: 100%;
`;

export const Image = styled("div")`
  position: relative;
  width: ${HEIGHT}px;
  height: ${HEIGHT}px;
  background-size: cover;
  flex: 1 0 auto;
  z-index: 0;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    div {
      visibility: visible;
      background-color: #ffffff50;
    }
  }

  &:active {
    div {
      visibility: visible;
      background-color: #ffffff80;
    }
  }
`;

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
`;
export const ArrowForwardIcon = styled(ArrowForwardIosRounded)`
  ${BASIC_ARROW}
  right: 0;
`;
