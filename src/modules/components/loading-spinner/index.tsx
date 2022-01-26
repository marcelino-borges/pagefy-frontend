import { CircularProgress } from "@mui/material";
import { Root, CircularProgressIcon } from "./style";

const LoadingSpinner = () => {
  return (
    <Root container justifyContent="center" alignItems="center">
      <CircularProgressIcon size={60} />
    </Root>
  );
};

export default LoadingSpinner;
