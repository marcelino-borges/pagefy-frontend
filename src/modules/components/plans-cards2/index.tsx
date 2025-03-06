import { v4 as uuidv4 } from "uuid";
import { Box, Grid, Stack } from "@mui/material";
import strings from "../../../localization";
import { FeaturedCardsContainer, List, ListItem } from "./style";
import CustomButton from "../button-custom";
import routes from "../../../routes/paths";
import { PRIMARY_COLOR } from "../../../styles/colors";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import { PlansTypes } from "../../../store/user/types";
import { setPlanTypeToSubscribe } from "../../../store/purchase/actions";
import { formatFloatingNumberFromInt } from "../../../utils";
import { PLANS } from "../../../constants";
import FeaturedCard2 from "../feature-card2";
import { PRIMARY_COLOR_DARK } from "./../../../styles/colors";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { getAllPlans } from "../../../services/payments";
import { SubscriptionPlan } from "../../../store/plans/types";

interface IPlansCards2Props {
  pl?: string;
  pr?: string;
  pt?: string;
  pb?: string;
}

const PlansCards2 = ({
  pl = "0px",
  pr = "0px",
  pt = "0px",
  pb = "0px",
}: IPlansCards2Props) => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [plansError, setPlansError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userState = useSelector((state: IApplicationState) => state.user);

  const loadSignUpOrPurchase = (
    planSelected: PlansTypes,
    price: string | undefined,
    currency: string | undefined
  ) => {
    dispatch(setPlanTypeToSubscribe(planSelected, price, currency));
    let destination = routes.signUp;
    if (userState.profile) destination = routes.purchasePlan;
    navigate(destination);
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
  }, []);

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
          <Grid container justifyContent="center" pt="32px">
            <CustomButton
              to={routes.signUp}
              bgColor="unset"
              fontColor={PRIMARY_COLOR}
              borderColor={PRIMARY_COLOR}
              width="100%"
              hoverBgColor={PRIMARY_COLOR_DARK}
              onClick={() => {
                loadSignUpOrPurchase(PlansTypes.FREE, undefined, undefined);
              }}
            >
              {strings.signUp}
            </CustomButton>
          </Grid>
        </FeaturedCard2>
      }

      {plans.map((plan) => {
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
              <CustomButton
                to={routes.signUp}
                bgColor="unset"
                fontColor={PRIMARY_COLOR}
                borderColor={PRIMARY_COLOR}
                width="100%"
                hoverBgColor={PRIMARY_COLOR_DARK}
                onClick={() => {
                  let planType = PlansTypes.FREE;

                  if (plan.name === PLANS.neon) planType = PlansTypes.NEON;
                  else if (plan.name === PLANS.boost)
                    planType = PlansTypes.BOOST;

                  loadSignUpOrPurchase(
                    planType,
                    formatFloatingNumberFromInt(yearPrice.unit_amount),
                    yearPrice.currency
                  );
                }}
              >
                {strings.subscribe}
              </CustomButton>
            </Grid>
          </FeaturedCard2>
        );
      })}
    </FeaturedCardsContainer>
  );
};

export default PlansCards2;
