import { Link, styled } from "@mui/material";
import { PRIMARY_COLOR } from "../../../styles/colors";

export const CustomLink = styled(
  ({
    bgColor,
    fontColor,
    hoverFontColor,
    hoverBgColor,
    w,
    h,
    width,
    height,
    ...rest
  }: any) => <Link {...rest} />
)(
  ({
    bgColor,
    fontColor,
    hoverFontColor,
    hoverBgColor,
    w,
    h,
    width,
    height,
  }: any) => `
  background-color: ${bgColor || "white"};
  color: ${fontColor || PRIMARY_COLOR};
  padding: 8px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  width: ${w || width || ""};
  height: ${h || height || ""};

  &:hover {
    background-color: ${hoverBgColor || PRIMARY_COLOR};
    color: ${hoverFontColor || "white"};
  }
`
);
