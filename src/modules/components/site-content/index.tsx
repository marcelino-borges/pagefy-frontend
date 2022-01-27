import { Grid } from "@mui/material";
import { Root } from "./style";

const SiteContent = ({ children, ...rest }: any) => {
  return (
    <Root container justifyContent="center" {...rest}>
      <Grid container item direction="column">
        {children}
      </Grid>
    </Root>
  );
};

export default SiteContent;
