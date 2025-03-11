import { Grid } from "@mui/material";
import { useEffect } from "react";
import { GLOBAL_LIGHT_BG } from "../../../../styles/colors";
import { IWidthContentProps } from "../interfaces";
import { Root } from "./style";

const FullWidthContent = ({
  pt = "16px",
  pb = "16px",
  pl = "16px",
  pr = "16px",
  mt = "0px",
  mb = "0px",
  ml = "0px",
  mr = "0px",
  children,
  sx,
  ...rest
}: IWidthContentProps) => {
  useEffect(() => {
    document.body.style.backgroundColor = GLOBAL_LIGHT_BG;
    window.scrollTo(0, 0);
  }, []);

  return (
    <Root
      container
      justifyContent="center"
      {...rest}
      sx={sx}
      style={
        !sx
          ? {
              paddingTop: pt,
              paddingBottom: pb,
              paddingLeft: pl,
              paddingRight: pr,
              marginTop: mt,
              marginBottom: mb,
              marginLeft: ml,
              marginRight: mr,
            }
          : undefined
      }
    >
      <Grid container item direction="column">
        {children}
      </Grid>
    </Root>
  );
};

export default FullWidthContent;
