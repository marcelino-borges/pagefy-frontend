import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import App from "./App";
import store from "./store";
import theme from "./theme";
import "./styles/global-style.css";
import "react-toastify/dist/ReactToastify.css";
import strings from "./localization/index";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider
          dateAdapter={DateAdapter}
          locale={strings.getInterfaceLanguage()}
        >
          <App className="App" />
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
