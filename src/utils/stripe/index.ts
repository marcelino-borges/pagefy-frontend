import strings from "../../localization";

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
