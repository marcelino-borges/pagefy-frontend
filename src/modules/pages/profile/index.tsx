import Header from "../../components/header";
import ThinWidthContent from "../../components/site-content/thin-width";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "./../../../store/index";
import { useEffect, useState } from "react";
import { PlansTypes, IUser } from "../../../store/user/types";
import strings from "../../../localization";
import PrivateRouteChecker from "../../components/private-route-checker";
import TriplePageTitle from "../../components/page-title";
import ProfileEditableAvatar from "../../components/profile-editable-avatar";
import UploadImageDialog from "../../components/dialog-upload-image";
import { GalleryContext, IMAGE_EXTENSIONS } from "../../../constants";
import InternalLink from "./../../components/internal-link/index";
import routes from "./../../../routes/paths";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteUser } from "../../../services/user";
import { showSuccessToast } from "../../../utils/toast";
import DialogConfirmation from "../../components/dialog-confirmation";
import { showErrorToast } from "./../../../utils/toast/index";
import { signOut } from "../../../store/auth/actions";
import { ACESSIBILITY_RED } from "../../../styles/colors";
import {
  setUserProfileImage,
  updateUser,
  uploadAndSetUserProfileImage,
} from "../../../store/user/actions";
import { clearLoading, setLoading } from "../../../store/shared/actions";
import { getFirebaseToken } from "../../../utils/firebase-config";
import { deleteImage } from "../../../services/files";
import Footer from "../../components/footer";

const INITIAL_STATE: IUser = {
  firstName: "",
  lastName: "",
  email: "",
  plan: PlansTypes.FREE,
  agreePrivacy: false,
  receiveCommunications: false,
};

const Profile = () => {
  const dispatch = useDispatch();

  const userProfile: IUser | undefined = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  const token: string | undefined = useSelector(
    (state: IApplicationState) => state.auth.auth?.accessToken
  );

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
    if (userProfile && userProfile._id && userProfile.authId && token) {
      deleteUser(userProfile._id, userProfile.authId, token)
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
      <PrivateRouteChecker />
      <Header />
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
        context={[GalleryContext.USER_PROFILE]}
        openChooseFileDialog={openUploadDialog}
        setOpenChooseFileDialog={setOpenUploadDialog}
        chosenImage={chosenImage}
        setChosenImage={setChosenImage}
        acceptedFiles={IMAGE_EXTENSIONS}
        submitDialog={async (imageUrl?: string) => {
          const token = await getFirebaseToken();
          if ((!imageUrl && !chosenImage) || !token || !userProfile) return;
          const clearLoadingFromState = () => {
            dispatch(clearLoading());
          };

          // Delete previous image before uploading another one
          if (
            userProfile &&
            userProfile._id &&
            userProfile.profileImageUrl &&
            userProfile.profileImageUrl.length > 0
          ) {
            dispatch(setLoading());
            try {
              await deleteImage(
                userProfile.profileImageUrl,
                userProfile._id,
                token
              );
            } catch (e: any) {
              console.log("Failed to delete image. Details: ", e.message);
            }
          }

          if (imageUrl) {
            dispatch(
              setUserProfileImage(
                imageUrl,
                userProfile,
                clearLoadingFromState,
                clearLoadingFromState
              )
            );
            return;
          } else if (chosenImage) {
            dispatch(
              uploadAndSetUserProfileImage(
                chosenImage,
                userProfile,
                clearLoadingFromState,
                clearLoadingFromState
              )
            );
          }
          setChosenImage(undefined);
          setOpenUploadDialog(false);
        }}
        cancelDialog={() => {
          setChosenImage(undefined);
          setOpenUploadDialog(false);
        }}
      />
      <ThinWidthContent pb="100px">
        <TriplePageTitle
          titles={[strings.profile, strings.profileSubtitle, ""]}
          increasingSize
        />
        <Grid container direction="column" justifyContent="center" mt="50px">
          <Grid container item justifyContent="center" pb="50px">
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
                  <i>{Object.values(PlansTypes)[values.plan]}</i>
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
              <Button
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
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </ThinWidthContent>
      <Footer />
    </>
  );
};

export default Profile;
