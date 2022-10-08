import { styled } from "@mui/material";
import { PRIMARY_COLOR } from "./../../../styles/colors";

export const CardRoot = styled(({ isFeatured, ...props }: any) => (
  <div {...props} />
))(
  ({ isFeatured }) => `
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis 0;
  box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
  border-radius: 10px;
  background-color: white;
  ${isFeatured && `border: 2px solid ${PRIMARY_COLOR};`}
  z-index: 900;

  @media (min-width: 750px) {
    width: calc(33% - 96px);
  }

  @media (min-width: 900px) {
    width: 100%;
  }
`
);

export const CardInner = styled(({ ...props }: any) => <div {...props} />)`
  line-height: 1.8em;
`;
