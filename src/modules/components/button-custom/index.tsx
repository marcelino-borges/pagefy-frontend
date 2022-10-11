import { CustomLink } from "./style.";

interface ICustomButtonProps {
  to?: any;
  onClick?: () => void;
  bgColor?: string;
  fontColor?: string;
  hoverBgColor?: string;
  hoverFontColor?: string;
  w?: string;
  h?: string;
  width?: string;
  height?: string;
  children: any;
  [x: string]: any;
}

const CustomButton = ({
  to,
  onClick,
  bgColor,
  fontColor,
  hoverBgColor,
  hoverFontColor,
  w,
  h,
  width,
  height,
  children,
  ...rest
}: ICustomButtonProps) => {
  return (
    <CustomLink
      {...rest}
      bgColor={bgColor}
      fontColor={fontColor}
      hoverBgColor={hoverBgColor}
      hoverFontColor={hoverFontColor}
      w={w}
      h={h}
      width={width}
      height={height}
      to={to}
      onClick={onClick}
    >
      {children}
    </CustomLink>
  );
};

export default CustomButton;
