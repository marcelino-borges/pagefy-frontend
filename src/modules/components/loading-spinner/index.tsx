import { Root, CircularProgressIcon } from "./style";

interface ILoadingSpinnerProps {
  color?: string;
  size?: number;
  isFullPage?: boolean;
}

const LoadingSpinner = ({
  color = "white",
  size = 60,
  isFullPage = false,
}: ILoadingSpinnerProps) => {
  const Spinner = () => <CircularProgressIcon color={color} size={size} />;

  if (isFullPage)
    return (
      <Root container justifyContent="center" alignItems="center">
        <Spinner />
      </Root>
    );
  else return <Spinner />;
};

export default LoadingSpinner;
