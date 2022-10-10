import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ThemeProvider } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import App from "./App";
import store from "./store";
import theme from "./theme";
import "./styles/global-style.css";
import "react-toastify/dist/ReactToastify.css";
import strings from "./localization";
import LoadingSpinner from "./modules/components/loading-spinner";
import ErrorBoundary from "./modules/components/error-boundaries";

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate
          loading={<LoadingSpinner isFullPage />}
          persistor={persistor}
        >
          <ThemeProvider theme={theme}>
            <LocalizationProvider
              dateAdapter={DateAdapter}
              locale={strings.getInterfaceLanguage()}
            >
              <App className="App" />
            </LocalizationProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
