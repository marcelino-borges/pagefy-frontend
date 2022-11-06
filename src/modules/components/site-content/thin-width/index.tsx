import { Grid } from "@mui/material";
import { useEffect } from "react";
import { GLOBAL_LIGHT_BG } from "../../../../styles/colors";
import { IWidthContentProps } from "../interfaces";
import { Root } from "./style";

const ThinWidthContent = ({
  pt,
  pb,
  pl,
  pr,
  center = false,
  children,
  ...rest
}: IWidthContentProps) => {
  useEffect(() => {
    document.body.style.backgroundColor = GLOBAL_LIGHT_BG;
    window.scrollTo(0, 0);
  }, []);

  return (
    <Root
      container
      direction="column"
      alignItems={center ? "center" : "flex-start"}
      justifyContent="flex-start"
      width="100%"
      {...rest}
      style={{
        paddingTop: pt,
        paddingBottom: pb,
        paddingLeft: pl,
        paddingRight: pr,
      }}
    >
      <Grid
        container
        maxWidth="var(--max-site-width) !important"
        item
        direction="column"
      >
        {children}
      </Grid>
    </Root>
  );
};

export default ThinWidthContent;
