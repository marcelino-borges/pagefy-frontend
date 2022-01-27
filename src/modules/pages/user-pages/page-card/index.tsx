import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { IUserPage } from "../../../../store/user/types";
import TransparentTextField from "./transparent-textfield";
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
  ArticleIcon,
  ElementIcon,
  LinkIcon,
  ViewsIcon,
} from "./style";
import { stringShortener } from "../../../../utils";
import CustomTooltip from "../../../components/tooltip";

interface IPageCardProps {
  page: IUserPage;
}

const URL_MAX_LENGTH = 10;

const PageCard = ({ page }: IPageCardProps) => {
  const dispatch = useDispatch();
  const [isEditting, setIsEditting] = useState(false);
  const [isUrlLong, setIsUrlLong] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (page.url.length > URL_MAX_LENGTH) setIsUrlLong(true);
  }, [page.url]);

  const onSubmitNameForm = ({ name }: any) => {
    if (!page._id) return;
    setIsEditting(false);
    dispatch(updateUserPageName(page._id, name));
  };

  return (
    <Card container wrap="nowrap">
      <CardOverlay />
      <PageImage
        item
        style={{
          backgroundImage: `url(${page.pageImageUrl})`,
        }}
      />
      <CardContent
        container
        item
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <PageTitle item>
          {/* <ArticleIcon /> */}
          {isEditting ? (
            <form onSubmit={handleSubmit(onSubmitNameForm)}>
              <TransparentTextField register={register("name")} />
            </form>
          ) : (
            <>
              {page.name}
              <EditPenIcon
                onClick={() => {
                  setValue("name", page.name);
                  setIsEditting(true);
                }}
              />
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
