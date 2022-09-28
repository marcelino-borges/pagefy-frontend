import { Grid } from "@mui/material";
import { useEffect } from "react";
import { GLOBAL_LIGHT_BG } from "../../../../styles/colors";
import { Root } from "./style";

const ThinWidthContent = ({ children, ...rest }: any) => {
  useEffect(() => {
    document.body.style.backgroundColor = GLOBAL_LIGHT_BG;
  }, []);

  return (
    <Root container justifyContent="center" {...rest}>
      <Grid container item direction="column">
        {children}
      </Grid>
    </Root>
  );
};

export default ThinWidthContent;
