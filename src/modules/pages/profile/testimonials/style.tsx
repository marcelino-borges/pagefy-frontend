import { Icon } from "@iconify/react";
import { styled } from "@mui/material";
import { LIGHT_GREY } from "../../../../styles/colors";

export const StarIcon = styled(Icon)`
  color: ${LIGHT_GREY};
  cursor: pointer;
`;

export const RatingValue = styled("span")`
  font-size: 1.5em;
  font-weight: bold;
  margin-left: 8px;
`;
