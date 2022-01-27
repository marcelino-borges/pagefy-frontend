import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Article, Label, Link, Visibility } from "@mui/icons-material";

export const Card = styled(Grid)`
  margin: 12px 0px;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  height: 175px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  position: relative;
  min-width: 270px;
`;

export const CardOverlay = styled("div")`
  position: absolute;
  width: calc(100% - 2px);
  height: 100%;
  border-radius: 5px;
  border: 0;
  transform: translateY(-3px);

  &:hover {
    border: 2px solid var(--primary);
  }
`;

export const PageImage = styled(Grid)`
  background-size: cover;
  background-position: center;
  width: 200px;
  height: 100%;
  border-radius: 5px 0px 0px 5px;
  margin-right: 24px;

  @media (max-width: 465px) {
    display: none;
  }
`;

export const CardContent = styled(Grid)`
  padding: 16px;

  @media (max-width: 465px) {
    padding-left: 32px;
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
  font-size: 1.3em;
  margin-bottom: 16px;
`;

export const EditPenIcon = styled(EditIcon)`
  color: #bfbfbf;
  font-size: 20px;
  margin-left: 6px;
  cursor: pointer;
  transform: translateY(3px);
`;

export const PageDataKey = styled("span")`
  color: #bbbbbb;
`;
