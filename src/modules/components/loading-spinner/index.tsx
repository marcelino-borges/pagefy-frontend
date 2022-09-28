import { Root, CircularProgressIcon } from "./style";

interface ILoadingSpinnerProps {
  color?: string;
}

const LoadingSpinner = ({ color }: ILoadingSpinnerProps) => {
  return (
    <Root container justifyContent="center" alignItems="center">
      <CircularProgressIcon color={color} size={60} />
    </Root>
  );
};

export default LoadingSpinner;
