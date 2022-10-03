import { CustomLink } from "./style.";

interface IProps {
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
}: IProps) => {
  return (
    <CustomLink
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
      {...rest}
    >
      {children}
    </CustomLink>
  );
};

export default CustomButton;
