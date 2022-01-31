import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { IUserPage } from "../../../../store/user/types";
import TransparentTextField from "../../../components/transparent-textfield";
import { updateUserPageName } from "../../../../store/user/actions";
import strings from "../../../../localization";
import {
  Card,
  PageImage,
  PageTitle,
  EditPenIcon,
  PageDataKey,
  CardContent,
  CardOverlay,
  ElementIcon,
  LinkIcon,
  ViewsIcon,
} from "./style";
import { stringShortener } from "../../../../utils";
import CustomTooltip from "../../../components/tooltip";
import routes from "../../../../routes/paths";
import { setPageBeingManaged } from "../../../../store/page-management/actions";

interface IPageCardProps {
  page: IUserPage;
}

const URL_MAX_LENGTH = 10;

const PageCard = ({ page }: IPageCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditting, setIsEditting] = useState(false);
  const [isUrlLong, setIsUrlLong] = useState(false);
  const [pageName, setPageName] = useState("");

  const { handleSubmit } = useForm();

  useEffect(() => {
    if (page.url.length > URL_MAX_LENGTH) setIsUrlLong(true);
  }, [dispatch, page.url]);

  const onSubmitNameForm = () => {
    if (!page._id) return;
    setIsEditting(false);
    dispatch(updateUserPageName(page._id, pageName));
  };

  const loadPage = () => {
    if (!page._id) return;

    navigate(routes.page + "/" + page._id);
  };

  const handleChangePageName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageName(event.target.value);
  };

  return (
    <Card container wrap="nowrap" justifyContent="stretch">
      <CardOverlay onClick={loadPage} />
      <PageImage
        item
        xs={5}
        sm={0}
        style={{
          backgroundImage: `url(${page.pageImageUrl})`,
        }}
      />
      <CardContent
        container
        item
        direction="column"
        xs={7}
        sm={12}
        justifyContent="space-between"
        wrap="nowrap"
      >
        <PageTitle
          item
          onClick={() => {
            setPageName(page.name);
            setIsEditting(true);
          }}
        >
          {isEditting ? (
            <form onSubmit={handleSubmit(onSubmitNameForm)}>
              <TransparentTextField
                autoFocus
                color="#bfbfbf"
                fontSize="26px"
                InputProps={{
                  style: { width: "100%" },
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
            <>
              {page.name}
              <EditPenIcon />
            </>
          )}
        </PageTitle>
        <Grid item>
          <Grid
            container
            item
            direction="column"
            style={{ paddingRight: "32px" }}
          >
            <Grid item>
              <ElementIcon />
              <PageDataKey>Elementos: </PageDataKey>
              {page.components.length}
            </Grid>
            <Grid item>
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
            <Grid item>
              <ViewsIcon />
              <PageDataKey>{strings.views}: </PageDataKey>
              {page.views}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PageCard;
