import { createTheme, ThemeOptions } from "@mui/material";
import { PRIMARY_COLOR } from "../styles/colors";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.8em",
        },
      },
    },
  },
};

export default createTheme(themeOptions);
