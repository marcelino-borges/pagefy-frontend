import { TransparentTextFieldStyled } from "./style";

interface ITransparentTextFieldProps {
  register?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
  value?: string;
  fontWeight?: string;
  color?: string;
  fontSize?: string;
  fontStyle?: string;
  name?: string;
  autoFocus?: any;
  textAlign?: string;
  error?: boolean | undefined;
  helperText?: string | undefined;
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
  textAlign,
  error,
  helperText,
  ...rest
}: ITransparentTextFieldProps) => {
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
      textAlign={textAlign}
      error={error !== undefined && error === true}
      helperText={helperText || ""}
      {...register}
      {...rest}
    />
  );
};

export default TransparentTextField;
