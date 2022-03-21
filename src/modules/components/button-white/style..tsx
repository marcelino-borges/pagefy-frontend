import { Link, styled } from "@mui/material";
import { PRIMARY_COLOR } from "./../../../styles/colors";

export const CustomLink = styled(({ ...props }: any) => <Link {...props} />)`
  background-color: white;
  color: ${PRIMARY_COLOR};
  padding: 8px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: ${PRIMARY_COLOR};
    color: white;
  }
`;
