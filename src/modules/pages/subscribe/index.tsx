import PrivateRouteChecker from "../../components/private-route-checker";
import Navigation from "../../components/navigation";
import { useParams } from "react-router-dom";
import strings from "../../../localization";
import TriplePageTitle from "../../components/page-title";
import FullWidthContent from "../../components/site-content/full-width";
import { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { createCheckoutSession, getPlanById } from "../../../services/payments";
import { Price, SubscriptionPlan } from "../../../store/plans/types";
import { showErrorToast } from "../../../utils/toast";
import { List, ListItem } from "../../components/plans-cards2/style";
import { Icon } from "@iconify/react";
import { ANALYTICS_EVENTS, CURRENCY_ABBREVIATIONS } from "../../../constants";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import { getCurrencyByLocale, toBase64 } from "../../../utils";
import images from "../../../assets/img";
import PAGES_ROUTES from "../../../routes/paths";
import { logAnalyticsEvent } from "../../../services/firebase-analytics";

const Subscribe = () => {
  const userState = useSelector((state: IApplicationState) => state.user);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { planId } = useParams();
  const [isFetchingPlan, setIsFetchingPlan] = useState(true);
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [plan, setPlan] = useState<SubscriptionPlan>();
  const [selectedPrice, setSelectedPrice] = useState<string>();

  const fetchPlanDetails = useCallback(async (planId: string) => {
    try {
      const res = await getPlanById(planId);
      setPlan(res.data);
    } catch (error) {
      console.log("Error fetching plan: ", error);
      showErrorToast("Erro ao buscar os detalhes do plano");
    }

    setIsFetchingPlan(false);
  }, []);

  useEffect(() => {
    logAnalyticsEvent(ANALYTICS_EVENTS.pageView, {
      page_path: PAGES_ROUTES.subscribe,
      page_title: "Subscribe",
      email: toBase64(userState?.profile?.email),
    });
  }, [userState?.profile?.email]);

  const createCheckout = async (priceId: string) => {
    if (!userState.profile) {
      showErrorToast("Entre para efetuar a assinatura.");
      return;
    }

    setIsCreatingCheckout(true);
    const lang = strings.getInterfaceLanguage();
    const currency = getCurrencyByLocale(lang);

    try {
      const res = await createCheckoutSession(
        priceId,
        userState.profile.email,
        currency,
        lang
      );

      const newSession = res.data;
      const paymentUrl = newSession.url;

      window.location.href = paymentUrl;
    } catch (error) {
      showErrorToast("Desculpa, tivemos um erro ao processar seu checkout.");
      setIsCreatingCheckout(false);
    }
  };

  useEffect(() => {
    if (planId?.length) fetchPlanDetails(planId);
  }, [planId, fetchPlanDetails]);

  if (!planId?.length) {
    return (
      <>
        <PrivateRouteChecker />
        <Navigation />
        <FullWidthContent pt="132px">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            color="red"
          >
            Plano inválido
          </Box>
        </FullWidthContent>
      </>
    );
  }

  const planName = `${strings.plan} ${plan?.name}`;

  const planFeatures = plan?.features
    ? (plan.features as any)[strings.getLanguage()]
    : undefined;

  const localizedFeatures = planFeatures ?? plan?.features.en;

  const buildPriceLabel = (price: Price) => {
    if (!plan) return "";

    const isYearly = price.recurring.interval === "year";

    const interval = isYearly
      ? strings.recurrency.yearly
      : strings.recurrency.monthly;

    const numberValue = Number(price.unit_amount / 100);
    const currencyAbbreviation = (CURRENCY_ABBREVIATIONS as any)[
      price.currency
    ];

    const value = `${currencyAbbreviation} ${numberValue.toFixed(2)}`;

    const monthlyPrice = plan.prices.find(
      (price) => price.recurring.interval === "month"
    );
    const diffToMonthlyPrice =
      monthlyPrice !== undefined
        ? (monthlyPrice.unit_amount / 100) * 12 - numberValue
        : 0;

    const discountForMonth =
      monthlyPrice !== undefined
        ? `${
            strings.discountOf
          } ${currencyAbbreviation} ${diffToMonthlyPrice.toFixed(2)} ${
            strings.perYear
          } ${strings.forMonthRecurrency}`
        : "";

    return (
      <Stack direction="column" gap="0px">
        <Stack direction="row" gap="3px" flexWrap="nowrap">
          <div>{interval}</div>
          <div>
            (
            <Box display="inline-flex" fontWeight={500}>
              {value}
            </Box>
            )
          </div>
        </Stack>
        {isYearly && (
          <Box fontSize="0.8em" color="gray" fontStyle="italic">
            {discountForMonth}
          </Box>
        )}
      </Stack>
    );
  };

  const renderSubmitLabel = () => {
    if (isCreatingCheckout) {
      return (
        <Stack direction="row" flexWrap="nowrap" gap="8px" alignItems="center">
          <div>
            <LoadingSpinner color="#0000001f" size={12} />
          </div>
          <div>{strings.processingCheckout}</div>
        </Stack>
      );
    }

    if (!selectedPrice?.length) {
      return strings.selectARecurrency;
    }

    return strings.subscribe;
  };

  return (
    <>
      <PrivateRouteChecker />
      <Navigation />
      <FullWidthContent
        sx={{
          paddingTop: {
            xs: "100px",
            md: "132px",
          },
          paddingLeft: {
            xs: "16px",
            md: "32px",
          },
          paddingRight: {
            xs: "16px",
            md: "32px",
          },
          paddingBottom: {
            xs: "16px",
            md: "32px",
          },
        }}
      >
        {isFetchingPlan && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            <LoadingSpinner color="primary" />
          </Box>
        )}

        {!isFetchingPlan && plan && (
          <Stack direction="column" gap="64px" pb="200px">
            <Stack
              direction="row"
              gap="16px"
              sx={{
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                justifyContent: {
                  xs: "unset",
                  md: "space-between",
                },
              }}
            >
              <TriplePageTitle
                colors={["black", "black", "black"]}
                weights={[400, 800, 600]}
                titles={[
                  strings.thePlanYouSelectedIs,
                  planName,
                  strings.subscribeNow,
                ]}
                sizes={[1, 2, 1]}
                increasingSize
              />
              <img
                src={plan.images[0]}
                alt={planName}
                height={isMobile ? "auto" : 101}
                width={isMobile ? "100%" : "auto"}
              />
            </Stack>

            <div>
              <TriplePageTitle
                titles={[strings.benefits]}
                baseSize={1.5}
                colors={["black"]}
              />

              <List
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {!!localizedFeatures?.length &&
                  localizedFeatures.map((benefit: string) => (
                    <ListItem key={benefit}>
                      <Icon
                        width="18px"
                        height="18px"
                        overflow="initial"
                        icon="akar-icons:check"
                      />
                      <li key={benefit}>{benefit}</li>
                    </ListItem>
                  ))}
              </List>
            </div>

            <div>
              <TriplePageTitle
                titles={[strings.selectARecurrency]}
                baseSize={1.5}
                colors={["black"]}
              />

              <RadioGroup
                aria-label="price"
                value={selectedPrice}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const value = event.target.value;

                  setSelectedPrice(value);
                }}
                style={{
                  display: "flex",
                  gap: "8px",
                }}
              >
                {plan.prices.map((price) => (
                  <FormControlLabel
                    key={price.id}
                    value={price.id}
                    control={<Radio />}
                    label={buildPriceLabel(price)}
                  />
                ))}
              </RadioGroup>
            </div>

            <Box
              fontSize="0.8rem"
              fontStyle="italic"
              display="flex"
              flexDirection="column"
              gap="16px"
            >
              {strings.subscribeRedirectStripeDisclaimer}
              <img
                src={images.poweredStripe}
                alt="Powered by Stripe"
                width={150}
                height="auto"
              />
            </Box>

            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              gap="16px"
            >
              <Button
                variant="contained"
                fullWidth={false}
                sx={{
                  minWidth: {
                    xs: "100%",
                    md: "200px",
                  },
                }}
                disabled={!selectedPrice?.length || isCreatingCheckout}
                onClick={() => {
                  if (selectedPrice?.length) createCheckout(selectedPrice);
                }}
              >
                {renderSubmitLabel()}
              </Button>
            </Box>
          </Stack>
        )}
      </FullWidthContent>
    </>
  );
};

export default Subscribe;
