import { Grid, styled } from "@mui/material";
import { PRIMARY_COLOR } from "../../../styles/colors";
import { SECONDARY_COLOR } from "./../../../styles/colors";

export const RecurrencyContainer = styled(Grid)`
  display: flex;
  flex-wrap: nowrap;
  margin-top: 32px;
  gap: 32px;

  @media (max-width: 307px) {
    flex-wrap: wrap;
  }
`;

export const RecurrencyCard = styled("div")(
  ({ isSelected }: { isSelected: boolean }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${isSelected ? "white" : PRIMARY_COLOR};
  background-color: ${isSelected ? PRIMARY_COLOR : "white"};
  border: 1px solid ${PRIMARY_COLOR};
  width: 50%;
  height: calc((100vw - 100px) / 4);
  min-width: 135px;
  max-height: 100px;
  min-height: 70px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 0.5rem 0.5rem rgb(18 38 63 / 3%);
  gap: 0px;

  &:hover {
    background-color: ${PRIMARY_COLOR};
    color: white;
  }

  @media (max-width: 307px) {
    width: 100%;
  }
`
);

export const CardRow = styled("div")`
  width: 100%;
`;
