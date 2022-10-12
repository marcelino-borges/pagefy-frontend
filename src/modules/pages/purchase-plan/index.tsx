import { useEffect, useState } from "react";
import Header from "../../components/header";
import PrivateRouteChecker from "../../components/private-route-checker";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLIC_KEY } from "../../../constants";
import PaymentElement from "./payment-element";
import { createSubscription } from "../../../services/payments";
import strings from "../../../localization";
import TriplePageTitle from "../../components/page-title";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import { PlansTypes } from "../../../store/user/types";
import FullWidthContent from "../../components/site-content/full-width";
import { RecurrencyTypes } from "../../../store/purchase/types";
import { Grid, MenuItem, Select } from "@mui/material";
import { CardRow, RecurrencyCard, RecurrencyContainer } from "./style";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const PRICES = {
  // TODO: buscar de collection de configs do mongo
  vip: {
    eur: {
      month: 990,
      year: 9990,
    },
    usd: {
      month: 990,
      year: 9990,
    },
    brl: {
      month: 1990,
      year: 19990,
    },
  },
  platinum: {
    eur: {
      month: 1990,
      year: 19990,
    },
    usd: {
      month: 1990,
      year: 19990,
    },
    brl: {
      month: 3990,
      year: 39990,
    },
  },
};

const PurchasePlanPage = () => {
  const purchaseState = useSelector(
    (state: IApplicationState) => state.purchase
  );

  const [clientSecret, setClientSecret] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [selectedRecurrency, setSelectedRecurrency] = useState<
    RecurrencyTypes | undefined
  >();

  const getCurrencyPrefix = (currency: string) => {
    switch (currency) {
      case "usd":
        return "U$";
      case "eur":
        return "€";
      case "brl":
        return "R$";
    }
  };

  const formatFloatingNumberFromInt = (int: number) => {
    const asString: string = String(int);
    return (
      asString.slice(0, asString.length - 2) +
      "," +
      asString.slice(asString.length - 2, asString.length)
    );
  };

  useEffect(() => {
    // setCurrency();
    // createSubscription();
  }, []);

  return (
    <>
      <PrivateRouteChecker />
      <Header />
      <FullWidthContent>
        <TriplePageTitle
          increasingSize
          sizes={[1, 3, 0.8]}
          titles={[
            strings.thePlanYouSelectedIs,
            purchaseState.plan
              ? Object.values(PlansTypes)[purchaseState.plan].toString()
              : "",
            strings.nowChooseTheRecurrency,
          ]}
        />
        {strings.selectACurrency}
        <Select
          displayEmpty
          variant="outlined"
          onChange={(e: any) => {
            setCurrency(e.target.value);
          }}
          value={currency}
          sx={{ minWidth: "100px", marginTop: "32px" }}
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
        {/* VIP */}
        {purchaseState.plan === PlansTypes.VIP && (
          <RecurrencyContainer>
            <RecurrencyCard
              isSelected={selectedRecurrency === "month"}
              onClick={() => {
                setSelectedRecurrency("month");
              }}
            >
              <CardRow>{strings.recurrency.monthly}</CardRow>
              <CardRow>
                <strong>
                  {`${getCurrencyPrefix(currency)} `}
                  {formatFloatingNumberFromInt(
                    (PRICES.vip as any)[currency].month
                  )}
                </strong>
              </CardRow>
            </RecurrencyCard>
            <RecurrencyCard
              isSelected={selectedRecurrency === "year"}
              onClick={() => {
                setSelectedRecurrency("year");
              }}
            >
              <CardRow>{strings.recurrency.yearly}</CardRow>
              <CardRow>
                <strong>
                  {`${getCurrencyPrefix(currency)} `}
                  {formatFloatingNumberFromInt(
                    (PRICES.vip as any)[currency].year
                  )}
                </strong>
              </CardRow>
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
              <CardRow>{strings.recurrency.monthly}</CardRow>
              <CardRow>
                <strong>
                  {`${getCurrencyPrefix(currency)} `}
                  {formatFloatingNumberFromInt(
                    (PRICES.platinum as any)[currency].month
                  )}
                </strong>
              </CardRow>
            </RecurrencyCard>
            <RecurrencyCard
              isSelected={selectedRecurrency === "year"}
              onClick={() => {
                setSelectedRecurrency("year");
              }}
            >
              <CardRow>{strings.recurrency.yearly}</CardRow>
              <CardRow>
                <strong>
                  {`${getCurrencyPrefix(currency)} `}
                  {formatFloatingNumberFromInt(
                    (PRICES.platinum as any)[currency].year
                  )}
                </strong>
              </CardRow>
            </RecurrencyCard>
          </RecurrencyContainer>
        )}
        {clientSecret && (
          <PaymentElement
            stripePromise={stripePromise}
            options={{
              clientSecret,
            }}
          />
        )}
      </FullWidthContent>
    </>
  );
};

export default PurchasePlanPage;
