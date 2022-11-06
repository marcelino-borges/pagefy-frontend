import { styled } from "@mui/material";
import { PRIMARY_COLOR } from "../../../../styles/colors";
import images from "../../../../assets/img";

const HEIGHT_FULLSCREEN = "100vh - 150px";
const HEIGHT_SMALLER_1450 = "100vh - 300px";
const HEIGHT_SMALLER_1360 = "100vh - 400px";

export const FloatingPreviewContainer = styled("div")`
  position: fixed;
  right: 32px;
  top: 126px;
  width: calc((${HEIGHT_FULLSCREEN}) * 9 / 16);
  height: calc(${HEIGHT_FULLSCREEN});
  transition: width 0.2s ease-in-out, height 0.2s ease-in-out;

  @media (max-width: 1450px) {
    width: calc((${HEIGHT_SMALLER_1450}) * 9 / 16);
    height: calc(${HEIGHT_SMALLER_1450});
  }

  @media (max-width: 1360px) {
    width: calc((${HEIGHT_SMALLER_1360}) * 9 / 16);
    height: calc(${HEIGHT_SMALLER_1360});
  }

  @media (max-width: 1307px) {
    display: none;
  }
`;

export const PageContainer = styled("div")`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 50px;

  &::webkit-scrollbar-button {
    border-radius: 10px;
  }

  @media (max-width: 1450px) {
    border-radius: 20px;
  }

  @media (max-width: 1360px) {
    border-radius: 30px;
  }
`;

export const CloseIcon = styled("div")`
  position: absolute;
  left: -40px;
  top: 0;
  background-color: #00000050;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #000000aa;
  }
`;

export const ShowIcon = styled("div")`
  position: fixed;
  right: 16px;
  top: 116px;
  background-color: ${PRIMARY_COLOR};
  border-radius: 50%;
  width: 56px;
  height: 56px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #000000aa;
  }
`;

export const Iphone14Image = styled("div")`
  position: absolute;
  left: -14px;
  top: -14px;
  right: -22px;
  bottom: -16px;
  background-image: url(${images.iphone14});
  background-size: 100% 100%;
  background-position: center;
  z-index: 1000;
  pointer-events: none;

  @media (max-width: 1450px) {
    right: -18px;
    bottom: -13px;
  }

  @media (max-width: 1360px) {
    right: -14px;
    bottom: -11px;
    top: -11px;
  }

  @media (max-width: 1307px) {
    right: -20px;
  }
`;
