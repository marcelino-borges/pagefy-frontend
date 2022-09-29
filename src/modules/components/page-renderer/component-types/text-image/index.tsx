import { Grid } from "@mui/material";
import { IUserComponent } from "../../../../../store/user-pages/types";
import { RENDERED_PAGE_COMPONENT_RADIUS } from "../../../../../constants";
import BaseComponentType from "../base";
import { incrementComponentClicks } from "../../../../../store/page-renderer/actions";

interface IProps {
  component: IUserComponent;
  pageId?: string | undefined;
}

const TextImageComponent = ({ component, pageId }: IProps) => {
  const Content = ({ component }: IProps) => {
    const { rows, columns } = component.layout;
    if (columns === 1) {
      if (rows === 1) {
        // 1C x 1R
        return (
          <Grid container style={{ width: "100%", height: "100%" }}>
            <Grid
              container
              item
              xs={4}
              style={{
                backgroundImage: `url(${component.mediaUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: `${RENDERED_PAGE_COMPONENT_RADIUS}px 0px 0px ${RENDERED_PAGE_COMPONENT_RADIUS}px`,
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
            style={{ width: "100%", height: "100%" }}
          >
            <Grid
              container
              style={{
                backgroundImage: `url(${component.mediaUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: `${RENDERED_PAGE_COMPONENT_RADIUS}px ${RENDERED_PAGE_COMPONENT_RADIUS}px 0px 0px`,
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
          <Grid container style={{ width: "100%", height: "100%" }}>
            <Grid
              container
              item
              xs={6}
              style={{
                backgroundImage: `url(${component.mediaUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: `${RENDERED_PAGE_COMPONENT_RADIUS}px 0px 0px ${RENDERED_PAGE_COMPONENT_RADIUS}px`,
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
          <Grid container style={{ width: "100%", height: "100%" }}>
            <Grid
              container
              item
              xs={6}
              style={{
                backgroundImage: `url(${component.mediaUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: `${RENDERED_PAGE_COMPONENT_RADIUS}px 0px 0px ${RENDERED_PAGE_COMPONENT_RADIUS}px`,
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
