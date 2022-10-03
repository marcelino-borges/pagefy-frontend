import { useState } from "react";
import { PRIMARY_COLOR } from "./../../../styles/colors";
import { Link } from "react-router-dom";

interface IInternalLinkProps {
  to: string;
  children: any;
  hoverUnderline?: boolean;
  color?: string;
  hoverColor?: string;
  bgColor?: string;
  hoverBgColor?: string;
  w?: string;
  width?: string;
  height?: string;
  h?: string;
}

const InternalLink = ({
  to,
  hoverUnderline = false,
  color = PRIMARY_COLOR,
  hoverColor = "black",
  bgColor,
  hoverBgColor,
  w,
  width,
  h,
  height,
  children,
}: IInternalLinkProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      to={to}
      style={{
        color: !isHovering ? color : hoverColor,
        backgroundColor: !isHovering ? bgColor : hoverBgColor,
        width: w || width,
        height: h || height,
        textDecoration: isHovering && hoverUnderline ? "underline" : "none",
      }}
    >
      {children}
    </Link>
  );
};

export default InternalLink;
