import { styled } from "@mui/system";
import { MEDIUM_GREY, PRIMARY_COLOR } from "./../../../../styles/colors";
import { Link } from "react-router-dom";

export const UserName = styled("div")`
  font-weight: 500;
  color: ${MEDIUM_GREY};
  white-space: nowrap;
`;

export const SubtitleLinks = styled(Link)`
  color: ${PRIMARY_COLOR};
  font-size: 0.7em;
`;

export const SubtitleLinksNoUser = styled(Link)`
  color: ${PRIMARY_COLOR};
  font-size: 0.9em;
`;
