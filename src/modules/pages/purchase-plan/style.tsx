import { Grid, styled } from "@mui/material";
import { ACESSIBILITY_RED, LIGHT_GREY } from "../../../styles/colors";
import { SECONDARY_COLOR } from "./../../../styles/colors";

export const RecurrencyContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  margin-top: 16px;
  gap: 32px;
  flex-wrap: wrap;
`;

export const RecurrencyCard = styled(
  ({ isSelected, children, ...rest }: any) => <div {...rest}>{children}</div>
)(
  ({ isSelected }: { isSelected: boolean }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${isSelected ? "white" : SECONDARY_COLOR};
  background-color: ${isSelected ? SECONDARY_COLOR : "white"};
  border: 1px solid ${LIGHT_GREY};
  width: 100%;
  height: calc((100vw - 100px) / 4);
  min-width: 125px;
  max-width: 500px;
  max-height: 100px;
  min-height: 70px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 0.5rem 0.5rem rgb(18 38 63 / 3%);
  gap: 0px;

  &:hover {
    background-color: ${isSelected ? SECONDARY_COLOR : "white"};
    border: 1px solid ${SECONDARY_COLOR};
  }
`
);

export const CardColumn = styled("div")`
  width: 100%;
`;

export const RecurrencyErrorText = styled("div")`
  margin-top: 32px;
  width: 100%;
  display: block;
  color: ${ACESSIBILITY_RED};
`;

export const CheckoutContainer = styled("div")`
  transition: transform linear 0.25s;
`;

export const PaymentElementContainer = styled("div")`
  transform: translateX(3000px);
  transition: transform linear 0.25s;
`;

export const SectionTitle = styled("div")`
  font-weight: 800;
  font-size: 1.3em;
  margin-top: 50px;
  margin-bottom: 16px;
  text-align: center;
`;

export const CurrencyContainer = styled("div")`
  text-align: center;
`;
