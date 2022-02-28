import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPageByUrl } from "../../../store/page-renderer/actions";
import PageRendererContent from "./page-renderer-content";
import { IUserComponent, IUserPage } from "../../../store/user/types";
import { IApplicationState } from "./../../../store/index";
import { CircularProgress, Grid } from "@mui/material";
import { PageName, PagePicture } from "./style";

const PageRenderer = () => {
  const dispatch = useDispatch();
  let { url } = useParams();

  const renderedPageState = useSelector(
    (state: IApplicationState) => state.pageRendered
  );

  const [page, setPage] = useState<IUserPage>();

  useEffect(() => {
    if (url) {
      console.log("url: " + url);
      dispatch(getPageByUrl(url));
    }
  }, [dispatch, url]);

  useEffect(() => {
    if (renderedPageState.page) {
      setPage(renderedPageState.page);
    }
  }, [renderedPageState]);

  const renderMiddleComponents = (components: IUserComponent[]) => {
    let columnCount = 0;
    let BaseRow = ({ children }: any) => <Grid container>{children}</Grid>;

    components.map((component: IUserComponent) => {
      if (columnCount === 0) {
      }
      return <>{component.url}</>;
    });
  };

  return (
    <PageRendererContent>
      {page ? (
        <Grid container>
          <Grid container item justifyContent="center">
            <PagePicture backgroundImage={page.pageImageUrl} />
          </Grid>
          <Grid container item justifyContent="center">
            <PageName>{page.name}</PageName>
          </Grid>
          {page.middleComponents && page.middleComponents.length > 0 && (
            <>{renderMiddleComponents(page.middleComponents)}</>
          )}
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
