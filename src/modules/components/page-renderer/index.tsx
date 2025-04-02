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
import PAGES_ROUTES from "./../../../routes/paths";
import LoadingSpinner from "../loading-spinner";
import { PRIMARY_COLOR } from "./../../../styles/colors";
import InternalLink from "../internal-link";
import { Helmet } from "react-helmet";
import TextOverImageComponent from "./component-types/text-over-image/index";
import ButtonScrollUp from "../button-scroll-up";
import MapComponent from "./component-types/map";
import SpotifyComponent from "./component-types/spotify";
import ProgressBarComponent from "./component-types/progress-bar";
import CountersComponent from "./component-types/counters";
import { shouldComponentBeVisible } from "./utils";
import Meta from "../meta";

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

  const renderButtonByType = (component: IUserComponent) => {
    const type: ComponentType = component.type;

    const buttonByType = {
      [ComponentType.Image]: (
        <ImageComponent
          pageId={page?._id}
          component={component}
          key={component._id}
        />
      ),
      [ComponentType.Text]: (
        <TextComponent
          pageId={page?._id}
          component={component}
          key={component._id}
        />
      ),
      [ComponentType.TextImage]: (
        <TextImageComponent
          pageId={page?._id}
          component={component}
          key={component._id}
        />
      ),
      [ComponentType.Video]: (
        <VideoComponent
          pageId={page?._id}
          component={component}
          key={component._id}
        />
      ),
      [ComponentType.Launch]: (
        <LaunchComponent
          pageId={page?._id}
          component={component}
          key={component._id}
          isPagePreview={isPagePreview}
        />
      ),
      [ComponentType.TextOverImage]: (
        <TextOverImageComponent
          pageId={page?._id}
          component={component}
          key={component._id}
        />
      ),
      [ComponentType.Map]: (
        <MapComponent
          pageId={page?._id}
          component={component}
          fontColor={page?.style?.color}
          key={component._id}
        />
      ),
      [ComponentType.Spotify]: (
        <SpotifyComponent
          pageId={page?._id}
          component={component}
          fontColor={page?.style?.color}
          key={component._id}
        />
      ),
      [ComponentType.ProgressBar]: (
        <ProgressBarComponent
          pageId={page?._id}
          component={component}
          fontColor={page?.style?.color}
          key={component._id}
        />
      ),
      [ComponentType.Counter]: (
        <CountersComponent
          pageId={page?._id}
          component={component}
          fontColor={page?.style?.color}
          key={component._id}
        />
      ),
      [ComponentType.Icon]: null,
    };

    return buttonByType[type] ?? null;
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

  return (
    <>
      {page && (
        <Meta
          lang={strings.getInterfaceLanguage()}
          locale={strings.getInterfaceLanguage()}
          title={page.name ?? strings.appName}
          description={page.name ?? strings.appName}
          canonical={`${process.env.REACT_APP_DOMAIN_URL}/${page.url}`}
          image={page.pageImageUrl}
          keywords={[...page.name.split(" "), strings.appName]}
          customTags={() => (
            <>
              <script>
                {(function run() {
                  if (!pageToRender?.customScripts?.header) return;
                  // eslint-disable-next-line no-new-func
                  return Function(
                    '"use strict";' + pageToRender?.customScripts?.header
                  )();
                })()}
              </script>
            </>
          )}
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
                <InternalLink to={PAGES_ROUTES.root}>
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
                  <InternalLink to={PAGES_ROUTES.root}>
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
                {middleComponents &&
                  middleComponents.length > 0 &&
                  middleComponents.map((comp: IUserComponent) => {
                    if (shouldComponentBeVisible(comp)) {
                      return renderButtonByType(comp);
                    }
                    return null;
                  })}
              </Grid>

              {/* BOTTOM COMPONENTS */}
              <Grid container item>
                {bottomComponents && bottomComponents.length > 0 && (
                  <IconsComponent isRenderer iconsList={bottomComponents} />
                )}
              </Grid>
              <Grid container item justifyContent="center">
                <Link to={PAGES_ROUTES.root}>
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
