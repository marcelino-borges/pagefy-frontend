import { IconButtonCustom } from "./style";

interface IProps {
  size: any;
  onClick: any;
  children: any;
}

const IconButtonTheme = ({ size, onClick, children }: IProps) => {
  return (
    <IconButtonCustom size={size} onClick={onClick}>
      {children}
    </IconButtonCustom>
  );
};

export default IconButtonTheme;
