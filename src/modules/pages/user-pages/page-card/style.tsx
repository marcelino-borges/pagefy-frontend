import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Article, Label, Link, Visibility } from "@mui/icons-material";
import { PRIMARY_COLOR } from "../../../../styles/colors";

const smallBreakpoint = "550px";

export const Card = styled(Grid)`
  margin: 12px 0px;
  /* border: 1px solid #e9e9e9; */
  border-radius: 20px 0px 0px 20px;
  height: 250px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  position: relative;
  min-width: 270px;

  &:hover {
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.06);
  }
`;

export const CardOverlay = styled("div")`
  position: absolute;
  width: calc(100% - 2px);
  height: 100%;
  border-radius: 20px 0px 0px 20px;
  border: 0;
  transform: translateY(-2px);

  &:hover {
    border: 2px solid var(--primary);
    box-shadow: 10px 10px 50px rgba(0, 0, 0, 0.2);
  }
`;

export const PageImage = styled(Grid)`
  background-size: cover;
  background-position: center;
  height: 100%;
  border-radius: 20px 0px 0px 20px;
  border: 4px solid (--primary);

  @media (max-width: ${smallBreakpoint}) {
    display: none;
  }
`;

export const CardContent = styled(Grid)`
  padding: 50px 32px 50px 64px;

  @media (max-width: ${smallBreakpoint}) {
    padding-left: 32px;
    flex-grow: 1;
  }
`;

export const ElementIcon = styled(Label)`
  color: #bfbfbf;
  font-size: 20px;
  margin-right: 8px;
  transform: translateY(3px);
`;

export const LinkIcon = styled(Link)`
  color: #bfbfbf;
  font-size: 20px;
  margin-right: 8px;
  transform: translateY(3px);
`;

export const ViewsIcon = styled(Visibility)`
  color: #bfbfbf;
  font-size: 20px;
  margin-right: 8px;
  transform: translateY(3px);
`;

export const ArticleIcon = styled(Article)`
  transform: translateY(3px);
  margin-right: 16px;
`;

export const PageTitle = styled(Grid)`
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 32px;
  z-index: 100;
`;

export const EditPenIcon = styled(EditIcon)`
  color: #bfbfbf;
  font-size: 20px;
  margin-left: 6px;
  cursor: pointer;
  transform: translateY(3px);

  &:hover {
    color: ${PRIMARY_COLOR};
  }
`;

export const PageDataKey = styled("span")`
  color: #bbbbbb;
`;
