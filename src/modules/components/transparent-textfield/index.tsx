import { TransparentTextFieldStyled } from "./style";

const TransparentTextField = ({ register, onChange, value, ...rest }: any) => {
  return (
    <TransparentTextFieldStyled
      onChange={onChange}
      value={value}
      variant="standard"
      {...register}
      {...rest}
    />
  );
};

export default TransparentTextField;
