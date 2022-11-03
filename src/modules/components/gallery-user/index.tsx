import strings from "../../../localization";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  DeleteIcon,
  Image,
  ImageOverlay,
  ImagesContainer,
  NoImagesOrLoading,
  Root,
  Title,
} from "./style";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IImageDetails } from "./../../../store/files/types";
import {
  deleteImage,
  getAllBackgroundsTemplates,
  getAllButtonsTemplates,
  getAllPagesImagesTemplates,
  getAllUserImages,
  getAllUserProfileTemplates,
} from "../../../services/files";
import { AxiosResponse } from "axios";
import LoadingSpinner from "../loading-spinner";
import { LIGHTER_GREY, PRIMARY_COLOR } from "./../../../styles/colors";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import { GalleryContext } from "../../../constants";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

const SCROLL_STEP = 200;
const SCROLL_DELAY = 200;

interface IUserGalleryProps {
  onClickImage?: (imageUrl: string) => void;
  title?: string;
  context?: GalleryContext[];
}

interface IGalleryListDivider {
  width?: string;
  height?: string;
  bgColor?: string;
  marginX?: string;
}

const UserGallery = ({
  onClickImage,
  title = strings.fromYourGalleryOrTemplates,
  context,
}: IUserGalleryProps) => {
  const [images, setImages] = useState<(IImageDetails | IGalleryListDivider)[]>(
    []
  );
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [scrollBackIntervalId, setScrollBackIntervalId] = useState(0);
  const [scrollForwardIntervalId, setScrollForwardIntervalId] = useState(0);

  const userId = useSelector(
    (state: IApplicationState) => state.user.profile?._id
  );

  const galleryRef = useRef<HTMLDivElement>(null);

  const addImages = (newImages: (IImageDetails | IGalleryListDivider)[]) => {
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

  const getUserImages = async () => {
    if (!userId) return;

    getAllUserImages(userId).then((response: AxiosResponse) => {
      if (response.data) addImages(response.data);
    });
  };

  const getButtonsTemplates = async () => {
    if (!userId) return;

    getAllButtonsTemplates().then((response: AxiosResponse) => {
      if (response.data) addImages(response.data);
    });
  };

  const getBackgroundsTemplates = async () => {
    if (!userId) return;

    getAllBackgroundsTemplates().then((response: AxiosResponse) => {
      if (response.data) addImages(response.data);
    });
  };

  const getPageImagesTemplates = async () => {
    if (!userId) return;

    getAllPagesImagesTemplates().then((response: AxiosResponse) => {
      if (response.data) addImages(response.data);
    });
  };

  const getUserProfileTemplates = async () => {
    if (!userId) return;

    getAllUserProfileTemplates().then((response: AxiosResponse) => {
      if (response.data) addImages(response.data);
    });
  };

  const deleteImageFromStorage = async (originalUrl: string) => {
    if (!userId) return;

    setIsLoadingImages(true);
    deleteImage(originalUrl, userId)
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

  useEffect(() => {
    setImages([]);
    setIsLoadingImages(true);

    if (!userId) {
      setIsLoadingImages(false);
      return;
    }

    getUserImages();

    if (context) {
      context.forEach((ctx: GalleryContext) => {
        switch (ctx) {
          case GalleryContext.BACKGROUND:
            getBackgroundsTemplates();
            break;
          case GalleryContext.BUTTONS:
            getButtonsTemplates();
            break;
          case GalleryContext.PAGE_IMAGE:
            getPageImagesTemplates();
            break;
          case GalleryContext.USER_PROFILE:
            getUserProfileTemplates();
            break;
        }
      });
    }

    return () => {
      setImages([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      setIsLoadingImages(false);
    }
  }, [images]);

  const clearBothIntervals = () => {
    clearInterval(scrollBackIntervalId);
    clearInterval(scrollForwardIntervalId);
    setScrollBackIntervalId(0);
    setScrollForwardIntervalId(0);
  };

  const scrollBack = () => {
    galleryRef.current?.scroll({
      top: 0,
      left: galleryRef.current?.scrollLeft - SCROLL_STEP,
      behavior: "smooth",
    });
  };

  const onPressBackIcon = () => {
    clearBothIntervals();

    scrollBack();
    const interval = Number(
      setInterval(() => {
        scrollBack();
      }, SCROLL_DELAY)
    );
    setScrollBackIntervalId(interval);
  };

  const onReleaseBackIcon = () => {
    clearBothIntervals();
  };

  const scrolForward = () => {
    galleryRef.current?.scroll({
      top: 0,
      left: galleryRef.current?.scrollLeft + SCROLL_STEP,
      behavior: "smooth",
    });
  };

  const onPressForwardIcon = () => {
    clearBothIntervals();

    scrolForward();
    const interval = Number(
      setInterval(() => {
        scrolForward();
      }, SCROLL_DELAY)
    );
    setScrollForwardIntervalId(interval);
  };

  const onReleaseForwardIcon = () => {
    clearBothIntervals();
  };

  return (
    <Root>
      {!isLoadingImages && images.length > 0 && (
        <>
          <Title>{title}</Title>
          <ArrowBackIcon
            onMouseDown={onPressBackIcon}
            onMouseUp={onReleaseBackIcon}
            onMouseLeave={onReleaseBackIcon}
          />
          <ArrowForwardIcon
            onMouseDown={onPressForwardIcon}
            onMouseUp={onReleaseForwardIcon}
            onMouseLeave={onReleaseForwardIcon}
          />
        </>
      )}
      <ImagesContainer ref={galleryRef}>
        {isLoadingImages && (
          <NoImagesOrLoading>
            <LoadingSpinner color={PRIMARY_COLOR} size={30} />
          </NoImagesOrLoading>
        )}
        {!isLoadingImages &&
          images.map((image: IImageDetails | IGalleryListDivider) => (
            <Image
              key={uuidv4()}
              backgroundImage={(image as IImageDetails)?.thumbnail}
              width={(image as IGalleryListDivider)?.width}
              bgColor={(image as IGalleryListDivider)?.bgColor}
              marginX={(image as IGalleryListDivider)?.marginX}
              isSystemOwned={(image as IImageDetails)?.isSystemOwned}
            >
              <ImageOverlay
                onClick={() => {
                  if (onClickImage && (image as IImageDetails)?.original)
                    onClickImage((image as IImageDetails)?.original);
                }}
              />{" "}
              <DeleteIcon
                onClick={() => {
                  if (!(image as IImageDetails)?.isSystemOwned)
                    deleteImageFromStorage((image as IImageDetails)?.original);
                }}
              />
            </Image>
          ))}
      </ImagesContainer>
    </Root>
  );
};

export default UserGallery;
