import Header from "../../components/header";
import PrivateRouteChecker from "../../components/private-route-checker";
import { PaymentElement } from "@stripe/react-stripe-js";

const PurchasePlanPage = () => {
  return (
    <>
      <PrivateRouteChecker />
      <Header />
      <form>
        <PaymentElement />
        <button>Submit</button>
      </form>
      Purchase
    </>
  );
};

export default PurchasePlanPage;
