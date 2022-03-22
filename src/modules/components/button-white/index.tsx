import { CustomLink } from "./style.";

interface IProps {
  to?: any;
  onClick?: () => void;
  children: any;
  [x: string]: any;
}

const ButtonWhite = ({ to, onClick, children, ...rest }: IProps) => {
  return (
    <CustomLink to={to} onClick={onClick} {...rest}>
      {children}
    </CustomLink>
  );
};

export default ButtonWhite;
