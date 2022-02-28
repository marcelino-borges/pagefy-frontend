import styled from "@emotion/styled";
import { MEDIUM_GREY } from "../../../../../styles/colors";

export const IconOverlaySpan = styled("span")`
  color: ${MEDIUM_GREY};
  font-size: 20px;
  margin: 8px;

  &:hover svg {
    color: grey;
    opacity: 0.5;
  }
`;
