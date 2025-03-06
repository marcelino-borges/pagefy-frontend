import strings from "../../localization";
import { PlansTypes } from "../../store/user/types";

export const getPlanByPriceId = (priceId: string) => {
  if (
    priceId === "price_1LrhKuJd6mDEaHvNsxKOzxOs" ||
    priceId === "price_1LrhKuJd6mDEaHvNbBIEue6O"
  )
    return PlansTypes.NEON;
  else if (
    priceId === "price_1LrhNxJd6mDEaHvNQAJk9Poq" ||
    priceId === "price_1LrhNxJd6mDEaHvNbisiwqV5"
  )
    return PlansTypes.BOOST;
  else return PlansTypes.FREE;
};

export const getPlanNameByType = (type: PlansTypes): any => {
  return Object.values(PlansTypes)[type].toString();
};

export const getPlanNameByPriceId = (priceId: string): any => {
  const planType: PlansTypes = getPlanByPriceId(priceId);
  return getPlanNameByType(planType);
};

export const translateStatus = (status: string) => {
  switch (status) {
    case "incomplete":
      return strings.subscriptionPayment.subscriptionStatuses.incomplete;
    case "canceled":
      return strings.subscriptionPayment.subscriptionStatuses.canceled;
    case "paid":
      return strings.subscriptionPayment.subscriptionStatuses.paid;
    case "succeeded":
      return strings.subscriptionPayment.subscriptionStatuses.succeeded;
    default:
      return strings.unknown;
  }
};

export const getRecurrency = (recur: string) =>
  recur === "month" ? strings.recurrency.monthly : strings.recurrency.yearly;
