import { Grid } from "@mui/material";
import { IUserComponent } from "../../../../../store/user-pages/types";
import BaseComponentType from "../base";
import { incrementComponentClicks } from "../../../../../store/page-renderer/actions";
import { ComponentShadowStyle } from "../../../../../constants";

interface ITextOverImageComponentProps {
  component: IUserComponent;
  pageId?: string | undefined;
}

const TextOverImageComponent = ({
  component,
  pageId,
}: ITextOverImageComponentProps) => {
  return (
    <BaseComponentType
      url={component.url}
      layout={component.layout}
      style={component.style}
      animation={component.animation}
      onClick={() => {
        if (pageId && component._id)
          incrementComponentClicks(pageId, component._id);
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          backgroundImage: `url(${component.mediaUrl})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: component.style?.borderRadius || "0px",
          width: "100%",
          color: component.style?.color,
          boxShadow: component.style?.boxShadow || ComponentShadowStyle.NONE,
        }}
      >
        {component.text}
      </Grid>
    </BaseComponentType>
  );
};

export default TextOverImageComponent;
