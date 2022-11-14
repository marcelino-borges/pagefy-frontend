import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import strings from "../../../../../localization";
import { IApplicationState } from "../../../../../store";
import {
  createTestimonial,
  deleteTestimonial,
  getAllUserTestimonials,
  updateTestimonial,
} from "../../../../../store/testimonials/actions";
import { ITestimonial } from "../../../../../store/testimonials/types";
import { RatingValue, StarIcon } from "../style";
import { v4 as uuidv4 } from "uuid";
import { isUrlValid } from "../../../../../utils/validators/url";
import { showErrorToast } from "../../../../../utils/toast/index";
import { DeleteButton } from "./style";

interface IValues {
  text: string;
  videoUrl?: string;
  rating?: number;
  intendedRating?: number;
}

const INITIAL_FORM_VALUES: IValues = {
  text: "",
  videoUrl: "",
  rating: 0,
};

const INITIAL_ERRORS = {
  videoUrl: "",
};

interface ICreateTestimonialsDialogProps {
  open: boolean;
  onClose: () => void;
  existingTestimonial?: ITestimonial;
}

const CreateTestimonialsDialog = ({
  open,
  onClose,
  existingTestimonial,
}: ICreateTestimonialsDialogProps) => {
  const theme = useTheme();
  const isSmallerThanSM = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const userProfile = useSelector(
    (state: IApplicationState) => state.user.profile
  );

  const userTestimonials = useSelector(
    (state: IApplicationState) => state.testimonials
  );

  const [values, setValues] = useState(INITIAL_FORM_VALUES);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [openZeroRatingConfirmation, setOpenZeroRatingConfirmation] =
    useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (existingTestimonial)
      setValues({
        text: existingTestimonial.testimonial,
        videoUrl: existingTestimonial.videoUrl,
        rating: existingTestimonial.rating,
      });
  }, [existingTestimonial]);

  useEffect(() => {
    if (!open) setValues(INITIAL_FORM_VALUES);
  }, [open]);

  useEffect(() => {
    if (userProfile?._id) dispatch(getAllUserTestimonials(userProfile._id));
  }, [dispatch, userProfile?._id]);

  useEffect(() => {
    if (userTestimonials.error?.length) {
      showErrorToast(userTestimonials.error);
    }
  }, [userTestimonials.error]);

  const onSubmitTestimonial = () => {
    if (userTestimonials.loading || userTestimonials.userTestimonials?.length)
      return;

    setErrors(INITIAL_ERRORS);

    if (values.videoUrl?.length) {
      if (!isUrlValid(values.videoUrl)) {
        setErrors({ ...errors, videoUrl: strings.invalidUrl });
        return;
      } else if (!values.videoUrl.includes("youtu")) {
        setErrors({ ...errors, videoUrl: strings.hasToBeYoutubeVideo });
      }
    }

    if (!values.rating) {
      setOpenZeroRatingConfirmation(true);
      return;
    }

    if (existingTestimonial) updateExistingTestimonial();
    else createNewTestimonial();

    setValues(INITIAL_FORM_VALUES);
  };

  const createNewTestimonial = () => {
    if (userTestimonials.loading) return;
    if (
      values.text &&
      userProfile &&
      userProfile?._id &&
      values.rating !== undefined
    ) {
      const testimonial: ITestimonial = {
        user: userProfile._id,
        testimonial: values.text,
        pictureUrl: userProfile.profileImageUrl,
        videoUrl: values.videoUrl,
        rating: values.rating,
      };
      dispatch(createTestimonial(testimonial));
      setValues(INITIAL_FORM_VALUES);
      onClose();
    }
  };

  const updateExistingTestimonial = () => {
    if (userTestimonials.loading || !existingTestimonial) return;
    if (
      values.text &&
      userProfile &&
      userProfile?._id &&
      values.rating !== undefined
    ) {
      const testimonial: ITestimonial = {
        ...existingTestimonial,
        testimonial: values.text,
        videoUrl: values.videoUrl,
        rating: values.rating,
      };
      dispatch(updateTestimonial(testimonial));
      setValues(INITIAL_FORM_VALUES);
      onClose();
    }
  };

  const ZeroRatingConfirmationdialog = () => {
    return (
      <Dialog
        open={openZeroRatingConfirmation}
        onClose={() => setOpenZeroRatingConfirmation(false)}
      >
        <DialogTitle>{strings.testimonials.zeroRatingDialogTitle}</DialogTitle>
        <DialogContent>
          {strings.testimonials.zeroRatingDialogText}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenZeroRatingConfirmation(false)}>
            {strings.no}
          </Button>
          <Button
            onClick={() => {
              createNewTestimonial();
              setOpenZeroRatingConfirmation(false);
            }}
          >
            {strings.yes}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const DeleteConfirmationdialog = () => {
    return (
      <Dialog
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
      >
        <DialogTitle>{strings.testimonials.deleteDialogTitle}</DialogTitle>
        <DialogContent>{strings.testimonials.deleteDialogText}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirmation(false)}>
            {strings.no}
          </Button>
          <Button
            onClick={() => {
              if (existingTestimonial?._id)
                dispatch(deleteTestimonial(existingTestimonial?._id));
              setOpenDeleteConfirmation(false);
              onClose();
            }}
          >
            {strings.yes}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      fullScreen={isSmallerThanSM}
      maxWidth="sm"
      hidden={openDeleteConfirmation || openZeroRatingConfirmation}
    >
      <DialogTitle style={{ position: "relative" }}>
        {existingTestimonial
          ? strings.testimonials.editATestimonial
          : strings.testimonials.createANewTestimonial}
        <CloseIcon
          style={{ position: "absolute", right: "20px", cursor: "pointer" }}
          onClick={() => {
            onClose();
          }}
        />
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          direction="column"
          justifyContent="center"
          mt="20px"
          gap="24px"
        >
          <Grid container item>
            <TextField
              required
              fullWidth
              label={strings.text}
              type="text"
              variant="outlined"
              multiline
              minRows={3}
              onChange={(e: any) => {
                setValues({
                  ...values,
                  text: e.target.value,
                });
              }}
              value={values.text}
              sx={{ minWidth: "100px" }}
            />
          </Grid>

          <Grid container item>
            <TextField
              fullWidth
              error={!!errors.videoUrl}
              helperText={errors.videoUrl}
              label={strings.videoUrl}
              type="text"
              variant="outlined"
              onChange={(e: any) => {
                setValues({
                  ...values,
                  videoUrl: e.target.value,
                });
              }}
              value={values.videoUrl}
              sx={{ minWidth: "100px" }}
            />
          </Grid>
          <Stack direction="row" alignItems="center">
            {Array.from({ length: 5 }, (_: any, i: number) => i + 1).map(
              (rating: number) => (
                <StarIcon
                  key={uuidv4()}
                  icon="dashicons:star-filled"
                  fontSize="40px"
                  style={{
                    color:
                      (values.intendedRating &&
                        values.intendedRating >= rating) ||
                      (values.intendedRating &&
                        values.intendedRating >= rating) ||
                      (!values.intendedRating &&
                        values.rating &&
                        values.rating >= rating)
                        ? "#ffca38"
                        : "",
                  }}
                  onMouseEnter={() => {
                    setValues({ ...values, intendedRating: rating });
                  }}
                  onMouseLeave={() => {
                    setValues({ ...values, intendedRating: undefined });
                  }}
                  onClick={() => {
                    let ratingToSet = rating;
                    if (rating === values.rating) ratingToSet = 0;

                    setValues({
                      ...values,
                      rating: ratingToSet,
                      intendedRating: undefined,
                    });
                  }}
                />
              )
            )}
            <RatingValue>
              {values.intendedRating || values.rating || "0"}
            </RatingValue>
          </Stack>
        </Grid>
      </DialogContent>
      <DialogActions>
        {existingTestimonial && (
          <DeleteButton
            onClick={() => {
              setOpenDeleteConfirmation(true);
            }}
            color="error"
          >
            {strings.delete}
          </DeleteButton>
        )}
        <Button
          variant="contained"
          onClick={() => onSubmitTestimonial()}
          disabled={
            (existingTestimonial &&
              existingTestimonial.testimonial === values.text &&
              existingTestimonial.videoUrl === values.videoUrl &&
              existingTestimonial.rating === values.rating) ||
            !values.text
          }
        >
          {existingTestimonial ? strings.save : strings.create}
        </Button>
      </DialogActions>

      <ZeroRatingConfirmationdialog />
      <DeleteConfirmationdialog />
    </Dialog>
  );
};

export default CreateTestimonialsDialog;
