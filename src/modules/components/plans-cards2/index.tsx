import { v4 as uuidv4 } from "uuid";
import { Grid } from "@mui/material";
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
import { PRICES } from "../../../constants";
import FeaturedCard2 from "../feature-card2";
import { PRIMARY_COLOR_DARK } from "./../../../styles/colors";
import { Icon } from "@iconify/react";

interface IPlansCards2Props {
  px?: string;
  py?: string;
}

const PlansCards2 = ({ px, py }: IPlansCards2Props) => {
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

  const ListIcon = () => (
    <Icon
      width="18px"
      height="18px"
      overflow="initial"
      icon="akar-icons:check"
    />
  );

  return (
    <FeaturedCardsContainer
      style={{
        paddingLeft: px,
        paddingRight: px,
        paddingTop: py,
        paddingBottom: py,
      }}
    >
      {/*
       **
       ** FREE
       **
       **/}
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

      {/*
       **
       ** VIP
       **
       **/}
      <FeaturedCard2
        isFeatured
        row1={strings.vipPlan.name.toUpperCase()}
        row2={
          <Grid container justifyContent="center" fontSize="0.85em" pt="8px">
            {strings.currency}{" "}
            {strings.getLanguage() === "pt"
              ? formatFloatingNumberFromInt(PRICES.vip.brl.month)
              : formatFloatingNumberFromInt(PRICES.vip.usd.month)}
            /{strings.recurrency.month}
          </Grid>
        }
        row3={
          <Grid container justifyContent="center" fontSize="0.85em" pt="8px">
            {`${strings.or} `}
            {strings.currency}{" "}
            {strings.getLanguage() === "pt"
              ? formatFloatingNumberFromInt(PRICES.vip.brl.year)
              : formatFloatingNumberFromInt(PRICES.vip.usd.year)}
            /{strings.year}
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
            {strings.vipPlan.benefits.map((benefit: string) => (
              <ListItem key={benefit}>
                <ListIcon />
                <li key={uuidv4()} style={{ fontWeight: "600" }}>
                  {benefit}
                </li>
              </ListItem>
            ))}
          </List>
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
            bgColor={PRIMARY_COLOR}
            fontColor="white"
            width="100%"
            hoverBgColor={PRIMARY_COLOR_DARK}
          >
            {strings.purchase}
          </CustomButton>
        </Grid>
      </FeaturedCard2>

      {/*
       **
       ** PREMIUM
       **
       **/}
      <FeaturedCard2
        row1={strings.platinumPlan.name.toUpperCase()}
        row2={
          <Grid container justifyContent="center" fontSize="0.85em" pt="8px">
            {strings.currency}{" "}
            {strings.getLanguage() === "pt"
              ? formatFloatingNumberFromInt(PRICES.platinum.brl.month)
              : formatFloatingNumberFromInt(PRICES.platinum.usd.month)}
            /{strings.recurrency.month}
          </Grid>
        }
        row3={
          <Grid container justifyContent="center" fontSize="0.85em" pt="8px">
            {`${strings.or} `}
            {strings.currency}{" "}
            {strings.getLanguage() === "pt"
              ? formatFloatingNumberFromInt(PRICES.platinum.brl.year)
              : formatFloatingNumberFromInt(PRICES.platinum.usd.year)}
            /{strings.year}
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
            {strings.vipPlan.benefits.map((benefit: string) => (
              <ListItem key={benefit}>
                <ListIcon />
                <li key={uuidv4()}>{benefit}</li>
              </ListItem>
            ))}
            {strings.platinumPlan.benefits.map((benefit: string) => (
              <ListItem key={benefit}>
                <ListIcon />
                <li key={uuidv4()} style={{ fontWeight: "600" }}>
                  {benefit}
                </li>
              </ListItem>
            ))}
          </List>
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
            bgColor="unset"
            fontColor={PRIMARY_COLOR}
            borderColor={PRIMARY_COLOR}
            width="100%"
            hoverBgColor={PRIMARY_COLOR_DARK}
          >
            {strings.purchase}
          </CustomButton>
        </Grid>
      </FeaturedCard2>
    </FeaturedCardsContainer>
  );
};

export default PlansCards2;
