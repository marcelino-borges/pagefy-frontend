import { Grid } from "@mui/material";
import { ComponentShadowStyle } from "../../../../../constants";
import { incrementComponentClicks } from "../../../../../store/page-renderer/actions";
import { IUserComponent } from "../../../../../store/user-pages/types";
import BaseComponentType from "../base";

interface ITextComponentProps {
  component: IUserComponent;
  pageId?: string | undefined;
}

const TextComponent = ({ component, pageId }: ITextComponentProps) => {
  return (
    <BaseComponentType
      url={component.url}
      layout={component.layout}
      style={component.style}
      animation={component.animation}
      width="100%"
      onClick={() => {
        if (pageId && component._id)
          incrementComponentClicks(pageId, component._id);
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        width="100%"
        style={{
          ...component.style,
          boxShadow: component.style?.boxShadow || ComponentShadowStyle.NONE,
        }}
      >
        {component.text}
      </Grid>
    </BaseComponentType>
  );
};

export default TextComponent;
