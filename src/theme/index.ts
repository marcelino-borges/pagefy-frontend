import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material";
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_DARK,
  SECONDARY_COLOR,
} from "../styles/colors";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xm: true;
  }
}

const defaultTheme = createTheme();

export const MUI_BUTTON_STYLES = {
  borderRadius: "32px",
  padding: "16px 24px",
  textTransform: "unset",
  fontSize: "0.9em",
  boxShadow: "none",
  paddingTop: "8px",
  paddingBottom: "8px",
  paddingLeft: "16px",
  paddingRight: "16px",
  "&:hover": {
    color: "white",
    backgroundColor: PRIMARY_COLOR_DARK,
  },
} as const;

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
          ...MUI_BUTTON_STYLES,
          variants: [
            {
              props: { variant: "muted" },
              style: {
                color: "#bcbcbc",
                "&:hover": {
                  backgroundColor: "#bcbcbc",
                  color: "white",
                },
              },
            },
          ],
        },
      },
    },
  },
};

let theme = responsiveFontSizes(createTheme(themeOptions));

export default theme;
