import { useElements, useStripe } from "@stripe/react-stripe-js";
import strings from "../../../../localization";
import { PlansTypes } from "../../../../store/user/types";
import TriplePageTitle from "../../../components/page-title";
import { StripePaymentElement } from "./style";
import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { ACESSIBILITY_RED } from "./../../../../styles/colors";
import LoadingSpinner from "../../../components/loading-spinner";
import routes from "../../../../routes/paths";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../../store";
import { APP_ENVIROMENT } from "./../../../../constants/index";
import { translateErrorMessage } from "./../utils";
import InternalLink from "../../../components/internal-link";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "./../../../../utils/toast/index";

interface IPaymentElementProps {
  planType: PlansTypes;
  recurrency: string;
  currency: string;
}

const PaymentElement = ({ planType, recurrency }: IPaymentElementProps) => {
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const userEmail = useSelector(
    (state: IApplicationState) => state.user.profile?.email
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  useEffect(() => {
    let timeoutAfterProcessing: NodeJS.Timeout | undefined;

    if (isProcessingPayment) {
      timeoutAfterProcessing = setTimeout(() => {
        showErrorToast(strings.generalErrors.unexpectedERror);
        setTimeout(() => {
          navigate(routes.root);
        }, 2000);
      }, 15000);
    }

    return () => {
      if (timeoutAfterProcessing) clearTimeout(timeoutAfterProcessing);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProcessingPayment]);

  useEffect(() => {
    if (!stripe || !elements) {
      if (canSubmit) setCanSubmit(false);
    } else {
      if (!canSubmit) setCanSubmit(true);
    }
  }, [stripe, elements, canSubmit]);

  const getRecurrency = (recur: string) =>
    recur === "month" ? strings.recurrency.monthly : strings.recurrency.yearly;

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!canSubmit) return;

    if (!stripe || !elements) {
      return;
    }

    if (!agreePrivacy) {
      setErrorMessage(strings.requiredPrivacyAccept);
      return;
    }

    setIsProcessingPayment(true);

    let returnUrl =
      (APP_ENVIROMENT === "DEV"
        ? "https://socialbio-frontend-dev.onrender.com"
        : "https://socialbio.me") + routes.purchaseSuccess;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
        receipt_email: userEmail,
      },
    });

    // Reaches here only WHEN there is error
    // Otherwise, is redirected to [return_url]
    if (error?.message) {
      const translatedMessage: string = translateErrorMessage(error.message);
      setErrorMessage(translatedMessage);
    }

    setIsProcessingPayment(false);
  };

  return (
    <>
      <TriplePageTitle
        increasingSize
        marginBottom="70px"
        sizes={[1, 3, 0.8]}
        titles={[
          strings.thePlanYouSelectedIs,

          `${Object.values(PlansTypes)[planType].toString()} - ${getRecurrency(
            recurrency
          )}`,
          strings.nowItsTimeToSubscribe,
        ]}
      />
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <Grid
            container
            justifyContent="center"
            pb="100px"
            color={ACESSIBILITY_RED}
          >
            {errorMessage}
          </Grid>
        )}
        <Grid container justifyContent="center">
          <StripePaymentElement />
        </Grid>
        <Grid container pt="48px" justifyContent="center">
          <FormControlLabel
            label={
              <>
                {strings.agreeWith}{" "}
                <InternalLink to={routes.terms}>
                  {strings.termsOfUse}
                </InternalLink>{" "}
                {strings.and}{" "}
                <InternalLink to={routes.privacy}>
                  {strings.privacyPolicies}
                </InternalLink>
              </>
            }
            control={
              <Checkbox
                checked={agreePrivacy}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setAgreePrivacy(event.target.checked);
                }}
              />
            }
          />
        </Grid>
        <Grid container justifyContent="center" pt="48px">
          <Button
            disabled={!canSubmit || !agreePrivacy || isProcessingPayment}
            type="submit"
            variant="contained"
            color="primary"
            style={{ minWidth: "200px" }}
          >
            {isProcessingPayment ? (
              <LoadingSpinner size={20} color="white" />
            ) : (
              "Submit"
            )}
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default PaymentElement;
