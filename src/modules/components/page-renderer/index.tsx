import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
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
import { Helmet } from "react-helmet";
import { APP_ENVIROMENT } from "../../../constants";
import TextOverImageComponent from "./component-types/text-over-image/index";
import ButtonScrollUp from "../button-scroll-up";
import MapComponent from "./component-types/map";
import SpotifyComponent from "./component-types/spotify";
import ProgressBarComponent from "./component-types/progress-bar";
import CountersComponent from "./component-types/counters";

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
        document.documentElement.style.backgroundPosition = "center";
        document.documentElement.style.backgroundAttachment = "fixed";

        if (window.innerWidth < 600) {
          document.documentElement.style.backgroundSize = "auto 100%";
        } else {
          document.documentElement.style.backgroundSize = "cover";
        }
      }
    }

    return () => {
      document.documentElement.style.backgroundPosition = "unset";
      document.documentElement.style.backgroundColor = "unset";
      document.documentElement.style.backgroundImage = "unset";
      document.documentElement.style.backgroundAttachment = "unset";
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

  const renderButtonByType = (component: any) => {
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
            isPagePreview={isPagePreview}
          />
        );
      case ComponentType.TextOverImage:
        return (
          <TextOverImageComponent
            pageId={page?._id}
            component={component}
            key={component._id}
          />
        );
      case ComponentType.Map:
        return (
          <MapComponent
            pageId={page?._id}
            component={component}
            fontColor={page?.style?.color}
            key={component._id}
          />
        );
      case ComponentType.Spotify:
        return (
          <SpotifyComponent
            pageId={page?._id}
            component={component}
            fontColor={page?.style?.color}
            key={component._id}
          />
        );
      case ComponentType.ProgressBar:
        return (
          <ProgressBarComponent
            pageId={page?._id}
            component={component}
            fontColor={page?.style?.color}
            key={component._id}
          />
        );
      case ComponentType.Counter:
        return (
          <CountersComponent
            pageId={page?._id}
            component={component}
            fontColor={page?.style?.color}
            key={component._id}
          />
        );
    }
  };

  useEffect(() => {
    if (page && page.customScripts?.header) {
      try {
        // eslint-disable-next-line no-eval
        eval(page?.customScripts?.header);
      } catch (e: any) {
        console.error("CUSTOM SCRIPT:", e.message);
      }
    }
  }, [page]);

  const CustomHelmet = ({ pageTitle, url, imageUrl }: any) => {
    return (
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:url"
          content={(() => {
            let urlNormalized = "";

            if (url[0] !== "/") urlNormalized = "/" + url;
            else urlNormalized = url;

            return (
              (APP_ENVIROMENT === "PROD"
                ? "https://pagefy.me"
                : "https://pagefy-frontend-dev.me") + urlNormalized
            );
          })()}
        />
        <meta property="og:image" content={imageUrl || ""} />
        <meta property="og:image:alt" content={pageTitle} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:type" content="image/gif" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
        <script>
          {(function run() {
            if (!pageToRender?.customScripts?.header) return;
            // eslint-disable-next-line no-new-func
            return Function(
              '"use strict";' + pageToRender?.customScripts?.header
            )();
          })()}
        </script>
      </Helmet>
    );
  };

  return (
    <>
      {page && (
        <CustomHelmet
          pageTitle={page?.name}
          url={page?.url}
          imageUrl={page?.pageImageUrl}
        />
      )}
      <PageRendererContent>
        {renderedPageState.loading && (
          <LoadingSpinner isFullPage color={PRIMARY_COLOR} />
        )}
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
                          return renderButtonByType(comp);
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
                      src={Logos.LogoHorizontalLightBgPng}
                      alt="pagefy.me"
                      width="150px"
                    />
                  </Grid>
                </Link>
              </Grid>
            </Grid>
          )}
      </PageRendererContent>
      {!isPagePreview && <ButtonScrollUp />}
    </>
  );
};

export default PageRenderer;
