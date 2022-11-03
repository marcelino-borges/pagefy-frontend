import { v4 as uuidv4 } from "uuid";
import { LIGHT_GREY } from "../../../../../styles/colors";
import { RatingValue, StarIcon } from "../style";
import { Stack } from "@mui/material";

interface IRatingStars {
  rating: number;
  size?: number;
  showRatingNumber?: boolean;
}

const RatingStars = ({
  rating,
  size = 40,
  showRatingNumber = false,
}: IRatingStars) => {
  return (
    <Stack direction="row" alignItems="center">
      {Array.from({ length: 5 }, (_: any, i: number) => i + 1).map(
        (num: number) => (
          <StarIcon
            key={uuidv4()}
            icon="dashicons:star-filled"
            style={{
              color: rating >= num ? "#ffca38" : LIGHT_GREY,
              cursor: "unset",
              fontSize: `${size}px`,
            }}
          />
        )
      )}
      {showRatingNumber !== false && (
        <RatingValue style={{ fontSize: `${Math.floor(size * 0.7)}px` }}>
          {rating}
        </RatingValue>
      )}
    </Stack>
  );
};

export default RatingStars;
