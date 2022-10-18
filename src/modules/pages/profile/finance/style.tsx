import {
  styled,
  TableContainer as MUITableContainer,
  TableRow,
} from "@mui/material";
import { LIGHTER_GREY, LIGHTEST_GREY } from "./../../../../styles/colors";

export const InteractiveRow = styled(({ index, children, ...rest }: any) => (
  <TableRow {...rest}>{children}</TableRow>
))(
  ({ index }) => `
  cursor: pointer;
  background-color: ${index % 2 !== 0 ? LIGHTEST_GREY : ""};
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;

  &:hover {
    background-color: ${LIGHTER_GREY};
    border-right: 3px solid grey;
  }
`
);

export const TableContainer = styled(({ index, children, ...rest }: any) => (
  <MUITableContainer {...rest}>{children}</MUITableContainer>
))(
  ({ index }) => `
  background-color: white;

  @media(max-width: 500px) {
    th, td {
      font-size: 0.7em;
      padding: 16px 4px;
    }
  }
`
);
