import { Grid, Stack, useMediaQuery } from "@mui/material";
import { ITestimonial } from "../../../../../store/testimonials/types";
import RatingStars from "../rating-stars";
import { BorderDiv, Root } from "./style";
import moment from "moment";
import YoutubeEmbed from "../../../../components/youtube-embed";
import { getYoutubeIdFromUrl } from "../../../../../utils";
import { useEffect, useState } from "react";

interface IUserTestimonialCardProps {
  testimonial: ITestimonial;
  onClick: () => void;
}

const UserTestimonialCard = ({
  testimonial,
  onClick,
}: IUserTestimonialCardProps) => {
  const isSmallerThan600 = useMediaQuery("(max-width:600px)");
  const isSmallerThan400 = useMediaQuery("(max-width:400px)");

  const [videoId, setVideoId] = useState<string | null>("");

  const getVideoWidth = () => {
    if (!isSmallerThan600) {
      return 500;
    } else if (isSmallerThan600 && !isSmallerThan400) {
      return 300;
    } else {
      return 150;
    }
  };

  useEffect(() => {
    if (testimonial.videoUrl?.length) {
      setVideoId(getYoutubeIdFromUrl(testimonial.videoUrl));
    }
  }, [testimonial.videoUrl]);

  return (
    <Root container item direction="column" onClick={onClick}>
      <BorderDiv className="borderDiv" />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <RatingStars
          size={20}
          rating={testimonial.rating || 0}
          showRatingNumber={false}
        />
        <i>{moment(testimonial.updatedAt).format("DD/MM/YYYY")}</i>
      </Stack>
      {videoId && testimonial.videoUrl?.length && (
        <Grid container pt="24px">
          <YoutubeEmbed
            width={`${getVideoWidth()}px`}
            height={`${(getVideoWidth() * 9) / 16}px`}
            embedId={videoId}
          />
        </Grid>
      )}
      <Grid container pt="24px">
        {testimonial.testimonial}
      </Grid>
    </Root>
  );
};

export default UserTestimonialCard;
