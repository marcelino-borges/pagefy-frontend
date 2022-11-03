import { Grid, Stack } from "@mui/material";
import { ITestimonial } from "../../../../../store/testimonials/types";
import RatingStars from "../rating-stars";
import { BorderDiv, Root } from "./style";
import moment from "moment";

interface IUserTestimonialCardProps {
  testimonial: ITestimonial;
  onClick: () => void;
}

const UserTestimonialCard = ({
  testimonial,
  onClick,
}: IUserTestimonialCardProps) => {
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
      <Grid container pt="24px">
        {testimonial.testimonial}
      </Grid>
    </Root>
  );
};

export default UserTestimonialCard;
