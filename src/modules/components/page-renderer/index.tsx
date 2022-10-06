import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPageBeingRendered,
  getRendererPageByUrl,
  setPageBeingRendered,
} from "../../../store/page-renderer/actions";
import PageRendererContent from "./page-renderer-content";
import {
  ComponentType,
  IUserComponent,
  IUserPage,
} from "../../../store/user-pages/types";
import { IApplicationState } from "./../../../store/index";
import { Grid } from "@mui/material";
import { PageName, PagePicture } from "./style";
import ImageComponent from "./component-types/image";
import TextComponent from "./component-types/text";
import TextImageComponent from "./component-types/text-image/index";
import IconsComponent from "./component-types/icon/index";
import VideoComponent from "./component-types/video/index";
import strings from "../../../localization";
import LaunchComponent from "./component-types/launch/index";
import Logos from "./../../../assets/img/logos";
import routes from "./../../../routes/paths";
import LoadingSpinner from "../loading-spinner";
import { PRIMARY_COLOR } from "./../../../styles/colors";
import InternalLink from "../internal-link";
import {
  createOpenGraphTags,
  getOpenGraphTags,
} from "../../../utils/open-graph";
import { Helmet } from "react-helmet";
import { APP_ENVIROMENT } from "../../../constants";

interface IPageRendererProps {
  pageToRender?: IUserPage;
  isPagePreview?: boolean;
}

const PageRenderer = ({ pageToRender, isPagePreview }: IPageRendererProps) => {
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
    if (pageToRender) {
      dispatch(setPageBeingRendered(pageToRender));
      document.title = pageToRender.name;

      createOpenGraphTags(pageToRender, document);
    } else if (url) {
      dispatch(
        getRendererPageByUrl(url, (pageFound: any) => {
          if (pageFound) dispatch(setPageBeingRendered(pageFound));
        })
      );
    }
  }, [dispatch, pageToRender, url]);

  useEffect(() => {
    if (
      !page &&
      renderedPageState.page &&
      (renderedPageState.page.isPublic || isPagePreview)
    ) {
      setPage(renderedPageState.page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        document.documentElement.style.height = "100vh";
        document.documentElement.style.backgroundImage =
          page.style.backgroundImage;
        document.documentElement.style.backgroundSize = "auto 100%";
        document.documentElement.style.backgroundPosition = "center";
        document.documentElement.style.backgroundAttachment = "fixed";
      }
    }

    return () => {
      document.documentElement.style.backgroundColor = "unset";
      document.documentElement.style.backgroundImage = "unset";
      document.documentElement.style.backgroundAttachment = "unset";
      dispatch(clearPageBeingRendered());
    };
  }, [dispatch, page, page?.topComponents]);

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
        return (
          <ImageComponent
            pageId={page?._id}
            component={component}
            key={component._id}
          />
        );
      case ComponentType.Text:
        return (
          <TextComponent
            pageId={page?._id}
            component={component}
            key={component._id}
          />
        );
      case ComponentType.TextImage:
        return (
          <TextImageComponent
            pageId={page?._id}
            component={component}
            key={component._id}
          />
        );
      case ComponentType.Video:
        return (
          <VideoComponent
            pageId={page?._id}
            component={component}
            key={component._id}
          />
        );
      case ComponentType.Launch:
        return (
          <LaunchComponent
            pageId={page?._id}
            component={component}
            key={component._id}
          />
        );
    }
  };

  return (
    <>
      <Helmet>
        {pageToRender &&
          getOpenGraphTags(pageToRender, document).map(
            (tag: React.ReactElement) => tag
          )}
        <title>{pageToRender?.name || ""}</title>
        <meta property="og:title" content={pageToRender?.name || ""} />
        <meta
          property="og:url"
          content={(() => {
            let urlNormalized = "";

            if (pageToRender?.url[0] !== "/")
              urlNormalized = "/" + pageToRender?.url || "";
            else urlNormalized = pageToRender?.url || "";

            return (
              (APP_ENVIROMENT === "PROD"
                ? "https://socialbio.me"
                : "https://socialbio-frontend-dev.me") + urlNormalized
            );
          })()}
        />
        <meta property="og:image" content={pageToRender?.pageImageUrl || ""} />
        <meta property="og:image:alt" content={pageToRender?.name || ""} />
        <meta
          property="og:image:type"
          content="image/jpeg, image/png, image/jpg, image/gif, image/webp"
        />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
      </Helmet>
      <PageRendererContent>
        {renderedPageState.loading && <LoadingSpinner color={PRIMARY_COLOR} />}
        {!isPagePreview &&
          !renderedPageState.loading &&
          (!page || !page.isPublic) && (
            <Grid container p="12px">
              <Grid container justifyContent="center">
                <InternalLink to={routes.root}>
                  <img
                    src={Logos.LogoVerticalLightBGPNG}
                    style={{ width: "100%", maxWidth: "300px" }}
                    alt="Logo Social Bio"
                  />
                </InternalLink>
              </Grid>
              <Grid
                container
                item
                justifyContent="center"
                textAlign="center"
                pt="200px"
              >
                {strings.warningPrivatePage}
              </Grid>
              <Grid container justifyContent="center" pt="50px">
                <Grid container justifyContent="center">
                  <InternalLink to={routes.root}>
                    {strings.createNowYourPage}
                  </InternalLink>
                </Grid>
              </Grid>
            </Grid>
          )}
        {!renderedPageState.loading &&
          page &&
          (page.isPublic || isPagePreview) && (
            <Grid container>
              <Grid container item justifyContent="center">
                <PagePicture backgroundImage={page.pageImageUrl} />
              </Grid>
              <Grid
                container
                item
                justifyContent="center"
                pb="24px"
                color={page.style?.color || "black"}
              >
                <PageName>{page.name}</PageName>
              </Grid>

              {/* TOP COMPONENTS */}
              {topComponents && topComponents.length > 0 && (
                <IconsComponent
                  pageId={page._id}
                  isRenderer
                  iconsList={topComponents}
                />
              )}

              {/* MIDDLE COMPONENTS */}
              <Grid container item>
                {middleComponents && middleComponents.length > 0 && (
                  <>
                    {middleComponents &&
                      middleComponents.length > 0 &&
                      middleComponents.map((comp: IUserComponent) => {
                        if (
                          comp.visible &&
                          (!comp.visibleDate ||
                            new Date(comp.visibleDate) >= new Date())
                        ) {
                          return renderComponentByType(comp);
                        }
                        return null;
                      })}
                  </>
                )}
              </Grid>

              {/* BOTTOM COMPONENTS */}
              <Grid container item>
                {bottomComponents && bottomComponents.length > 0 && (
                  <IconsComponent isRenderer iconsList={bottomComponents} />
                )}
              </Grid>
              <Grid container item justifyContent="center">
                <Link to={routes.root}>
                  <Grid
                    item
                    mt="150px"
                    bgcolor="#ffffff80"
                    p="8px"
                    borderRadius="8px"
                  >
                    <img
                      src={Logos.LogoHorizontalLightBGPNG}
                      alt="Socialbio.me"
                      width="150px"
                    />
                  </Grid>
                </Link>
              </Grid>
            </Grid>
          )}
      </PageRendererContent>
    </>
  );
};

export default PageRenderer;
