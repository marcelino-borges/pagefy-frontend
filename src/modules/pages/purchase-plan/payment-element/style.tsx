import { styled } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";

export const StripePaymentElement = styled(PaymentElement)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  gap: 32px;

  div {
    width: 100%;
  }
`;
