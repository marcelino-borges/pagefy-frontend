import { Grid, styled, keyframes } from "@mui/material";
import { getAnimationByName } from "../../../../../utils/animations";

export const Root = styled(
  ({ animation, duration, delay, infinite, ...rest }: any) => <Grid {...rest} />
)`
  padding: 8px;
  cursor: pointer;
  animation: ${(props) => props.duration || "1"}s
    ${(props) =>
      props.animation ? keyframes`${getAnimationByName(props.animation)}` : ""}
    ${(props) => props.delay || "0"}s
    ${(props) => (!!props.infinite ? "infinite" : "1")};
`;
