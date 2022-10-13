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
  p?: string;
  m?: string;
  fontWeight?: number;
  width?: string;
  height?: string;
  children: any;
  style?: any;
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
  p = "8px",
  m = "0px",
  fontWeight = 600,
  width,
  height,
  children,
  style,
  ...rest
}: ICustomButtonProps) => {
  return (
    <CustomLink
      bgColor={bgColor}
      fontColor={fontColor}
      hoverBgColor={hoverBgColor}
      hoverFontColor={hoverFontColor}
      w={w}
      h={h}
      p={p}
      m={m}
      fontWeight={fontWeight}
      width={width}
      height={height}
      to={to}
      onClick={onClick}
      style={style}
      {...rest}
    >
      {children}
    </CustomLink>
  );
};

export default CustomButton;
