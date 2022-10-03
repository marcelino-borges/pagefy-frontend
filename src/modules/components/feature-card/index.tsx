import { Grid } from "@mui/material";
import { DEEP_DARK_GREEN } from "../../../styles/colors";
import { CardInner, CardRoot } from "./style.";
import { PRIMARY_COLOR } from "./../../../styles/colors";

interface IProps {
  overTitle: string;
  title: string;
  recomendedText?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  minHeight?: string;
  children?: any;
  [x: string]: any;
}

const RecomendedCard = ({
  overTitle,
  title,
  recomendedText,
  width,
  height,
  maxWidth,
  maxHeight,
  minHeight,
  children,
  ...rest
}: IProps) => {
  return (
    <CardRoot
      width={width}
      height={height}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      color={DEEP_DARK_GREEN}
      pt={!recomendedText ? "24px" : "4px"}
      backgroundColor={!recomendedText ? "unset" : DEEP_DARK_GREEN}
      {...rest}
    >
      <Grid
        container
        justifyContent="center"
        color="white"
        fontWeight="600"
        pb="5px"
      >
        {recomendedText || ""}
      </Grid>
      <CardInner
        container
        height={!recomendedText ? "calc(100% - 4px)" : "calc(100% - 24px)"}
        border={!recomendedText ? "4px solid white" : ""}
        direction="column"
        wrap="nowrap"
        borderBottom={recomendedText ? "6px solid white" : ""}
      >
        <Grid
          container
          justifyContent="center"
          fontWeight="800"
          color={PRIMARY_COLOR}
          fontSize="1.5em"
          pt="48px"
        >
          {overTitle}
        </Grid>
        <Grid container justifyContent="center" fontWeight="800" fontSize="2em">
          {title}
        </Grid>
        <Grid
          container
          justifyContent="center"
          fontWeight="600"
          fontSize="1em"
          p="16px"
          pb="48px"
        >
          {children}
        </Grid>
      </CardInner>
    </CardRoot>
  );
};

export default RecomendedCard;
