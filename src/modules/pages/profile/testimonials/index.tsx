import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import strings from "../../../../localization";
import TriplePageTitle from "../../../components/page-title";
import { IApplicationState } from "../../../../store";
import { getAllUserTestimonials } from "../../../../store/testimonials/actions";
import LoadingSpinner from "../../../components/loading-spinner";
import { SECONDARY_COLOR } from "../../../../styles/colors";
import { ITestimonial } from "../../../../store/testimonials/types";
import UserTestimonialCard from "./card";
import { showErrorToast } from "./../../../../utils/toast";
import CreateTestimonialsDialog from "./create-edit-testimonial-dialog";

const UserTestimonials = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector(
    (state: IApplicationState) => state.user.profile
  );
  const userTestimonials = useSelector(
    (state: IApplicationState) => state.testimonials
  );

  const [openCreateTestimonialDialog, setOpenCreateTestimonialDialog] =
    useState(false);
  const [testimonialEditted, setTestimonialEditted] = useState<
    ITestimonial | undefined
  >();

  useEffect(() => {
    if (userProfile?._id) dispatch(getAllUserTestimonials(userProfile._id));
  }, [dispatch, userProfile?._id]);

  useEffect(() => {
    if (userTestimonials.error?.length) {
      showErrorToast(userTestimonials.error);
    }
  }, [userTestimonials.error]);

  const testimonials = useMemo(() => {
    if (!userTestimonials.userTestimonials) return null;

    return (
      <>
        {userTestimonials.userTestimonials.map((testimonial: ITestimonial) => (
          <UserTestimonialCard
            testimonial={testimonial}
            key={testimonial._id}
            onClick={() => {
              setTestimonialEditted(testimonial);
              setOpenCreateTestimonialDialog(true);
            }}
          />
        ))}
      </>
    );
  }, [userTestimonials.userTestimonials]);

  return (
    <>
      <TriplePageTitle
        titles={[
          strings.testimonials.userTestimonials,
          strings.testimonials.userTestimonialsSubtitle,
          "",
        ]}
        increasingSize
      />
      {!userTestimonials.loading &&
        (!userTestimonials.userTestimonials ||
          userTestimonials.userTestimonials?.length === 0) && (
          <Grid container pt="24px" pb="24px">
            <Button
              variant="contained"
              onClick={() => setOpenCreateTestimonialDialog(true)}
            >
              {strings.testimonials.leaveTestimonial}
            </Button>
          </Grid>
        )}

      {userTestimonials.loading && (
        <LoadingSpinner
          m="auto"
          color={SECONDARY_COLOR}
          w="100%"
          h="100%"
          size={40}
        />
      )}
      <Grid container gap="24px">
        {testimonials}
      </Grid>
      <CreateTestimonialsDialog
        open={openCreateTestimonialDialog}
        onClose={() => {
          setOpenCreateTestimonialDialog(false);
          setTestimonialEditted(undefined);
        }}
        existingTestimonial={testimonialEditted}
      />
    </>
  );
};

export default UserTestimonials;
