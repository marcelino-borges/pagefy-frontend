import { Grid } from "@mui/material";
import { IUserComponent } from "../../../../../store/user-pages/types";
import BaseComponentType from "../base";
import { incrementComponentClicks } from "../../../../../store/page-renderer/actions";
import { ComponentShadowStyle } from "../../../../../constants";

interface ITextImageComponentProps {
  component: IUserComponent;
  pageId?: string | undefined;
}

const TextImageComponent = ({
  component,
  pageId,
}: ITextImageComponentProps) => {
  const Content = ({ component }: ITextImageComponentProps) => {
    const { rows, columns } = component.layout;
    if (columns === 1) {
      if (rows === 1) {
        // 1C x 1R
        return (
          <Grid
            container
            style={{
              ...component.style,
              width: "100%",
              boxShadow:
                component.style?.boxShadow || ComponentShadowStyle.NONE,
            }}
          >
            <Grid
              container
              item
              xs={4}
              style={{
                backgroundImage: `url(${component.mediaUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: `${
                  component.style?.borderRadius || 0
                }px 0px 0px ${component.style?.borderRadius || 0}px`,
              }}
            ></Grid>
            <Grid
              container
              item
              xs={8}
              justifyContent="center"
              alignItems="center"
            >
              {component.text}
            </Grid>
          </Grid>
        );
      } else {
        // 1C x 2R
        return (
          <Grid
            container
            direction="column"
            style={{
              ...component.style,
              width: "100%",
              boxShadow:
                component.style?.boxShadow || ComponentShadowStyle.NONE,
            }}
          >
            <Grid
              container
              style={{
                backgroundImage: `url(${component.mediaUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: `${component.style?.borderRadius || 0}px ${
                  component.style?.borderRadius || 0
                }px 0px 0px`,
                height: "50%",
              }}
            ></Grid>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{
                height: "50%",
              }}
            >
              {component.text}
            </Grid>
          </Grid>
        );
      }
    } else {
      // 2C x 1R
      if (rows === 1) {
        return (
          <Grid
            container
            style={{
              ...component.style,
              width: "100%",
              boxShadow:
                component.style?.boxShadow || ComponentShadowStyle.NONE,
            }}
          >
            <Grid
              container
              item
              xs={6}
              style={{
                backgroundImage: `url(${component.mediaUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: `${
                  component.style?.borderRadius || 0
                }px 0px 0px ${component.style?.borderRadius || 0}px`,
              }}
            ></Grid>
            <Grid
              container
              item
              xs={6}
              justifyContent="center"
              alignItems="center"
            >
              {component.text}
            </Grid>
          </Grid>
        );
      } else {
        // 2C x 2R
        return (
          <Grid
            container
            style={{
              ...component.style,
              width: "100%",
              boxShadow:
                component.style?.boxShadow || ComponentShadowStyle.NONE,
            }}
          >
            <Grid
              container
              item
              xs={6}
              style={{
                backgroundImage: `url(${component.mediaUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: `${
                  component.style?.borderRadius || 0
                }px 0px 0px ${component.style?.borderRadius || 0}px`,
              }}
            ></Grid>
            <Grid container xs={6} justifyContent="center" alignItems="center">
              {component.text}
            </Grid>
          </Grid>
        );
      }
    }
  };
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
      <Content component={component} />
    </BaseComponentType>
  );
};

export default TextImageComponent;
