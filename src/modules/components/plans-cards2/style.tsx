import { styled } from "@mui/material";
import { GLOBAL_LIGHT_BG } from "../../../styles/colors";

export const FeaturedCardsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  background-color: ${GLOBAL_LIGHT_BG};
  padding: 100px 32px;

  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

export const List = styled("div")`
  list-style-type: none;
`;

export const ListItem = styled("div")`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 16px;
  font-weight: 400;
`;
