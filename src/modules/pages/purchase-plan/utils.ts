import strings from "../../../localization";

export const translateErrorMessage = (
  error: string | null | undefined
): string => {
  if (!translateErrorMessage)
    return strings.subscriptionPayment.somethingWentWrong;

  switch (error) {
    case "Your card number is incomplete.":
      return strings.subscriptionPayment.cardNumberIncomplete;
    case "You cannot confirm this PaymentIntent because it has already succeeded after being previously confirmed.":
      return strings.subscriptionPayment.paymentAlreadySucceeded;
    case "succeeded":
      return strings.subscriptionPayment.succeeded;
    case "processing":
      return strings.subscriptionPayment.processing;
    case "requires_payment_method":
      return strings.subscriptionPayment.failed;
    case "firebase_token":
      return strings.generalErrors.internalError;
    default:
      return strings.subscriptionPayment.somethingWentWrong;
  }
};

export const getCurrencyPrefix = (currency: string) => {
  switch (currency) {
    case "usd":
      return "U$";
    case "eur":
      return "€";
    case "brl":
      return "R$";
  }
};
