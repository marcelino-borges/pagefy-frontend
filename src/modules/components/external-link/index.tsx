import { useState } from "react";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "./../../../styles/colors";

interface IExternalLinkProps {
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

const ExternalLink = ({
  to,
  hoverUnderline = false,
  color = PRIMARY_COLOR,
  hoverColor = SECONDARY_COLOR,
  bgColor,
  hoverBgColor,
  w,
  width,
  h,
  height,
  children,
}: IExternalLinkProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <a
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      href={to}
      style={{
        color: !isHovering ? color : hoverColor,
        backgroundColor: !isHovering ? bgColor : hoverBgColor,
        width: w || width,
        height: h || height,
        textDecoration: isHovering && hoverUnderline ? "underline" : "none",
      }}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
