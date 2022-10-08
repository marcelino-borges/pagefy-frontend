import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../styles/colors";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xm: true;
  }
}

const defaultTheme = createTheme();

let themeOptions: ThemeOptions = {
  typography: {
    fontFamily: [
      '"Montserrat"',
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
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

let theme = responsiveFontSizes(createTheme(themeOptions));

export default theme;
