import { Grid } from "@mui/material";
import { IUserComponent } from "../../../../../store/user/types";
import BaseComponentType from "../base";

interface IProps {
  component: IUserComponent;
}

const TextComponent = ({ component }: IProps) => {
  return (
    <BaseComponentType layout={component.layout} style={component.style}>
      <Grid container justifyContent="center" alignItems="center">
        {component.text}
      </Grid>
    </BaseComponentType>
  );
};

export default TextComponent;
