import { Grid } from "@mui/material";
import { Root, CircularProgressIcon } from "./style";

interface ILoadingSpinnerProps {
  color?: string;
  size?: number;
  isFullPage?: boolean;
  m?: string;
  margin?: string;
  w?: string;
  width?: string;
  h?: string;
  height?: string;
}

const LoadingSpinner = ({
  color = "white",
  size = 60,
  isFullPage = false,
  m,
  margin,
  w,
  width,
  h,
  height,
}: ILoadingSpinnerProps) => {
  const Spinner = () => <CircularProgressIcon color={color} size={size} />;

  if (isFullPage)
    return (
      <Root container justifyContent="center" alignItems="center">
        <Spinner />
      </Root>
    );
  else
    return (
      <Grid m={m} margin={margin} width={w || width} height={h || height}>
        <Spinner />
      </Grid>
    );
};

export default LoadingSpinner;
