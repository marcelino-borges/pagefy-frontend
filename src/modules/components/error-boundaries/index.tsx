import React from "react";
import strings from "../../../localization";

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
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>{strings.somethingWentWrong}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

function logErrorToMyService(error: any, errorInfo: any) {
  console.error("ERROR BOUNDARY:", error, "ERROR INFO:", errorInfo);
}
