import { keyframes } from "@mui/material";
import * as animations from "react-animations";

export const getAnimationByName = (name: string) => {
  const animationsCasted = animations as any;
  return animationsCasted[name];
};

export const getAnimationCssAsObject = (name: string) => {
  if (name && name.length > 0) {
    const animation = getAnimationByName(name);
    if (!animation) return "";
    return keyframes`${animation}`;
  }
};
