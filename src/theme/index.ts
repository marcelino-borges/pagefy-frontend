import { createTheme, ThemeOptions } from "@mui/material";
import { PRIMARY_COLOR } from "../styles/colors";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xm: true;
  }
}

const defaultTheme = createTheme();
const theme: ThemeOptions = {
  breakpoints: {
    values: {
      ...defaultTheme.breakpoints.values,
      xm: 400,
    },
  },
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

export default createTheme(theme);
