import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPageByUrl } from "../../../store/page-renderer/actions";
import PageRendererContent from "./page-renderer-content";
import { ComponentType, IUserPage } from "../../../store/user/types";
import { IApplicationState } from "./../../../store/index";
import { CircularProgress, Grid } from "@mui/material";
import { PageName, PagePicture } from "./style";
import ImageComponent from "./component-types/image";
import TextComponent from "./component-types/text";
import TextImageComponent from "./component-types/text-image/index";
import IconsComponent from "./component-types/icon/index";
import VideoComponent from "./component-types/video/index";

const PageRenderer = () => {
  const dispatch = useDispatch();
  let { url } = useParams();

  const renderedPageState = useSelector(
    (state: IApplicationState) => state.pageRendered
  );

  const [page, setPage] = useState<IUserPage>();
  const [topComponents, setTopComponents] = useState<any[]>();
  const [middleComponents, setMiddleComponents] = useState<any[]>();
  const [bottomComponents, setBottomComponents] = useState<any[]>();

  useEffect(() => {
    if (url) {
      dispatch(getPageByUrl(url));
    }
  }, [dispatch, url]);

  useEffect(() => {
    if (renderedPageState.page) {
      setPage(renderedPageState.page);
    }
  }, [renderedPageState]);

  useEffect(() => {
    if (page) {
      if (page.topComponents && page.topComponents.length > 0) {
        setTopComponents([...page.topComponents]);
      }

      if (page.style && page.style.backgroundColor) {
        document.documentElement.style.backgroundColor =
          page.style.backgroundColor;
      }

      if (page.style && page.style.backgroundImage) {
        document.documentElement.style.backgroundImage =
          page.style.backgroundImage;
        document.documentElement.style.backgroundSize = "cover";
        document.documentElement.style.backgroundPosition = "center";
      }
    }

    return () => {
      document.documentElement.style.backgroundColor = "unset";
      document.documentElement.style.backgroundImage = "unset";
    };
  }, [page, page?.topComponents]);

  useEffect(() => {
    if (page && page.middleComponents && page.middleComponents.length > 0) {
      setMiddleComponents([...page.middleComponents]);
    }
  }, [page, page?.middleComponents]);

  useEffect(() => {
    if (page && page.bottomComponents && page.bottomComponents.length > 0) {
      setBottomComponents([...page.bottomComponents]);
    }
  }, [page, page?.bottomComponents]);

  const renderComponentByType = (component: any) => {
    const type: ComponentType = component.type;

    switch (type) {
      case ComponentType.Image:
        return <ImageComponent component={component} key={component._id} />;
      case ComponentType.Text:
        return <TextComponent component={component} />;
      case ComponentType.TextImage:
        return <TextImageComponent component={component} />;
      case ComponentType.Video:
        return <VideoComponent component={component} />;
    }
  };

  return (
    <PageRendererContent>
      {page ? (
        <Grid container>
          <Grid container item justifyContent="center">
            <PagePicture backgroundImage={page.pageImageUrl} />
          </Grid>
          <Grid container item justifyContent="center" pb="24px">
            <PageName>{page.name}</PageName>
          </Grid>

          {/* TOP COMPONENTS */}
          {topComponents && topComponents.length > 0 && (
            <IconsComponent iconsList={topComponents} />
          )}

          {/* MIDDLE COMPONENTS */}
          <Grid container item>
            {middleComponents && middleComponents.length > 0 && (
              <>
                {middleComponents &&
                  middleComponents.length > 0 &&
                  middleComponents.map((comp: any) =>
                    renderComponentByType(comp)
                  )}
              </>
            )}
          </Grid>

          {/* BOTTOM COMPONENTS */}
          <Grid container item>
            {bottomComponents && bottomComponents.length > 0 && (
              <IconsComponent iconsList={bottomComponents} />
            )}
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="center">
          {renderedPageState.error ? (
            <>{renderedPageState.error}</>
          ) : (
            <CircularProgress color="primary" />
          )}
        </Grid>
      )}
    </PageRendererContent>
  );
};

export default PageRenderer;
