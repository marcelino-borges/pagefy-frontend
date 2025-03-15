import React from "react";
import strings from "../../../localization";
import { ANALYTICS_EVENTS } from "../../../constants";
import { logAnalyticsEvent } from "../../../services/firebase-analytics";
import { Box, Stack } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import ThinWidthContent from "../site-content/thin-width";
import { Link } from "react-router-dom";
import PAGES_ROUTES from "../../../routes/paths";

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    logAnalyticsEvent(ANALYTICS_EVENTS.exception, {
      fatal: true,
      description: "ERROR BOUNDARY: " + errorInfo,
    });
    console.error("ERROR BOUNDARY:", error, "ERROR INFO:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ThinWidthContent center>
          <Stack direction="column" alignItems="center" gap="16px">
            <div>
              <ErrorOutline
                color="error"
                style={{
                  fontSize: "4rem",
                }}
              />
            </div>
            <div>
              <h1>{strings.somethingWentWrong}</h1>
            </div>
            <a href={PAGES_ROUTES.root}>{strings.back}</a>
          </Stack>
        </ThinWidthContent>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
