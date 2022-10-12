import { Grid } from "@mui/material";
import { Root, CircularProgressIcon } from "./style";

interface ILoadingSpinnerProps {
  color?: string;
  size?: number;
  isFullPage?: boolean;
  m?: string;
  margin?: string;
}

const LoadingSpinner = ({
  color = "white",
  size = 60,
  isFullPage = false,
  m,
  margin,
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
      <Grid m={m} margin={margin}>
        <Spinner />
      </Grid>
    );
};

export default LoadingSpinner;
