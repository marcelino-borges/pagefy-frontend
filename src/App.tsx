import AppRoutes from "./routes/index";
import { addAPIProvider } from "@iconify/react";
import ReactPixel from "react-facebook-pixel";

const options: ReactPixel.Options = {
  autoConfig: true,
  debug: false,
};

ReactPixel.init(process.env.REACT_APP_PIXEL_ID!, undefined, options);
ReactPixel.revokeConsent();

addAPIProvider("", {
  // Array of host names.
  // Mutliple hosts allow redundancy: if one host is down, component will query another host.
  resources: ["https://api.iconify.design"],
});

const App = (props: any) => {
  return <AppRoutes {...props} />;
};

export default App;
