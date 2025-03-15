import { v4 as uuidv4 } from "uuid";
import { Box, Button, Grid, Stack } from "@mui/material";
import strings from "../../../localization";
import { FeaturedCardsContainer, List, ListItem } from "./style";
import PAGES_ROUTES from "../../../routes/paths";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import FeaturedCard2 from "../feature-card2";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { SubscriptionPlan } from "../../../store/plans/types";
import { getAllPlans } from "../../../services/payments";
import { ANALYTICS_EVENTS } from "../../../constants";
import { logAnalyticsEvent } from "../../../services/firebase-analytics";
import { toBase64 } from "../../../utils";

interface IPlansCards2Props {
  pl?: string;
  pr?: string;
  pt?: string;
  pb?: string;
  featuredCardIndex?: number;
}

const PlansCards2 = ({
  pl = "0px",
  pr = "0px",
  pt = "0px",
  pb = "0px",
  featuredCardIndex = 0,
}: IPlansCards2Props) => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [plansError, setPlansError] = useState("");
  const navigate = useNavigate();

  const userState = useSelector((state: IApplicationState) => state.user);
  const isLoggedIn = !!userState.profile;

  const loadSignUpOrPurchase = (planId?: string) => {
    let route = "";

    if (isLoggedIn) {
      route = `${PAGES_ROUTES.subscribe}${planId?.length ? `/${planId}` : ""}`;
    } else {
      route = `${PAGES_ROUTES.signUp}${
        planId?.length ? `?planId=${planId}` : ""
      }`;
    }

    navigate(route);
  };

  const fetchPlans = async () => {
    try {
      const plans = await getAllPlans();

      if (!plans.data.length) {
        setPlansError(
          "Nenhum plano localizado. Tente atualizar a página ou voltar mais tarde."
        );
        return;
      }

      setPlans(plans.data);
    } catch (error: any) {
      setPlansError(
        "Desculpe, não conseguimos buscar os planos. Tente atualizar a página ou voltar mais tarde."
      );
    }
  };

  useEffect(() => {
    fetchPlans();

    logAnalyticsEvent(ANALYTICS_EVENTS.viewItemList, {
      item_list_name: "Plans cards",
      location: window.location.pathname,
      email: toBase64(userState.profile?.email),
    });
  }, [userState]);

  const ListIcon = () => (
    <Icon
      width="18px"
      height="18px"
      overflow="initial"
      icon="akar-icons:check"
    />
  );

  if (!plansError.length && !plans.length) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        mt="64px"
        fontStyle="italic"
      >
        Buscando planos...
      </Box>
    );
  }

  if (plansError.length) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        mt="64px"
        fontStyle="italic"
      >
        {plansError}
      </Box>
    );
  }

  return (
    <FeaturedCardsContainer
      style={{
        paddingLeft: pl,
        paddingRight: pr,
        paddingTop: pt,
        paddingBottom: pb,
      }}
    >
      {/*
       **
       ** FREE
       **
       **/}
      {
        <FeaturedCard2
          isFeatured={featuredCardIndex === 0}
          row1={strings.freePlan.name.toUpperCase()}
          row2={
            <Grid container justifyContent="center" fontSize="0.85em" pt="8px">
              {strings.currency} 0,00/{strings.recurrency.month}
            </Grid>
          }
          row3={
            <Grid container justifyContent="center" fontSize="0.85em" pt="8px">
              {strings.currency} 0,00/{strings.year}
            </Grid>
          }
        >
          <Grid container justifyContent="center">
            <List>
              {strings.freePlan.benefits.map((benefit: string) => (
                <ListItem key={benefit}>
                  <ListIcon />
                  <li key={uuidv4()}>{benefit}</li>
                </ListItem>
              ))}
            </List>
          </Grid>
          {!isLoggedIn && (
            <Grid container justifyContent="center" pt="32px">
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  logAnalyticsEvent(ANALYTICS_EVENTS.selectItem, {
                    item_list_id: "free",
                    item_list_name: "Free plan",
                    email: toBase64(userState.profile?.email),
                  });
                  loadSignUpOrPurchase();
                }}
              >
                {strings.signUp}
              </Button>
            </Grid>
          )}
        </FeaturedCard2>
      }

      {plans.map((plan, index) => {
        const monthPrice = plan.prices.find(
          (price) =>
            price.currency === "brl" && price.recurring.interval === "month"
        );
        const yearPrice = plan.prices.find(
          (price) =>
            price.currency === "brl" && price.recurring.interval === "year"
        );

        if (!monthPrice || !yearPrice) return null;

        const planFeatures = (plan.features as any)[strings.getLanguage()];

        const localizedFeatures = planFeatures ?? plan.features.en;

        return (
          <FeaturedCard2
            key={plan.id}
            isFeatured={featuredCardIndex === index + 1}
            row1={
              <Stack direction="column" alignItems="center" gap="8px">
                <div>
                  <img
                    src={plan.images[0]}
                    alt={plan.description}
                    height={50}
                    width="auto"
                  />
                </div>
                <div>{plan.name.toUpperCase()}</div>
              </Stack>
            }
            row2={
              <Grid
                container
                justifyContent="center"
                fontSize="0.85em"
                pt="8px"
              >
                {strings.currency}{" "}
                {Number(monthPrice.unit_amount / 100).toFixed(2)}/
                {strings.recurrency.month}
              </Grid>
            }
            row3={
              <Grid
                container
                justifyContent="center"
                fontSize="0.85em"
                pt="8px"
              >
                {strings.currency}{" "}
                {Number(yearPrice.unit_amount / 100).toFixed(2)}/{strings.year}
              </Grid>
            }
          >
            <Grid container justifyContent="center">
              <List>
                {localizedFeatures.map((benefit: string) => (
                  <ListItem key={benefit}>
                    <ListIcon />
                    <li key={uuidv4()}>{benefit}</li>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid container justifyContent="center" pt="32px">
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  logAnalyticsEvent(ANALYTICS_EVENTS.selectItem, {
                    item_list_id: plan.id,
                    item_list_name: plan.name,
                    email: toBase64(userState.profile?.email),
                  });
                  loadSignUpOrPurchase(plan.id);
                }}
              >
                {strings.subscribe}
              </Button>
            </Grid>
          </FeaturedCard2>
        );
      })}
    </FeaturedCardsContainer>
  );
};

export default PlansCards2;
