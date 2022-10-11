import Header from "../../components/header";
import PrivateRouteChecker from "../../components/private-route-checker";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLIC_KEY } from "../../../constants";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const PurchasePlanPage = () => {
  const options = {
    clientSecret: "{{CLIENT_SECRET}}",
  };

  return (
    <>
      <PrivateRouteChecker />
      <Header />
      <Elements stripe={stripePromise} options={options}>
        <form>
          <PaymentElement />
          <button>Submit</button>
        </form>
      </Elements>
    </>
  );
};

export default PurchasePlanPage;
