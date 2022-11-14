import { v4 as uuidv4 } from "uuid";
import { Grid } from "@mui/material";
import strings from "../../../localization";
import FeaturedCard1 from "../feature-card1";
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

interface IPlansCards1Props {
  px?: string;
  py?: string;
}

const PlansCards1 = ({ px, py }: IPlansCards1Props) => {
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

  return (
    <FeaturedCardsContainer
      style={{
        paddingLeft: px,
        paddingRight: px,
        paddingTop: py,
        paddingBottom: py,
      }}
    >
      <FeaturedCard1
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
              loadSignUpOrPurchase(PlansTypes.FREE, undefined, undefined);
            }}
          >
            {strings.signUp}
          </CustomButton>
        </Grid>
      </FeaturedCard1>
      <FeaturedCard1
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
              loadSignUpOrPurchase(
                PlansTypes.VIP,
                formatFloatingNumberFromInt(PRICES.vip.usd.year),
                "usd"
              );
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
            {strings.getLanguage() === "pt"
              ? formatFloatingNumberFromInt(PRICES.vip.brl.month)
              : formatFloatingNumberFromInt(PRICES.vip.usd.month)}
            /{strings.recurrency.month} or {strings.currency}{" "}
            {strings.getLanguage() === "pt"
              ? formatFloatingNumberFromInt(PRICES.vip.brl.year)
              : formatFloatingNumberFromInt(PRICES.vip.usd.year)}
            /{strings.year}
          </i>
        </Grid>
      </FeaturedCard1>
      <FeaturedCard1
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
              loadSignUpOrPurchase(
                PlansTypes.PLATINUM,
                formatFloatingNumberFromInt(PRICES.platinum.usd.year),
                "usd"
              );
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
            {strings.getLanguage() === "pt"
              ? formatFloatingNumberFromInt(PRICES.platinum.brl.month)
              : formatFloatingNumberFromInt(PRICES.platinum.usd.month)}
            /{strings.recurrency.month} or {strings.currency}{" "}
            {strings.getLanguage() === "pt"
              ? formatFloatingNumberFromInt(PRICES.platinum.brl.year)
              : formatFloatingNumberFromInt(PRICES.platinum.usd.year)}
            /{strings.year}
          </i>
        </Grid>
      </FeaturedCard1>
    </FeaturedCardsContainer>
  );
};

export default PlansCards1;
