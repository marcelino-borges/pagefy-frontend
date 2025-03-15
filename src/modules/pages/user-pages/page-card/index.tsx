import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Grid, useMediaQuery } from "@mui/material";
import { IUserPage } from "../../../../store/user-pages/types";
import TransparentTextField from "../../../components/transparent-textfield";
import {
  deletePage,
  updateUserPageName,
} from "../../../../store/user-pages/actions";
import strings from "../../../../localization";
import {
  Card,
  PageImage,
  PageTitle,
  PageDataKey,
  CardContent,
  CardOverlay,
  ElementIcon,
  LinkIcon,
  ViewsIcon,
  DeleteIcon,
} from "./style";
import { stringShortener, toBase64 } from "../../../../utils";
import CustomTooltip from "../../../components/tooltip";
import PAGES_ROUTES from "../../../../routes/paths";
import DialogConfirmation from "./../../../components/dialog-confirmation/index";
import images from "./../../../../assets/img/index";
import { showErrorToast } from "../../../../utils/toast";
import { IApplicationState } from "./../../../../store/index";
import { ANALYTICS_EVENTS } from "../../../../constants";
import { logAnalyticsEvent } from "../../../../services/firebase-analytics";

interface IPageCardProps {
  page: IUserPage;
}

const URL_MAX_LENGTH = 10;

const PageCard = ({ page }: IPageCardProps) => {
  const dispatch = useDispatch();
  const isSmallerThan600 = useMediaQuery("(max-width: 600px)");
  const activeSubscription = useSelector(
    (state: IApplicationState) => state.user.activeSubscription
  );
  const userProfile = useSelector(
    (state: IApplicationState) => state.user.profile
  );
  const navigate = useNavigate();
  const [isEditting, setIsEditting] = useState(false);
  const [isUrlLong, setIsUrlLong] = useState(false);
  const [pageName, setPageName] = useState("");
  const [showDeletePageDialog, setShowDeletePageDialog] = useState(false);

  const { handleSubmit } = useForm();

  useEffect(() => {
    if (page.url.length > URL_MAX_LENGTH) setIsUrlLong(true);
  }, [dispatch, page.url]);

  const onSubmitNameForm = () => {
    if (!page._id) return;

    if (pageName !== page.name)
      dispatch(updateUserPageName(page._id, pageName));

    setIsEditting(false);
  };

  const loadPage = () => {
    if (!page._id) return;

    if (userProfile) {
      logAnalyticsEvent(ANALYTICS_EVENTS.selectContent, {
        content_type: "load_page_edit",
        item_id: page._id,
        email: toBase64(userProfile.email),
      });
    }

    navigate(PAGES_ROUTES.page + "/" + page._id);
  };

  const handleChangePageName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageName(event.target.value);
  };

  return (
    <Card container wrap="nowrap" justifyContent="stretch">
      <DeleteIcon
        onClick={() => {
          setShowDeletePageDialog(true);
        }}
      />
      <DialogConfirmation
        open={showDeletePageDialog}
        onClose={() => {
          setShowDeletePageDialog(false);
        }}
        onConfirmCallback={() => {
          if (page._id) {
            dispatch(
              deletePage(
                page._id,
                () => {
                  if (page._id) {
                    logAnalyticsEvent(ANALYTICS_EVENTS.userPageDelete, {
                      page_id: page._id,
                      email: toBase64(userProfile?.email),
                    });
                  }
                },
                (errorMsg?: string) => {
                  if (errorMsg) showErrorToast(errorMsg);
                }
              )
            );
          }
        }}
        title={strings.removePage}
        message={strings.removePageConfirmation}
      />
      <CardOverlay onClick={loadPage} />
      <PageImage
        item
        xs={0}
        sm={5}
        style={{
          backgroundImage: page.pageImageUrl
            ? `url(${page.pageImageUrl})`
            : `url(${images.placeholderImage})`,
        }}
      />
      <CardContent
        container
        item
        direction="column"
        xs={12}
        sm={7}
        justifyContent="space-between"
        wrap="nowrap"
        style={{
          maxWidth: isSmallerThan600 ? "100%" : "unset",
        }}
      >
        <PageTitle
          container
          item
          onClick={() => {
            setPageName(page.name);
            setIsEditting(true);
          }}
          wrap="nowrap"
        >
          {isEditting ? (
            <form onSubmit={handleSubmit(onSubmitNameForm)}>
              <TransparentTextField
                autoFocus
                color="#bfbfbf"
                fontSize="26px"
                InputProps={{
                  style: {
                    width: "100%",
                  },
                  // endAdornment: (
                  //   <InputAdornment position="end">
                  //     <IconButton type="submit" edge="end">
                  //       <SaveIcon fontSize="medium" color="disabled" />
                  //     </IconButton>
                  //   </InputAdornment>
                  // ),
                }}
                value={pageName}
                onChange={handleChangePageName}
                onBlur={() => {
                  setPageName(page.name);
                  setIsEditting(false);
                }}
              />
            </form>
          ) : (
            <>{stringShortener(page.name, 15)}</>
          )}
        </PageTitle>
        <Grid item>
          <Grid
            container
            item
            direction="column"
            style={{ paddingRight: "32px" }}
          >
            <Grid container item wrap="nowrap">
              <ElementIcon />
              <PageDataKey>Elementos: </PageDataKey>
              {page.middleComponents?.length || 0}
            </Grid>
            <Grid container item wrap="nowrap">
              {isUrlLong ? (
                <CustomTooltip title={page.url}>
                  <LinkIcon />
                </CustomTooltip>
              ) : (
                <LinkIcon />
              )}
              <PageDataKey>URL: </PageDataKey>/
              {stringShortener(page.url, URL_MAX_LENGTH)}
            </Grid>

            <Grid container item wrap="nowrap">
              <ViewsIcon />
              <PageDataKey>{strings.views}: </PageDataKey>
              {activeSubscription ? page.views : strings.upgradeYourPlan}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PageCard;
