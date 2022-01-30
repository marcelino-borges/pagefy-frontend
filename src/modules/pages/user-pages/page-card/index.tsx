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

interface IPageCardProps {
  page: IUserPage;
}

const URL_MAX_LENGTH = 10;

const LETTER_WIDTH = 5;
const DEFAULT_INPUT_WIDTH = 100;

const PageCard = ({ page }: IPageCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditting, setIsEditting] = useState(false);
  const [isUrlLong, setIsUrlLong] = useState(false);
  const [textfieldWidth, setTextfieldWidth] = useState(DEFAULT_INPUT_WIDTH);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (page.url.length > URL_MAX_LENGTH) setIsUrlLong(true);
  }, [page.url]);

  useEffect(() => {
    if (page.name.length * LETTER_WIDTH > DEFAULT_INPUT_WIDTH) {
      setTextfieldWidth((page.name.length + 1) * LETTER_WIDTH);
    } else {
      setTextfieldWidth(DEFAULT_INPUT_WIDTH);
    }
  }, [page.name]);

  const onSubmitNameForm = ({ name }: any) => {
    if (!page._id) return;
    setIsEditting(false);
    dispatch(updateUserPageName(page._id, name));
  };

  return (
    <Card
      container
      wrap="nowrap"
      justifyContent="stretch"
      onClick={() => navigate(routes.page + "/" + page._id)}
    >
      <CardOverlay />
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
        <PageTitle item>
          {isEditting ? (
            <form onSubmit={handleSubmit(onSubmitNameForm)}>
              <TransparentTextField
                autoFocus
                register={register("name")}
                InputProps={{
                  style: { width: `${textfieldWidth}px` },
                }}
                onBlur={() => {
                  setValue("name", page.name);
                  setIsEditting(false);
                }}
              />
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
