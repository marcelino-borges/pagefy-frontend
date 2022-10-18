import { Grid } from "@mui/material";
import { useEffect } from "react";
import { GLOBAL_LIGHT_BG } from "../../../../styles/colors";
import { Root } from "./style";

const FullWidthContent = ({ pt, pb, pl, pr, children, ...rest }: any) => {
  useEffect(() => {
    document.body.style.backgroundColor = GLOBAL_LIGHT_BG;
    window.scrollTo(0, 0);
  }, []);

  return (
    <Root
      container
      justifyContent="center"
      {...rest}
      style={{
        paddingTop: pt,
        paddingBottom: pb,
        paddingLeft: pl,
        paddingRight: pr,
      }}
    >
      <Grid container item direction="column">
        {children}
      </Grid>
    </Root>
  );
};

export default FullWidthContent;
