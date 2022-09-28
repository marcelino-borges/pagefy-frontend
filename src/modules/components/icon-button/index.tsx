import { PRIMARY_COLOR } from "../../../styles/colors";
import { IconButtonCustom } from "./style";

interface IProps {
  size: any;
  onClick: any;
  children: any;
  color?:
    | "default"
    | "error"
    | "info"
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  hoverBackgroundColor?: string;
}

const IconButton = ({
  size,
  onClick,
  color,
  hoverBackgroundColor,
  children,
}: IProps) => {
  return (
    <IconButtonCustom
      size={size}
      onClick={onClick}
      color={color || "default"}
      hoverBackgroundColor={hoverBackgroundColor || PRIMARY_COLOR}
    >
      {children}
    </IconButtonCustom>
  );
};

export default IconButton;
