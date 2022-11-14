import { styled } from "@mui/material";
import { GLOBAL_LIGHT_BG } from "../../../styles/colors";

export const FeaturedCardsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  background-color: ${GLOBAL_LIGHT_BG};
  gap: 16px;
  padding: 100px 32px;

  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
`;
