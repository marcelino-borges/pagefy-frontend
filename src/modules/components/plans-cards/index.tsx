import { v4 as uuidv4 } from "uuid";
import { Grid } from "@mui/material";
import strings from "../../../localization";
import FeaturedCard from "../feature-card";
import { FeaturedCardsContainer } from "./style";
import CustomButton from "../button-custom";
import routes from "../../../routes/paths";
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SECONDARY_COLOR_DARK,
} from "../../../styles/colors";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import { PlansTypes } from "../../../store/user/types";
import { setPlanTypeToSubscribe } from "../../../store/purchase/actions";
import { formatFloatingNumberFromInt } from "../../../utils";
import { PRICES } from "../../../constants";

interface IPlansCardsProps {
  px?: string;
}

const PlansCards = ({ px }: IPlansCardsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userState = useSelector((state: IApplicationState) => state.user);

  const loadSignUpOrPurchase = (planSelected: PlansTypes) => {
    dispatch(setPlanTypeToSubscribe(planSelected));
    let destination = routes.signUp;
    if (userState.profile) destination = routes.purchasePlan;
    navigate(destination);
  };

  return (
    <FeaturedCardsContainer
      style={px ? { paddingLeft: px, paddingRight: px } : undefined}
    >
      <FeaturedCard
        overTitle={strings.plan}
        title={strings.freePlan.name.toUpperCase()}
      >
        <Grid container justifyContent="center">
          <ul>
            {strings.freePlan.benefits.map((benefit: string) => (
              <li key={uuidv4()}>{benefit}</li>
            ))}
          </ul>
        </Grid>
        <Grid container justifyContent="center" pt="32px">
          <CustomButton
            to={routes.signUp}
            bgColor={SECONDARY_COLOR}
            fontColor="white"
            width="100%"
            hoverBgColor={SECONDARY_COLOR_DARK}
            onClick={() => {
              loadSignUpOrPurchase(PlansTypes.FREE);
            }}
          >
            {strings.signUp}
          </CustomButton>
        </Grid>
      </FeaturedCard>
      <FeaturedCard
        isFeatured
        overTitle={strings.plan}
        title={strings.vipPlan.name.toUpperCase()}
      >
        <Grid container justifyContent="center">
          <ul>
            {strings.freePlan.benefits.map((benefit: string) => (
              <li key={uuidv4()}>{benefit}</li>
            ))}
            {strings.vipPlan.benefits.map((benefit: string) => (
              <li key={uuidv4()} style={{ color: PRIMARY_COLOR }}>
                {benefit}
              </li>
            ))}
          </ul>
        </Grid>
        <Grid container justifyContent="center" pt="32px">
          <CustomButton
            to={routes.signUp}
            onClick={() => {
              loadSignUpOrPurchase(PlansTypes.VIP);
            }}
            bgColor={SECONDARY_COLOR}
            fontColor="white"
            width="100%"
            hoverBgColor={SECONDARY_COLOR_DARK}
          >
            {strings.purchase}
          </CustomButton>
        </Grid>
        <Grid container justifyContent="center" fontSize="0.85em" pt="8px">
          <i>
            {strings.currency}{" "}
            {formatFloatingNumberFromInt(PRICES.vip.usd.year)}/{strings.year}
          </i>
        </Grid>
      </FeaturedCard>
      <FeaturedCard
        overTitle={strings.plan}
        title={strings.platinumPlan.name.toUpperCase()}
      >
        <Grid container justifyContent="center">
          <ul>
            {strings.freePlan.benefits.map((benefit: string) => (
              <li key={uuidv4()}>{benefit}</li>
            ))}
            {strings.vipPlan.benefits.map((benefit: string) => (
              <li key={uuidv4()}>{benefit}</li>
            ))}
            {strings.platinumPlan.benefits.map((benefit: string) => (
              <li key={uuidv4()} style={{ color: PRIMARY_COLOR }}>
                {benefit}
              </li>
            ))}
          </ul>
        </Grid>
        <Grid container justifyContent="center" pt="32px">
          <CustomButton
            to={routes.signUp}
            onClick={() => {
              loadSignUpOrPurchase(PlansTypes.PLATINUM);
            }}
            bgColor={SECONDARY_COLOR}
            fontColor="white"
            width="100%"
            hoverBgColor={SECONDARY_COLOR_DARK}
          >
            {strings.purchase}
          </CustomButton>
        </Grid>
        <Grid container justifyContent="center" fontSize="0.85em" pt="8px">
          <i>
            {strings.currency}{" "}
            {formatFloatingNumberFromInt(PRICES.platinum.usd.year)}/
            {strings.year}
          </i>
        </Grid>
      </FeaturedCard>
    </FeaturedCardsContainer>
  );
};

export default PlansCards;
