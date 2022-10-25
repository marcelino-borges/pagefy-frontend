import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "./../../../../store/index";
import ProfileEditableAvatar from "../../profile-editable-avatar";
import { SubtitleLinks, UserName } from "./style";
import routes from "../../../../routes/paths";
import strings from "../../../../localization";
import { signOut } from "./../../../../store/auth/actions";
import { useNavigate } from "react-router-dom";
import { LIGHTER_GREY } from "../../../../styles/colors";
import UploadImageDialog from "../../dialog-upload-image";
import { useState } from "react";
import { GalleryContext, IMAGE_EXTENSIONS } from "../../../../constants";
import { deleteImage } from "../../../../services/files";
import {
  setUserProfileImage,
  uploadAndSetUserProfileImage,
} from "../../../../store/user/actions";
import { getFirebaseToken } from "../../../../utils/firebase-config";
import { clearLoading, setLoading } from "./../../../../store/shared/actions";
import SignInRegisterButtons from "../../signin-register-buttons";
import React from "react";

const UserLoggedIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const userState = useSelector((state: IApplicationState) => state.user);
  const isSmallerThanMD = useMediaQuery(theme.breakpoints.down("md"));

  const [openChooseFileBGDialog, setOpenChooseFileBGDialog] = useState(false);
  const [chosenImage, setChosenImage] = useState<File>();

  const getTwoFirstNames = () => {
    if (!userState.profile) return "";

    const hasntFirstName =
      !userState.profile.firstName || userState.profile.firstName.length < 1;

    const hasntLastName =
      !userState.profile.lastName || userState.profile.lastName.length < 1;

    if (hasntLastName) {
      if (hasntFirstName) {
        return "";
      } else {
        const names: string[] = userState.profile.firstName.split(" ");

        return names[0];
      }
    }
    if (!hasntFirstName) {
      const firstNames: string[] = userState.profile.firstName.split(" ");
      const lastNames: string[] = userState.profile.lastName.split(" ");

      return `${firstNames[0]} ${lastNames[0]}`;
    } else {
      const lastNames: string[] = userState.profile.lastName.split(" ");
      return lastNames[0];
    }
  };

  return userState.profile && userState.profile._id ? (
    <Grid
      container
      item
      direction={isSmallerThanMD ? "column" : "row"}
      justifyContent="flex-end"
      wrap="nowrap"
      width="unset"
      ml="16px"
    >
      <Grid
        container={!!isSmallerThanMD ? true : undefined}
        item
        justifyContent="center"
      >
        <ProfileEditableAvatar
          imageUrl={userState.profile?.profileImageUrl}
          onClick={() => {
            setOpenChooseFileBGDialog(true);
          }}
          width="50px"
          height="50px"
          badgeBgSize="22px"
          badgeIconSize="15px"
          noUserIconSize="36px"
        />
      </Grid>
      <Stack
        direction="column"
        justifyContent="center"
        pl={!isSmallerThanMD ? "12px" : "0px"}
        flexWrap="nowrap"
      >
        <UserName>{getTwoFirstNames()}</UserName>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={isSmallerThanMD ? "center" : undefined}
          flexWrap="nowrap"
        >
          <SubtitleLinks to={routes.profile}>{strings.profile}</SubtitleLinks>
          <Grid item px="8px" color={LIGHTER_GREY}>
            |
          </Grid>
          <SubtitleLinks
            onClick={() => {
              dispatch(
                signOut(() => {
                  navigate(routes.root);
                })
              );
            }}
            to="#"
          >
            {strings.signOut}
          </SubtitleLinks>
        </Stack>
      </Stack>
      <UploadImageDialog
        openChooseFileDialog={openChooseFileBGDialog}
        setOpenChooseFileDialog={setOpenChooseFileBGDialog}
        chosenImage={chosenImage}
        setChosenImage={setChosenImage}
        acceptedFiles={IMAGE_EXTENSIONS}
        context={[GalleryContext.USER_PROFILE]}
        submitDialog={async (imageUrl?: string) => {
          const token = await getFirebaseToken();
          if ((!imageUrl && !chosenImage) || !token || !userState.profile)
            return;
          const clearLoadingFromState = () => {
            dispatch(clearLoading());
          };

          // Delete previous image before uploading another one
          if (
            userState.profile &&
            userState.profile._id &&
            userState.profile.profileImageUrl &&
            userState.profile.profileImageUrl.length > 0
          ) {
            dispatch(setLoading());
            try {
              await deleteImage(
                userState.profile.profileImageUrl,
                userState.profile._id,
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
                userState.profile,
                clearLoadingFromState,
                clearLoadingFromState
              )
            );
          } else if (chosenImage) {
            dispatch(
              uploadAndSetUserProfileImage(
                chosenImage,
                userState.profile,
                clearLoadingFromState,
                clearLoadingFromState
              )
            );

            setChosenImage(undefined);
            setOpenChooseFileBGDialog(false);
          }
        }}
        cancelDialog={() => {
          setChosenImage(undefined);
          setOpenChooseFileBGDialog(false);
        }}
      />
    </Grid>
  ) : (
    <SignInRegisterButtons />
  );
};

export default React.memo(UserLoggedIn);
