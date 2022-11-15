import { CustomLink } from "./style.";

interface ICustomButtonProps {
  to?: string;
  onClick?: () => void;
  bgColor?: string;
  fontColor?: string;
  hoverBgColor?: string;
  hoverFontColor?: string;
  borderColor?: string;
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
  to = "#",
  onClick,
  bgColor,
  fontColor,
  hoverBgColor,
  hoverFontColor,
  borderColor,
  w,
  h,
  p = "16px 24px",
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
      borderColor={borderColor}
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
