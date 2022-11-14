import { useDispatch } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { getAllTestimonials } from "../../../store/testimonials/actions";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store";
import {
  ArrowIcon,
  CARD_SLIDE_DURATION,
  CARD_SLIDE_TRANSITION,
  NavigationContainer,
  TestimonialCard,
  TestimonialsContainer,
  TestimonialText,
  UserName,
  UserPicture,
} from "./style";
import RatingStars from "../rating-stars";
import { IUser } from "../../../store/user/types";
import { Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import strings from "../../../localization";

interface ITestimonialsSlidyProps {
  locale?: string;
}

const TestimonialsSlidy = ({ locale = "en" }: ITestimonialsSlidyProps) => {
  const dispatch = useDispatch();
  const allTestimonials = useSelector(
    (state: IApplicationState) => state.testimonials.allTestimonials
  );
  const cardRef = useRef(null);

  const [displayedCardIndex, setDisplayedCardIndex] = useState(0);
  const [cardDirection, setCardDirection] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    // dispatch(getAllTestimonials(undefined, locale));
  }, [dispatch, locale]);

  const testimonialDisplayed = useMemo(
    () => allTestimonials?.length && allTestimonials[displayedCardIndex],
    [allTestimonials, displayedCardIndex]
  );

  useEffect(() => {
    if (cardDirection !== 0) {
      changeDisplayedIndex(cardDirection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDirection]);

  const changeDisplayedIndex = (direction: number) => {
    const card = cardRef as any;

    if (
      !allTestimonials?.length ||
      isSliding ||
      !card ||
      !card.current ||
      !card.current.style
    )
      return;

    if (direction > 0) {
      if (displayedCardIndex === allTestimonials.length - 1) return;
      card.current.style.transform = "translateX(-2000px)";
    } else if (direction < 0) {
      if (displayedCardIndex === 0) return;
      card.current.style.transform = "translateX(2000px)";
    }

    setIsSliding(true);

    setTimeout(() => {
      card.current.style.transition = "none";
      card.current.style.visibility = "hidden";

      if (direction > 0) {
        card.current.style.transform = "translateX(2000px)";
        setDisplayedCardIndex((current) => {
          if (current < allTestimonials?.length - 1) return current + 1;
          return current;
        });
      } else if (direction < 0) {
        card.current.style.transform = "translateX(-2000px)";
        setDisplayedCardIndex((current) => {
          if (current > 0) return current - 1;
          return current;
        });
      }

      setTimeout(() => {
        card.current.style.transition = CARD_SLIDE_TRANSITION;
        card.current.style.visibility = "visible";
        card.current.style.transform = "translateX(0px)";
        // card.scrollIntoView({ behavior: "smooth" });
        setIsSliding(false);
        setCardDirection(0);
      }, CARD_SLIDE_DURATION);
    }, CARD_SLIDE_DURATION);
  };

  const NavigationButtons = () => {
    return (
      <NavigationContainer direction="row">
        <ArrowIcon
          isLeft
          onClick={() => {
            setCardDirection(-1);
          }}
        >
          <Icon icon="eva:arrow-ios-back-fill" />
        </ArrowIcon>
        <ArrowIcon
          onClick={() => {
            setCardDirection(1);
          }}
        >
          <Icon icon="eva:arrow-ios-forward-fill" />
        </ArrowIcon>
      </NavigationContainer>
    );
  };

  return (
    <TestimonialsContainer>
      {allTestimonials?.length && testimonialDisplayed ? (
        <TestimonialCard ref={cardRef} id="testimonial-card" direction="column">
          <TestimonialText>{testimonialDisplayed.testimonial}</TestimonialText>
          <RatingStars rating={testimonialDisplayed.rating} size={30} />
          <Stack
            direction="row"
            alignItems="center"
            flexWrap="nowrap"
            mt="16px"
            gap="16px"
          >
            {testimonialDisplayed.pictureUrl ||
              ((testimonialDisplayed.user as Partial<IUser>)
                .profileImageUrl && (
                <UserPicture
                  pictureUrl={
                    testimonialDisplayed.pictureUrl ||
                    (testimonialDisplayed.user as Partial<IUser>)
                      .profileImageUrl
                  }
                  style={{}}
                />
              ))}
            <UserName>{`${
              (testimonialDisplayed.user as Partial<IUser>).firstName
            } ${
              (testimonialDisplayed.user as Partial<IUser>).lastName
            }`}</UserName>
            <NavigationButtons />
          </Stack>
        </TestimonialCard>
      ) : (
        <>{strings.sorryThisIsNotAvailable}</>
      )}
    </TestimonialsContainer>
  );
};

export default TestimonialsSlidy;
