import { useEffect, useState } from "react";
import Header from "../../components/header";
import PrivateRouteChecker from "../../components/private-route-checker";
import { loadStripe } from "@stripe/stripe-js";
import { PRICES, STRIPE_PUBLIC_KEY } from "../../../constants";
import PaymentElement from "./payment-element";
import strings from "../../../localization";
import TriplePageTitle from "../../components/page-title";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import { PlansTypes } from "../../../store/user/types";
import { RecurrencyTypes } from "../../../store/purchase/types";
import { Button, Grid, MenuItem, Select } from "@mui/material";
import {
  CardColumn,
  CheckoutContainer,
  CurrencyContainer,
  PaymentElementContainer,
  RecurrencyCard,
  RecurrencyContainer,
  RecurrencyErrorText,
  SectionTitle,
} from "./style";
import LoadingSpinner from "../../components/loading-spinner";
import {
  cancelSubscriptionOnDatabase,
  startSubscription,
} from "../../../store/purchase/actions";
import { useNavigate } from "react-router-dom";
import routes from "./../../../routes/paths";
import ThinWidthContent from "../../components/site-content/thin-width";
import { formatFloatingNumberFromInt } from "../../../utils";
import {
  ACESSIBILITY_RED,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from "./../../../styles/colors";
import { Elements } from "@stripe/react-stripe-js";
import { getCurrencyPrefix } from "./utils";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const PurchasePlanPage = () => {
  const purchaseState = useSelector(
    (state: IApplicationState) => state.purchase
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [selectedRecurrency, setSelectedRecurrency] = useState<
    RecurrencyTypes | undefined
  >();
  const [isCreatingSubscription, setIsCreatingSubscription] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const [showPaymentElement, setShowPaymentElement] = useState(false);
  const [recurrencyError, setRecurrencyError] = useState("");

  useEffect(() => {
    if (purchaseState.plan === undefined) {
      navigate(routes.root);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseState.plan]);

  useEffect(() => {
    if (hasCheckedOut) {
      setTimeout(() => {
        setShowPaymentElement(true);
      }, 250);
    }
  }, [hasCheckedOut]);

  useEffect(() => {
    const secret: string | undefined =
      purchaseState.subscriptionCreated?.latestInvoice?.payment_intent
        ?.client_secret;

    if (secret) {
      setClientSecret(secret);
    }
  }, [purchaseState.subscriptionCreated]);

  const validateAndCheckout = () => {
    setRecurrencyError("");
    if (!selectedRecurrency && !isCreatingSubscription) {
      setRecurrencyError(strings.requiredFields);
      return;
    }

    setHasCheckedOut(true);
    const clearLoading = () => {
      setIsCreatingSubscription(false);
    };

    if (
      selectedRecurrency !== undefined &&
      purchaseState.plan &&
      !clientSecret
    ) {
      setIsCreatingSubscription(true);
      dispatch(
        startSubscription(
          {
            currency,
            recurrency: selectedRecurrency,
            planType: purchaseState.plan,
          },
          clearLoading,
          clearLoading
        )
      );
    }
  };

  return (
    <>
      <PrivateRouteChecker />
      <Header />
      <ThinWidthContent>
        {!showPaymentElement && (
          <CheckoutContainer
            style={{
              transform:
                hasCheckedOut && clientSecret ? "translateX(-3000px)" : "",
            }}
          >
            <TriplePageTitle
              increasingSize
              sizes={[1, 3, 0.8]}
              titles={[
                strings.thePlanYouSelectedIs,
                purchaseState.plan
                  ? Object.values(PlansTypes)[purchaseState.plan].toString()
                  : "",
                strings.youreCloserNowBecomeSubscriber,
              ]}
            />
            <SectionTitle>{strings.selectACurrency}</SectionTitle>
            <CurrencyContainer>
              <Select
                displayEmpty
                variant="outlined"
                onChange={(e: any) => {
                  setCurrency(e.target.value);
                }}
                value={currency}
                sx={{
                  minWidth: "125px",
                  width: "100%",
                  maxWidth: "500px",
                }}
              >
                <MenuItem value="usd">
                  <em>USD (U$)</em>
                </MenuItem>
                <MenuItem value="eur">
                  <em>EUR (€)</em>
                </MenuItem>
                <MenuItem value="brl">
                  <em>BRL (R$)</em>
                </MenuItem>
              </Select>
            </CurrencyContainer>
            <SectionTitle>{strings.selectARecurrency}</SectionTitle>
            {/* VIP */}
            {purchaseState.plan === PlansTypes.VIP && (
              <RecurrencyContainer>
                <RecurrencyCard
                  isSelected={selectedRecurrency === "month"}
                  onClick={() => {
                    setSelectedRecurrency("month");
                  }}
                >
                  <CardColumn>{strings.recurrency.monthly}</CardColumn>
                  <CardColumn>
                    <strong>
                      {`${getCurrencyPrefix(currency)} `}
                      {formatFloatingNumberFromInt(
                        (PRICES.vip as any)[currency].month
                      )}
                    </strong>
                  </CardColumn>
                </RecurrencyCard>
                <RecurrencyCard
                  isSelected={selectedRecurrency === "year"}
                  onClick={() => {
                    setSelectedRecurrency("year");
                  }}
                >
                  <CardColumn>{strings.recurrency.yearly}</CardColumn>
                  <CardColumn>
                    <strong>
                      {`${getCurrencyPrefix(currency)} `}
                      {formatFloatingNumberFromInt(
                        (PRICES.vip as any)[currency].year
                      )}
                    </strong>
                  </CardColumn>
                </RecurrencyCard>
              </RecurrencyContainer>
            )}
            {/* PLATINUM */}
            {purchaseState.plan === PlansTypes.PLATINUM && (
              <RecurrencyContainer gap="16px">
                <RecurrencyCard
                  isSelected={selectedRecurrency === "month"}
                  onClick={() => {
                    setSelectedRecurrency("month");
                  }}
                >
                  <CardColumn>{strings.recurrency.monthly}</CardColumn>
                  <CardColumn>
                    <strong>
                      {`${getCurrencyPrefix(currency)} `}
                      {formatFloatingNumberFromInt(
                        (PRICES.platinum as any)[currency].month
                      )}
                    </strong>
                  </CardColumn>
                </RecurrencyCard>
                <RecurrencyCard
                  isSelected={selectedRecurrency === "year"}
                  onClick={() => {
                    setSelectedRecurrency("year");
                  }}
                >
                  <CardColumn>{strings.recurrency.yearly}</CardColumn>
                  <CardColumn>
                    <strong>
                      {`${getCurrencyPrefix(currency)} `}
                      {formatFloatingNumberFromInt(
                        (PRICES.platinum as any)[currency].year
                      )}
                    </strong>
                  </CardColumn>
                </RecurrencyCard>
              </RecurrencyContainer>
            )}
            {recurrencyError && (
              <RecurrencyErrorText>{recurrencyError}</RecurrencyErrorText>
            )}
            <Grid
              container
              pt="100px"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={validateAndCheckout}
                style={{ minWidth: "200px" }}
              >
                {strings.checkout}
              </Button>
              {isCreatingSubscription && (
                <LoadingSpinner color="grey" size={30} m="0px 0px 0px 32px" />
              )}
            </Grid>
          </CheckoutContainer>
        )}
        {isCreatingSubscription && (
          <div
            style={{
              margin: "auto",
            }}
          >
            <LoadingSpinner size={40} color={SECONDARY_COLOR} />
          </div>
        )}
        <PaymentElementContainer
          style={{ transform: showPaymentElement ? "translateX(0px)" : "" }}
        >
          {selectedRecurrency &&
            purchaseState.plan &&
            !isCreatingSubscription &&
            clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  locale: strings.getLanguage() as any,
                  loader: "always",
                  fonts: [
                    {
                      family: "Montserrat",
                      src: "url(.src/assets/fonts/montserrat/Montserrat-VariableFont_wght.otf)",
                      weight: "400",
                    },
                  ],
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: PRIMARY_COLOR,
                      colorDanger: ACESSIBILITY_RED,
                      spacingUnit: "5px",
                      borderRadius: "8px",
                    },
                    labels: "floating",
                  },
                }}
              >
                <PaymentElement
                  planType={purchaseState.plan}
                  recurrency={selectedRecurrency}
                  currency={currency}
                  changeToRecurrency={() => {
                    console.log("oi");
                    setHasCheckedOut(false);
                    setShowPaymentElement(false);
                    if (purchaseState.subscriptionCreated?.subscriptionId)
                      dispatch(
                        cancelSubscriptionOnDatabase(
                          purchaseState.subscriptionCreated?.subscriptionId
                        )
                      );
                  }}
                />
              </Elements>
            )}
        </PaymentElementContainer>
      </ThinWidthContent>
    </>
  );
};

export default PurchasePlanPage;
