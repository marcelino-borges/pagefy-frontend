import { Grid } from "@mui/material";
import { Root } from "./style";

const PageRendererContent = ({ children, ...rest }: any) => {
  return (
    <Root container direction="column" alignItems="center" {...rest}>
      <Grid
        container
        item
        maxWidth="var(--max-site-width-page-renderer) !important"
      >
        {children}
      </Grid>
    </Root>
  );
};

export default PageRendererContent;
