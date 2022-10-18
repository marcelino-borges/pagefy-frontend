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
    p,
    m,
    fontWeight,
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
    p,
    m,
    fontWeight,
    width,
    height,
  }: any) => `
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background-color: ${bgColor || "white"};
  color: ${fontColor || PRIMARY_COLOR};
  font-weight: ${fontWeight || "unset"};
  padding: ${p};
  margin: ${m};
  border-radius: 8px;
  text-decoration: none;
  font-weight: ${m};
  cursor: pointer;
  width: ${w || width || ""};
  height: ${h || height || ""};
  text-align: center;

  &:hover {
    background-color: ${hoverBgColor || PRIMARY_COLOR};
    color: ${hoverFontColor || "white"};
  }
`
);
