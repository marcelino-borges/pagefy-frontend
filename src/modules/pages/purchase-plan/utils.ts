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
    case "failed":
    case "requires_payment_method":
      return strings.subscriptionPayment.failed;
    case "processing":
      return strings.subscriptionPayment.processing;
    case "declined":
      return strings.subscriptionPayment.declined;
    case "user_abort ":
      return strings.subscriptionPayment.userAbort;
    case "processing_error ":
      return strings.subscriptionPayment.processingError;
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
