import { IAction } from "../shared/types";
import { ITestimonial, ITestimonialState, TestimonialTypes } from "./types";

const initialState: ITestimonialState = {
  loading: false,
  error: undefined,
  testimonials: [],
};

const testimonialsReducer = (
  state: ITestimonialState = initialState,
  action: IAction
): ITestimonialState => {
  switch (action.type) {
    case TestimonialTypes.CREATE_TESTIMONIAL_LOADING:
    case TestimonialTypes.GET_ALL_USER_TESTIMONIALS_LOADING:
    case TestimonialTypes.GET_LAST_USER_TESTIMONIAL_LOADING:
    case TestimonialTypes.UPDATE_TESTIMONIAL_LOADING:
    case TestimonialTypes.DELETE_TESTIMONIAL_LOADING:
      return {
        ...state,
        loading: true,
      };

    case TestimonialTypes.CREATE_TESTIMONIAL_SUCCESS: {
      if (state.testimonials) {
        return {
          ...initialState,
          testimonials: [action.payload, ...state.testimonials],
        };
      } else {
        return {
          ...initialState,
          testimonials: [action.payload],
        };
      }
    }

    case TestimonialTypes.UPDATE_TESTIMONIAL_SUCCESS: {
      const updatedItem: ITestimonial = action.payload;

      if (!state.testimonials) return { ...state, testimonials: [updatedItem] };

      const updatedList: ITestimonial[] = state.testimonials.map(
        (testimonial: ITestimonial) => {
          if (testimonial._id === updatedItem._id) {
            return updatedItem;
          }
          return testimonial;
        }
      );

      return {
        ...initialState,
        testimonials: updatedList,
      };
    }

    case TestimonialTypes.DELETE_TESTIMONIAL_SUCCESS: {
      const id: string = action.payload;

      if (!state.testimonials) return { ...state, testimonials: [] };

      const updatedList: ITestimonial[] = state.testimonials.filter(
        (testimonial: ITestimonial) => testimonial._id !== id
      );

      return {
        ...initialState,
        testimonials: updatedList,
      };
    }

    case TestimonialTypes.GET_ALL_USER_TESTIMONIALS_SUCCESS:
      return {
        ...initialState,
        testimonials: action.payload,
      };

    case TestimonialTypes.CREATE_TESTIMONIAL_ERROR:
    case TestimonialTypes.DELETE_TESTIMONIAL_ERROR:
    case TestimonialTypes.UPDATE_TESTIMONIAL_ERROR:
    case TestimonialTypes.GET_ALL_USER_TESTIMONIALS_ERROR:
    case TestimonialTypes.GET_LAST_USER_TESTIMONIAL_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    case TestimonialTypes.CLEAR_TESTIMONIAL_STATE:
      return initialState;

    default:
      return { ...state };
  }
};

export default testimonialsReducer;
