import { PRIMARY_COLOR } from "../../../styles/colors";
import { IconButtonCustom } from "./style";

interface IIconButtonProps {
  size?: any;
  onClick?: any;
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
  disabled?: boolean;
  id?: string;
}

const IconButton = ({
  size,
  onClick,
  color,
  hoverBackgroundColor,
  children,
  disabled,
  id,
}: IIconButtonProps) => {
  return (
    <IconButtonCustom
      disabled={disabled}
      size={size}
      onClick={onClick}
      color={color || "default"}
      hoverBackgroundColor={hoverBackgroundColor || PRIMARY_COLOR}
      id={id}
    >
      {children}
    </IconButtonCustom>
  );
};

export default IconButton;
