import strings from "../../../localization";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
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
  getAllBackgroundsTemplates,
  getAllButtonsTemplates,
  getAllPagesImagesTemplates,
  getAllUserImages,
  getAllUserProfileTemplates,
} from "../../../services/files";
import { AxiosResponse } from "axios";
import LoadingSpinner from "../loading-spinner";
import { PRIMARY_COLOR } from "./../../../styles/colors";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import { GalleryContext } from "../../../constants";

const SCROLL_STEP = 200;
const SCROLL_DELAY = 200;

interface IUserGalleryProps {
  onClickImage?: (imageUrl: string) => void;
  title?: string;
  context?: GalleryContext[];
}

const UserGallery = ({
  onClickImage,
  title = strings.fromYourGallery,
  context,
}: IUserGalleryProps) => {
  const [images, setImages] = useState<IImageDetails[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [scrollBackIntervalId, setScrollBackIntervalId] = useState(0);
  const [scrollForwardIntervalId, setScrollForwardIntervalId] = useState(0);

  const userId = useSelector(
    (state: IApplicationState) => state.user.profile?._id
  );

  const accessToken = useSelector(
    (state: IApplicationState) => state.auth.auth?.accessToken
  );

  const galleryRef = useRef<HTMLDivElement>(null);

  const addImages = (newImages: IImageDetails[]) => {
    setImages([...images, ...newImages]);
  };

  const getUserImages = async () => {
    if (!userId || !accessToken) return;

    getAllUserImages(userId, accessToken).then((response: AxiosResponse) => {
      if (response.data) addImages(response.data);
    });
  };

  const getButtonsTemplates = async () => {
    if (!userId || !accessToken) return;

    getAllButtonsTemplates(accessToken).then((response: AxiosResponse) => {
      if (response.data) addImages(response.data);
    });
  };

  const getBackgroundsTemplates = async () => {
    if (!userId || !accessToken) return;

    getAllBackgroundsTemplates(accessToken).then((response: AxiosResponse) => {
      if (response.data) addImages(response.data);
    });
  };

  const getPageImagesTemplates = async () => {
    if (!userId || !accessToken) return;

    getAllPagesImagesTemplates(accessToken).then((response: AxiosResponse) => {
      if (response.data) addImages(response.data);
    });
  };

  const getUserProfileTemplates = async () => {
    if (!userId || !accessToken) return;

    getAllUserProfileTemplates(accessToken).then((response: AxiosResponse) => {
      if (response.data) addImages(response.data);
    });
  };

  useEffect(() => {
    setIsLoadingImages(true);

    if (!accessToken || !userId) {
      setIsLoadingImages(false);
      return;
    }

    getUserImages();

    if (context) {
      context.forEach((ctx: GalleryContext) => {
        if (ctx === GalleryContext.BACKGROUND) {
          getBackgroundsTemplates();
        }

        if (ctx === GalleryContext.BUTTONS) {
          getButtonsTemplates();
        }

        if (ctx === GalleryContext.PAGE_IMAGE) {
          getPageImagesTemplates();
        }

        if (ctx === GalleryContext.USER_PROFILE) {
          getUserProfileTemplates();
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
          images.map((image: IImageDetails) => (
            <Image
              key={uuidv4()}
              style={{ backgroundImage: `url(${image.thumbnail})` }}
              onClick={() => {
                if (onClickImage) onClickImage(image.original);
              }}
            >
              <ImageOverlay />
            </Image>
          ))}
      </ImagesContainer>
    </Root>
  );
};

export default UserGallery;
