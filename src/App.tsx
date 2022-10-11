import AppRoutes from "./routes/index";
import { addAPIProvider } from "@iconify/react";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLIC_KEY } from "../src/constants";

addAPIProvider("", {
  // Array of host names.
  // Mutliple hosts allow redundancy: if one host is down, component will query another host.
  resources: ["https://api.iconify.design"],
});

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const App = (props: any) => {
  const options = {
    clientSecret: "{{CLIENT_SECRET}}",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <AppRoutes {...props} />
    </Elements>
  );
};

export default App;
