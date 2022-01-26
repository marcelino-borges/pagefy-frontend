import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const Card = styled(Grid)`
  margin: 12px;
  padding: 16px;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  height: 125px;
  background-color: white;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
`;

export const PageImage = styled(Grid)`
  background-size: cover;
  background-position: center;
  width: 100px;
  height: 100%;
  border-radius: 12px;
  margin-right: 24px;
`;

export const PageTitle = styled(Grid)`
  font-weight: 700;
  margin-bottom: 8px;
`;

export const EditPenIcon = styled(EditIcon)`
  color: #bfbfbf;
  font-size: 20px;
  margin-left: 6px;
  cursor: pointer;
  transform: translateY(4px);
`;

export const PageDataKey = styled("span")`
  color: #bbbbbb;
`;
