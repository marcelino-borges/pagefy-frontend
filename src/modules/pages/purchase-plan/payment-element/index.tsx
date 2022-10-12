import { Elements } from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import { StripeElementsOptions } from "./../../../../../node_modules/@stripe/stripe-js/types/stripe-js/elements-group.d";
import PrivateRouteChecker from "../../../components/private-route-checker";
import Header from "../../../components/header";

interface IPaymentElementProps {
  options: StripeElementsOptions | undefined;
  stripePromise: Promise<Stripe | null>;
}

const PaymentElement = ({ options, stripePromise }: IPaymentElementProps) => {
  return (
    <>
      <PrivateRouteChecker />
      <Header />
      <Elements stripe={stripePromise} options={options}>
        <form>
          <button>Submit</button>
        </form>
        Purchase
      </Elements>
      );
    </>
  );
};

export default PaymentElement;
