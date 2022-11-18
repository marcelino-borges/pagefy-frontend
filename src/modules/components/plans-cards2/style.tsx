import { styled } from "@mui/material";
import { GLOBAL_LIGHT_BG } from "../../../styles/colors";

export const FeaturedCardsContainer = styled("div")`
  display: flex;
  flex-direction: row;
  background-color: ${GLOBAL_LIGHT_BG};
  gap: 0px;

  @media (max-width: 900px) {
    flex-wrap: wrap;
    gap: 50px;
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
