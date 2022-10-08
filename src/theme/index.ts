import { createTheme, ThemeOptions } from "@mui/material";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../styles/colors";

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
    secondary: {
      main: SECONDARY_COLOR,
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
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "19px",
          minWidth: "120px",
          padding: "8px 16px",
          textTransform: "unset",
          fontSize: "0.9em",
          boxShadow: "none",
        },
      },
    },
  },
};

export default createTheme(theme);
