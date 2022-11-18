import { IAction } from "../shared/types";
import { ITestimonial, ITestimonialState, TestimonialTypes } from "./types";

const initialState: ITestimonialState = {
  loading: false,
  error: undefined,
  userTestimonials: [],
  allTestimonials: [],
  // {
  //   user: {
  //     _id: "01",
  //     firstName: "Marcelino",
  //     lastName: "Borges",
  //     email: "botelho_gt@hotmail.com",
  //     profileImageUrl:
  //       "https://storage.googleapis.com/socialbio-dev.appspot.com/users/63335cc8dd69510054ef0ef4/uploaded-images/63335cc8dd69510054ef0ef4_20221021214453454.jpg",
  //   },
  //   testimonial:
  //     "Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal Muito legal ",
  //   pictureUrl: "",
  //   videoUrl: "",
  //   rating: 5,
  //   createdAt: new Date().toString(),
  //   updatedAt: new Date().toString(),
  // },
  // {
  //   user: {
  //     _id: "02",
  //     firstName: "Luana",
  //     lastName: "Borges",
  //     email: "botelho_gt@hotmail.com",
  //     profileImageUrl:
  //       "https://storage.googleapis.com/socialbio-dev.appspot.com/users/63335cc8dd69510054ef0ef4/uploaded-images/63335cc8dd69510054ef0ef4_20221021214453454.jpg",
  //   },
  //   testimonial: "Muito legal",
  //   pictureUrl: "",
  //   videoUrl: "",
  //   rating: 5,
  //   createdAt: new Date().toString(),
  //   updatedAt: new Date().toString(),
  // },
  // {
  //   user: {
  //     _id: "03",
  //     firstName: "Rafael",
  //     lastName: "Schmitt",
  //     email: "botelho_gt@hotmail.com",
  //     profileImageUrl:
  //       "https://storage.googleapis.com/socialbio-dev.appspot.com/users/63335cc8dd69510054ef0ef4/uploaded-images/63335cc8dd69510054ef0ef4_20221021214453454.jpg",
  //   },
  //   testimonial: "Muito legal",
  //   pictureUrl: "",
  //   videoUrl: "",
  //   rating: 5,
  //   createdAt: new Date().toString(),
  //   updatedAt: new Date().toString(),
  // },
  // {
  //   user: {
  //     _id: "04",
  //     firstName: "Neto",
  //     lastName: "Torres",
  //     email: "botelho_gt@hotmail.com",
  //     profileImageUrl: "",
  //   },
  //   testimonial: "Muito legal",
  //   pictureUrl: "",
  //   videoUrl: "",
  //   rating: 5,
  //   createdAt: new Date().toString(),
  //   updatedAt: new Date().toString(),
  // },
  // {
  //   user: {
  //     _id: "04",
  //     firstName: "Andrew",
  //     lastName: "Noway",
  //     email: "botelho_gt@hotmail.com",
  //     profileImageUrl:
  //       "https://storage.googleapis.com/socialbio-dev.appspot.com/users/63335cc8dd69510054ef0ef4/uploaded-images/63335cc8dd69510054ef0ef4_20221021214453454.jpg",
  //   },
  //   testimonial: "Muito legal",
  //   pictureUrl: "",
  //   videoUrl: "",
  //   rating: 5,
  //   createdAt: new Date().toString(),
  //   updatedAt: new Date().toString(),
  // },
  // {
  //   user: {
  //     _id: "05",
  //     firstName: "Ilza",
  //     lastName: "Perrier",
  //     email: "botelho_gt@hotmail.com",
  //     profileImageUrl:
  //       "https://storage.googleapis.com/socialbio-dev.appspot.com/users/63335cc8dd69510054ef0ef4/uploaded-images/63335cc8dd69510054ef0ef4_20221021214453454.jpg",
  //   },
  //   testimonial: "Muito legal",
  //   pictureUrl: "",
  //   videoUrl: "",
  //   rating: 5,
  //   createdAt: new Date().toString(),
  //   updatedAt: new Date().toString(),
  // },
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
    case TestimonialTypes.GET_ALL_TESTIMONIALS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case TestimonialTypes.CREATE_TESTIMONIAL_SUCCESS: {
      if (state.userTestimonials) {
        return {
          ...initialState,
          userTestimonials: [action.payload, ...state.userTestimonials],
        };
      } else {
        return {
          ...initialState,
          userTestimonials: [action.payload],
        };
      }
    }

    case TestimonialTypes.UPDATE_TESTIMONIAL_SUCCESS: {
      const updatedItem: ITestimonial = action.payload;

      if (!state.userTestimonials)
        return { ...state, userTestimonials: [updatedItem] };

      const updatedList: ITestimonial[] = state.userTestimonials.map(
        (testimonial: ITestimonial) => {
          if (testimonial._id === updatedItem._id) {
            return updatedItem;
          }
          return testimonial;
        }
      );

      return {
        ...initialState,
        userTestimonials: updatedList,
      };
    }

    case TestimonialTypes.DELETE_TESTIMONIAL_SUCCESS: {
      const id: string = action.payload;

      if (!state.userTestimonials) return { ...state, userTestimonials: [] };

      const updatedList: ITestimonial[] = state.userTestimonials.filter(
        (testimonial: ITestimonial) => testimonial._id !== id
      );

      return {
        ...initialState,
        userTestimonials: updatedList,
      };
    }

    case TestimonialTypes.GET_ALL_TESTIMONIALS_SUCCESS:
      return {
        ...initialState,
        allTestimonials: action.payload,
      };

    case TestimonialTypes.GET_ALL_USER_TESTIMONIALS_SUCCESS:
      return {
        ...initialState,
        userTestimonials: action.payload,
      };

    case TestimonialTypes.CREATE_TESTIMONIAL_ERROR:
    case TestimonialTypes.DELETE_TESTIMONIAL_ERROR:
    case TestimonialTypes.UPDATE_TESTIMONIAL_ERROR:
    case TestimonialTypes.GET_ALL_USER_TESTIMONIALS_ERROR:
    case TestimonialTypes.GET_ALL_TESTIMONIALS_ERROR:
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
