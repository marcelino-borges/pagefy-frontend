import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import strings from "../../../../localization";
import { deleteUser } from "../../../../services/user";
import { signOut } from "../../../../store/auth/actions";
import { IUser, PlansTypes } from "../../../../store/user/types";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import InternalLink from "../../../components/internal-link";
import TriplePageTitle from "../../../components/page-title";
import ProfileEditableAvatar from "../../../components/profile-editable-avatar";
import routes from "../../../../routes/paths";
import {
  setUserProfileImage,
  updateUser,
  uploadAndSetUserProfileImage,
} from "../../../../store/user/actions";
import { ACESSIBILITY_RED } from "../../../../styles/colors";
import DialogConfirmation from "../../../components/dialog-confirmation";
import UploadImageDialog from "../../../components/dialog-upload-image";
import { GalleryContext, IMAGE_EXTENSIONS } from "../../../../constants";
import { clearLoading } from "../../../../store/shared/actions";
import CustomLink from "./../../../components/button-custom";
import { getPlanNameByType } from "../../../../utils/stripe";

const INITIAL_STATE: IUser = {
  firstName: "",
  lastName: "",
  email: "",
  plan: PlansTypes.FREE,
  agreePrivacy: false,
  receiveCommunications: false,
};

interface IPersonalDataProps {
  userProfile: IUser;
}

const PersonalData = ({ userProfile }: IPersonalDataProps) => {
  const dispatch = useDispatch();
  const isSmallerThan600 = useMediaQuery("(max-width: 600px)");

  const [values, setValues] = useState<IUser>(INITIAL_STATE);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] =
    useState(false);
  const [profileImageTemporaryUrl, setProfileImageTemporaryUrl] =
    useState<any>(undefined);
  const [chosenImage, setChosenImage] = useState<File>();

  useEffect(() => {
    if (userProfile) {
      setValues(userProfile);
      setProfileImageTemporaryUrl(userProfile.profileImageUrl);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const deleteUserFromFirebaseAndMongo = () => {
    if (userProfile && userProfile._id && userProfile.authId) {
      deleteUser(userProfile._id, userProfile.authId)
        .then(() => {
          showSuccessToast(strings.deleteAccountSuccess);
          dispatch(signOut());
        })
        .catch(() => {
          showErrorToast(strings.deleteAccountError);
        });
    }
  };
  return (
    <>
      <TriplePageTitle
        titles={[strings.profile, strings.profileSubtitle, ""]}
        increasingSize
      />
      <Grid
        container
        direction="column"
        justifyContent="center"
        px={isSmallerThan600 ? "8px" : "25vw"}
      >
        <Grid container item justifyContent="center" pb="50px" mt="50px">
          <ProfileEditableAvatar
            imageUrl={profileImageTemporaryUrl}
            onClick={() => setOpenUploadDialog(true)}
            height="140px"
            width="140px"
            noUserIconSize="60px"
            badgeBgSize="38px"
            badgeIconSize="26px"
          />
        </Grid>
        <Grid container item direction="column" gap="16px">
          <Grid item>
            <TextField
              label={strings.firstName}
              name="firstName"
              type="text"
              fullWidth
              required
              variant="outlined"
              onChange={handleInputChange}
              value={values.firstName}
            />
          </Grid>
          <Grid item>
            <TextField
              label={strings.lastName}
              name="lastName"
              type="text"
              fullWidth
              required
              variant="outlined"
              onChange={handleInputChange}
              value={values.lastName}
            />
          </Grid>
          <Grid item>
            <TextField
              label={strings.email}
              name="email"
              type="text"
              fullWidth
              required
              variant="outlined"
              onChange={handleInputChange}
              value={values.email}
            />
          </Grid>
          <Grid item pt="16px" pb="8px">
            <span>{`${strings.yourPlanIs}: `}</span>
            <span>
              <strong>
                <i>{getPlanNameByType(values.plan)}</i>
              </strong>
            </span>
          </Grid>
          <Grid container item direction="row" justifyContent="space-between">
            <FormControlLabel
              label={strings.wishesCommunications}
              control={
                <Checkbox
                  checked={values.receiveCommunications}
                  onChange={(e: any) => {
                    setValues({
                      ...values,
                      receiveCommunications: e.target.checked,
                    });
                  }}
                />
              }
            />
            <FormControlLabel
              label={
                <>
                  {strings.agreeWith}{" "}
                  <InternalLink to={routes.terms}>
                    {strings.termsOfUse}
                  </InternalLink>{" "}
                  {strings.and}{" "}
                  <InternalLink to={routes.privacy}>
                    {strings.privacyPolicies}
                  </InternalLink>
                </>
              }
              control={
                <Checkbox
                  checked={values.agreePrivacy}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValues({
                      ...values,
                      agreePrivacy: e.target.checked,
                    });
                  }}
                />
              }
            />
          </Grid>
          <Grid container item pt="32px" justifyContent="center">
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                dispatch(
                  updateUser(
                    values,
                    () => {
                      showSuccessToast(strings.successUpdateUser);
                    },
                    () => {
                      showErrorToast(strings.errorUpdateUser);
                    }
                  )
                );
              }}
            >
              {strings.save}
            </Button>
          </Grid>
          <Grid container item justifyContent="center" pt="50px" pb="50px">
            <CustomLink
              hoverBgColor="transparent"
              bgColor="transparent"
              onClick={() => {
                setOpenDeleteConfirmationDialog(true);
              }}
            >
              <DeleteIcon
                style={{ color: ACESSIBILITY_RED, marginRight: "8px" }}
              />
              <span style={{ color: ACESSIBILITY_RED }}>
                {strings.deleteAccount}
              </span>
            </CustomLink>
          </Grid>
        </Grid>
      </Grid>
      <DialogConfirmation
        open={openDeleteConfirmationDialog}
        onClose={() => setOpenDeleteConfirmationDialog(false)}
        title={strings.deleteAccount}
        message={strings.removeUserConfirmation}
        onConfirmCallback={deleteUserFromFirebaseAndMongo}
        onRefuseCallback={() => {
          setOpenDeleteConfirmationDialog(false);
        }}
      />
      <UploadImageDialog
        existingImageUrl={userProfile.profileImageUrl}
        context={[GalleryContext.USER_PROFILE]}
        openChooseFileDialog={openUploadDialog}
        setOpenChooseFileDialog={setOpenUploadDialog}
        chosenImage={chosenImage}
        setChosenImage={setChosenImage}
        acceptedFiles={IMAGE_EXTENSIONS}
        submitDialog={async (imageUrl?: string) => {
          if (!userProfile) return;

          const clearLoadingFromState = () => {
            dispatch(clearLoading());
          };

          if (chosenImage) {
            dispatch(
              uploadAndSetUserProfileImage(
                chosenImage,
                userProfile,
                clearLoadingFromState,
                clearLoadingFromState
              )
            );
          } else {
            dispatch(
              setUserProfileImage(
                imageUrl || "",
                userProfile,
                clearLoadingFromState,
                clearLoadingFromState
              )
            );
            return;
          }
          setChosenImage(undefined);
          setOpenUploadDialog(false);
        }}
        cancelDialog={() => {
          setChosenImage(undefined);
          setOpenUploadDialog(false);
        }}
      />
    </>
  );
};

export default PersonalData;
