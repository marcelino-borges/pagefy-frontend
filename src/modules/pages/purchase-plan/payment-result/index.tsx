import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import strings from "../../../../localization";
import { clearPurchaseState } from "../../../../store/purchase/actions";
import Header from "../../../components/header";
import PrivateRouteChecker from "../../../components/private-route-checker";
import ThinWidthContent from "../../../components/site-content/thin-width";
import DoneIcon from "@mui/icons-material/Done";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ErrorIcon from "@mui/icons-material/Error";
import { Grid } from "@mui/material";
import InternalLink from "../../../components/internal-link/index";
import routes from "../../../../routes/paths";
import { useStripe } from "@stripe/react-stripe-js";
import { translateErrorMessage } from "../utils";
import LoadingSpinner from "../../../components/loading-spinner";
import { SECONDARY_COLOR } from "../../../../styles/colors";

const PaymentResult = () => {
  const dispatch = useDispatch();

  const stripe = useStripe();

  const [resultStatus, setResulteStatus] = useState("");

  useEffect(() => {
    dispatch(clearPurchaseState());
  }, [dispatch]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: any) => {
        if (paymentIntent.status) {
          setResulteStatus(paymentIntent.status);
        }
      });
  }, [stripe]);

  const getIconByResultStatus = (resultStatus: string) => {
    switch (resultStatus) {
      case "succeeded":
        return (
          <DoneIcon
            color="primary"
            fontSize="inherit"
            style={{ fontSize: "100px" }}
          />
        );
      case "processing":
        return (
          <HourglassEmptyIcon
            color="info"
            fontSize="inherit"
            style={{ fontSize: "100px" }}
          />
        );
      case "requires_payment_method":
        return (
          <ErrorIcon
            color="error"
            fontSize="inherit"
            style={{ fontSize: "100px" }}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <PrivateRouteChecker />
      <Header />
      <ThinWidthContent>
        {resultStatus ? (
          <div
            style={{
              margin: "auto",
            }}
          >
            <Grid justifyContent="center" textAlign="center">
              {getIconByResultStatus(resultStatus)}
            </Grid>
            <Grid>{translateErrorMessage(resultStatus)}</Grid>
            <Grid justifyContent="center" textAlign="center" pt="50px">
              <InternalLink to={routes.pages}>{strings.goToPages}</InternalLink>
            </Grid>
          </div>
        ) : (
          <div
            style={{
              margin: "auto",
            }}
          >
            <LoadingSpinner size={40} color={SECONDARY_COLOR} />
          </div>
        )}
      </ThinWidthContent>
    </>
  );
};

export default PaymentResult;
