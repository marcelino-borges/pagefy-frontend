import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { AxiosResponse } from "axios";
import strings from "../../../../localization";
import { Grid } from "@mui/material";
import { deleteImage, getAllUserImages } from "../../../../services/files";
import { IApplicationState } from "../../../../store";
import { IImageDetails } from "../../../../store/files/types";
import { LIGHTER_GREY, PRIMARY_COLOR } from "../../../../styles/colors";
import LoadingSpinner from "../../../components/loading-spinner";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import TriplePageTitle from "../../../components/page-title";
import {
  DeleteIcon,
  Image,
  ImageOverlay,
} from "../../../components/gallery-user/style";

const Gallery = () => {
  const userState = useSelector((state: IApplicationState) => state.user);
  const [images, setImages] = useState<IImageDetails[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  const getUserImages = async () => {
    if (!userState.profile?._id) return;

    getAllUserImages(userState.profile?._id)
      .then((response: AxiosResponse) => {
        if (response.data) addImages(response.data);
      })
      .finally(() => setIsLoadingImages(false));
  };

  const deleteImageFromStorage = async (originalUrl: string) => {
    if (!userState.profile?._id) return;

    setIsLoadingImages(true);
    deleteImage(originalUrl, userState.profile?._id)
      .then(() => {
        showSuccessToast(strings.fileHandling.fileDeletedSuccessfully);
      })
      .catch(() => {
        showErrorToast(strings.fileHandling.errorToDeleteFile);
      })
      .finally(() => {
        setIsLoadingImages(false);
      });
  };

  const addImages = (newImages: IImageDetails[]) => {
    if (newImages.length > 0) {
      setImages((currentState: any) => {
        if (currentState.length > 0) {
          return [
            ...currentState,
            { bgColor: LIGHTER_GREY, width: "2px", marginX: "16px" },
            ...newImages,
          ];
        }
        return [...currentState, ...newImages];
      });
    }
  };

  useEffect(() => {
    setImages([]);
    setIsLoadingImages(true);

    if (!userState.profile?._id) {
      setIsLoadingImages(false);
      return;
    }

    getUserImages();

    return () => {
      setImages([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container direction="column">
      <TriplePageTitle
        titles={[strings.yourGallery, strings.yourGallery, ""]}
        increasingSize
      />
      {isLoadingImages && (
        <Grid container pt="32px">
          <LoadingSpinner color={PRIMARY_COLOR} />
        </Grid>
      )}
      {!isLoadingImages && !images.length && (
        <>{strings.sorryThisIsNotAvailable}</>
      )}
      <Grid container direction="row" gap="8px">
        {!isLoadingImages &&
          !!images.length &&
          images.map((image: IImageDetails) => (
            <Grid item>
              <Image
                key={uuidv4()}
                backgroundImage={(image as IImageDetails)?.thumbnail}
                isSystemOwned={(image as IImageDetails)?.isSystemOwned}
              >
                <ImageOverlay />
                <DeleteIcon
                  onClick={() => {
                    if (!image.isSystemOwned)
                      deleteImageFromStorage(image.original);
                  }}
                />
              </Image>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default Gallery;
