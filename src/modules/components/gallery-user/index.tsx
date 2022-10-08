import strings from "../../../localization";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  Image,
  ImageOverlay,
  ImagesContainer,
  Root,
  Title,
} from "./style";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const mockImgs = [
  "https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?cs=srgb&dl=pexels-baskin-creative-studios-1766838.jpg&fm=jpg",
  "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?cs=srgb&dl=pexels-pixabay-257360.jpg&fm=jpg",
  "https://images7.alphacoders.com/411/411820.jpg",
  "https://wallpaperaccess.com/full/168092.jpg",
  "https://wallpaperaccess.com/full/547232.jpg",
  "http://store-images.s-microsoft.com/image/apps.26620.13682773009232620.62a18cea-40b3-43f1-811b-46ef9d15331b.96a2c700-d04f-4128-b94c-596de2c4cc83",
  "https://image.winudf.com/v2/image/Y29tLnBhc3RvcmUubmF0dXJlLmltYWdlcy53YWxscGFwZXJfc2NyZWVuXzBfN3VrNnE2djU/screen-0.jpg?fakeurl=1&type=.webp",
  "https://wallpaperaccess.com/full/5744807.jpg",
  "https://mobimg.b-cdn.net/v3/fetch/62/624e27fde335d49e2dd3c6b75c6027a3.jpeg",
  "https://webneel.com/wallpaper/sites/default/files/images/04-2013/natural-scenery-wallpaper.jpg",
  "https://images.alphacoders.com/210/210911.jpg",
  "https://wallpaperaccess.com/full/112722.jpg",
  "https://wallpapers.com/images/hd/aesthetic-beach-nature-jnfoo0qw1acrwgl9.jpg",
];

const SCROLL_STEP = 200;
const SCROLL_DELAY = 200;

interface IUserGalleryProps {
  onClickImage?: (imageUrl: string) => void;
  title?: string;
}

const UserGallery = ({
  onClickImage,
  title = strings.fromYourGallery,
}: IUserGalleryProps) => {
  const [scrollBackIntervalId, setScrollBackIntervalId] = useState(0);
  const [scrollForwardIntervalId, setScrollForwardIntervalId] = useState(0);

  const galleryRef = useRef<HTMLDivElement>(null);

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
      <ImagesContainer ref={galleryRef}>
        {mockImgs.map((imageUrl: string) => (
          <Image
            key={uuidv4()}
            style={{ backgroundImage: `url(${imageUrl})` }}
            onClick={() => {
              if (onClickImage) onClickImage(imageUrl);
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
