import { createTheme } from "@mui/material";
import { PRIMARY_COLOR } from "../styles/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
  },
});

export default theme;
