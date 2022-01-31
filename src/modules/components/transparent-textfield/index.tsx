import { TransparentTextFieldStyled } from "./style";

interface IProps {
  register?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
  value?: string;
  fontWeight?: string;
  color?: string;
  fontSize?: string;
  fontStyle?: string;
  name?: string;
  autoFocus?: any;
  // All other props
  [x: string]: any;
}

const TransparentTextField = ({
  register,
  onChange,
  value,
  fontWeight,
  color,
  fontSize,
  fontStyle,
  name,
  autoFocus,
  ...rest
}: IProps) => {
  return (
    <TransparentTextFieldStyled
      autoFocus={autoFocus !== undefined}
      onChange={onChange}
      value={value}
      variant="standard"
      fontWeight={fontWeight}
      color={color}
      fontSize={fontSize}
      fontStyle={fontStyle}
      {...register}
      {...rest}
    />
  );
};

export default TransparentTextField;
