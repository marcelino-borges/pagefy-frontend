import { Grid } from "@mui/material";
import { IUserPage } from "../../../../store/user/types";
import { useState } from "react";
import TransparentTextField from "./transparent-textfield";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateUserPageName } from "../../../../store/user/actions";
import strings from "../../../../localization";
import { Card, PageImage, PageTitle, EditPenIcon, PageDataKey } from "./style";

interface IPageCardProps {
  page: IUserPage;
}

const PageCard = ({ page }: IPageCardProps) => {
  const dispatch = useDispatch();
  const [isEditting, setIsEditting] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  const onSubmitNameForm = ({ name }: any) => {
    if (!page._id) return;
    setIsEditting(false);
    dispatch(updateUserPageName(page._id, name));
  };

  return (
    <Card container alignItems="center">
      <PageImage
        item
        style={{
          backgroundImage: `url(${page.pageImageUrl})`,
        }}
      />
      <Grid item>
        <PageTitle item>
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
          <PageDataKey>URL: </PageDataKey>/{page.url}
        </Grid>
        <Grid item>
          <PageDataKey>{strings.views}: </PageDataKey>
          {page.views}
        </Grid>
      </Grid>
    </Card>
  );
};

export default PageCard;
