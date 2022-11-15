import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import { PRIMARY_COLOR } from "../../../styles/colors";

export const CustomLink = styled(
  ({
    bgColor,
    fontColor,
    hoverFontColor,
    hoverBgColor,
    borderColor,
    w,
    h,
    p,
    m,
    fontWeight,
    width,
    height,
    to,
    ...rest
  }: any) => <Link to={to} {...rest} />
)(
  ({
    bgColor,
    fontColor,
    hoverFontColor,
    hoverBgColor,
    borderColor,
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
  border-radius: 32px;
  ${borderColor ? `border: 1px solid ${borderColor};` : ""}
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
