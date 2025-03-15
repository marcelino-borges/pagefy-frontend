import { IAction } from "../shared/types";
import { IUserState, UserActionTypes } from "./types";

// const initialStateMock: IUserState = {
//   loading: false,
//   error: undefined,
//   profile: {
//     _id: "1",
//     firstName: "Marcelino",
//     lastName: "Borges",
//     email: "botelho_gt@hotmail.com",
//   },
// };

const initialState: IUserState = {
  loading: false,
  error: undefined,
  profile: undefined,
  subscriptions: undefined,
};

const userReducer = (
  state: any = initialState,
  action: IAction
): IUserState => {
  switch (action.type) {
    case UserActionTypes.UPLOAD_USER_LOADING:
    case UserActionTypes.GET_USER_LOADING:
    case UserActionTypes.GET_USER_OR_CREATE_LOADING:
    case UserActionTypes.GET_SUBSCRIPTIONS_LOADING:
    case UserActionTypes.GET_ACTIVE_SUBSCRIPTION_LOADING:
    case UserActionTypes.CANCEL_SUBSCRIPTION_LOADING:
      return {
        ...state,
        loading: true,
      };

    case UserActionTypes.UPLOAD_USER_SUCCESS:
    case UserActionTypes.GET_USER_SUCCESS:
    case UserActionTypes.GET_USER_OR_CREATE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading: false,
        error: undefined,
      };

    case UserActionTypes.UPLOAD_USER_ERROR:
    case UserActionTypes.GET_USER_ERROR:
    case UserActionTypes.GET_USER_OR_CREATE_ERROR:
    case UserActionTypes.GET_SUBSCRIPTIONS_ERROR:
    case UserActionTypes.GET_ACTIVE_SUBSCRIPTION_ERROR:
    case UserActionTypes.CANCEL_SUBSCRIPTION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UserActionTypes.GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptions: action.payload,
        loading: false,
        error: undefined,
      };

    case UserActionTypes.CLEAR_STATE:
      return { ...initialState };

    case UserActionTypes.GET_ACTIVE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        activeSubscription: action.payload.subscription,
        planFeatures: action.payload.features,
        loading: false,
      };

    case UserActionTypes.CANCEL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        activeSubscription: undefined,
        planFeatures: undefined,
        loading: false,
      };

    default:
      return { ...state };
  }
};

export default userReducer;
