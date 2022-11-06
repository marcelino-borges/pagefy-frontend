import { useEffect, useState } from "react";
import Navigation from "../../components/navigation";
import PrivateRouteChecker from "../../components/private-route-checker";
import { loadStripe } from "@stripe/stripe-js";
import { ALLOW_PURCHASE, PRICES, STRIPE_PUBLIC_KEY } from "../../../constants";
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
  clearPrice,
  clearSubscription,
  setPrice,
  startSubscription,
} from "../../../store/purchase/actions";
import { useNavigate } from "react-router-dom";
import routes from "./../../../routes/paths";
import ThinWidthContent from "../../components/site-content/thin-width";
import { formatFloatingNumberFromInt } from "../../../utils";
import { ACESSIBILITY_RED, PRIMARY_COLOR } from "./../../../styles/colors";
import { Elements } from "@stripe/react-stripe-js";
import { getCurrencyPrefix } from "./utils";
import { setCurrency } from "./../../../store/purchase/actions";
import Footer from "../../components/footer";
import ReportIcon from "@mui/icons-material/Report";
import { getPlanNameByType } from "../../../utils/stripe";
import { showInfoToast } from "./../../../utils/toast/index";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const PurchasePlanPage = () => {
  const purchaseState = useSelector(
    (state: IApplicationState) => state.purchase
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [selectedRecurrency, setSelectedRecurrency] = useState<
    RecurrencyTypes | undefined
  >();
  const [isCreatingSubscription, setIsCreatingSubscription] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const [showPaymentElement, setShowPaymentElement] = useState(false);
  const [recurrencyError, setRecurrencyError] = useState("");
  const [showErrorOnPaymentElement, setShowErrorOnPaymentElement] =
    useState(false);

  useEffect(() => {
    return () => {
      dispatch(clearSubscription());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ALLOW_PURCHASE) {
      navigate(routes.root);
      showInfoToast(strings.sorryThisIsNotAvailable);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (purchaseState.error) {
      setShowErrorOnPaymentElement(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseState.error]);

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
    if (purchaseState.subscriptionCreated) {
      const secret: string | undefined =
        purchaseState.subscriptionCreated?.latestInvoice?.payment_intent
          ?.client_secret;

      if (secret === null) {
        setShowErrorOnPaymentElement(true);
      } else if (secret) {
        setClientSecret(secret);
      }
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
            currency: selectedCurrency,
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
      <Navigation />
      <ThinWidthContent pb="100px" center>
        {showErrorOnPaymentElement && (
          <Grid
            container
            margin="auto"
            direction="column"
            alignItems="center"
            gap="16px"
          >
            <Grid>
              <ReportIcon
                color="inherit"
                style={{ color: ACESSIBILITY_RED, fontSize: "80px" }}
              />
            </Grid>
            <Grid>
              {strings.subscriptionPayment.errorOnPaymentClientSecret}
            </Grid>
          </Grid>
        )}
        {!showErrorOnPaymentElement && !showPaymentElement && (
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
                purchaseState.plan ? getPlanNameByType(purchaseState.plan) : "",
                strings.youreCloserNowBecomeSubscriber,
              ]}
            />
            <SectionTitle>{strings.selectACurrency}</SectionTitle>
            <CurrencyContainer>
              <Select
                displayEmpty
                variant="outlined"
                onChange={(e: any) => {
                  setSelectedRecurrency(undefined);
                  setSelectedCurrency(e.target.value);
                  dispatch(setCurrency(e.target.value));
                  dispatch(clearPrice());
                }}
                value={selectedCurrency}
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
                    if (purchaseState.currency) {
                      dispatch(
                        setPrice(
                          formatFloatingNumberFromInt(
                            (PRICES.vip as any)[selectedCurrency].month
                          )
                        )
                      );
                    }
                  }}
                >
                  <CardColumn>{strings.recurrency.monthly}</CardColumn>
                  <CardColumn>
                    <strong>
                      {`${getCurrencyPrefix(selectedCurrency)} `}
                      {formatFloatingNumberFromInt(
                        (PRICES.vip as any)[selectedCurrency].month
                      )}
                    </strong>
                  </CardColumn>
                </RecurrencyCard>
                <RecurrencyCard
                  isSelected={selectedRecurrency === "year"}
                  onClick={() => {
                    setSelectedRecurrency("year");
                    if (selectedCurrency) {
                      dispatch(
                        setPrice(
                          formatFloatingNumberFromInt(
                            (PRICES.vip as any)[selectedCurrency].year
                          )
                        )
                      );
                    }
                  }}
                >
                  <CardColumn>{strings.recurrency.yearly}</CardColumn>
                  <CardColumn>
                    <strong>
                      {`${getCurrencyPrefix(selectedCurrency)} `}
                      {formatFloatingNumberFromInt(
                        (PRICES.vip as any)[selectedCurrency].year
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
                    if (selectedCurrency)
                      dispatch(
                        setPrice(
                          formatFloatingNumberFromInt(
                            (PRICES.platinum as any)[selectedCurrency].month
                          )
                        )
                      );
                  }}
                >
                  <CardColumn>{strings.recurrency.monthly}</CardColumn>
                  <CardColumn>
                    <strong>
                      {`${getCurrencyPrefix(selectedCurrency)} `}
                      {formatFloatingNumberFromInt(
                        (PRICES.platinum as any)[selectedCurrency].month
                      )}
                    </strong>
                  </CardColumn>
                </RecurrencyCard>
                <RecurrencyCard
                  isSelected={selectedRecurrency === "year"}
                  onClick={() => {
                    setSelectedRecurrency("year");
                    if (selectedCurrency)
                      dispatch(
                        setPrice(
                          formatFloatingNumberFromInt(
                            (PRICES.platinum as any)[selectedCurrency].year
                          )
                        )
                      );
                  }}
                >
                  <CardColumn>{strings.recurrency.yearly}</CardColumn>
                  <CardColumn>
                    <strong>
                      {`${getCurrencyPrefix(selectedCurrency)} `}
                      {formatFloatingNumberFromInt(
                        (PRICES.platinum as any)[selectedCurrency].year
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
                {isCreatingSubscription ? (
                  <LoadingSpinner color="grey" size={20} m="0px 0px 0px 32px" />
                ) : (
                  strings.checkout
                )}
              </Button>
            </Grid>
          </CheckoutContainer>
        )}
        {!showErrorOnPaymentElement && showPaymentElement && (
          <PaymentElementContainer>
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
                    currency={selectedCurrency}
                    changeToRecurrency={() => {
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
        )}
      </ThinWidthContent>
      <Footer />
    </>
  );
};

export default PurchasePlanPage;
