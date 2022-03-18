import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { incrementComponentClicks } from "../../../../../store/page-renderer/actions";
import { IUserComponent } from "../../../../../store/user-pages/types";
import BaseComponentType from "../base";

interface IProps {
  component: IUserComponent;
  pageId?: string | undefined;
}

const TextComponent = ({ component, pageId }: IProps) => {
  const dispatch = useDispatch();
  return (
    <BaseComponentType
      url={component.url}
      layout={component.layout}
      style={component.style}
      animation={component.animation}
      onClick={() => {
        if (pageId && component._id)
          dispatch(incrementComponentClicks(pageId, component._id));
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        {component.text}
      </Grid>
    </BaseComponentType>
  );
};

export default TextComponent;
