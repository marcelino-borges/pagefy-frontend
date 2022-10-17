import { Grid } from "@mui/material";
import { useEffect } from "react";
import { GLOBAL_LIGHT_BG } from "../../../../styles/colors";
import { Root } from "./style";

const ThinWidthContent = ({ pt, pb, pl, pr, children, ...rest }: any) => {
  useEffect(() => {
    document.body.style.backgroundColor = GLOBAL_LIGHT_BG;
    window.scrollTo(0, 0);
  }, []);

  return (
    <Root container justifyContent="center" {...rest}>
      <Grid container item direction="column" pt={pt} pb={pb} pl={pl} pr={pr}>
        {children}
      </Grid>
    </Root>
  );
};

export default ThinWidthContent;
