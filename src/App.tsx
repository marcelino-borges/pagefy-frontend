import AppRoutes from "./routes/index";
import { addAPIProvider } from "@iconify/react";

addAPIProvider("", {
  // Array of host names.
  // Mutliple hosts allow redundancy: if one host is down, component will query another host.
  resources: ["https://api.iconify.design"],
});

const App = (props: any) => {
  return <AppRoutes {...props} />;
};

export default App;
