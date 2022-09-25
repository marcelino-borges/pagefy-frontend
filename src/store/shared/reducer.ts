import { IAction, ISharedState, SharedActionTypes } from "../shared/types";

const initialState: ISharedState = {
  loading: false,
  continuousTimeLoading: 0,
};

const userReducer = (
  state: any = initialState,
  action: IAction
): ISharedState => {
  switch (action.type) {
    case SharedActionTypes.SET_LOADING: {
      return {
        loading: true,
        continuousTimeLoading: 0,
      };
    }

    case SharedActionTypes.CLEAR_LOADING:
      return {
        loading: false,
        continuousTimeLoading: 0,
      };

    case SharedActionTypes.INCREMENT_CONTINUOUS_TIME_LOADING: {
      return {
        ...state,
        continuousTimeLoading: state.continuousTimeLoading + 1,
      };
    }

    case SharedActionTypes.CLEAR_CONTINUOUS_TIME_LOADING: {
      return {
        ...state,
        continuousTimeLoading: 0,
      };
    }

    default:
      return { ...state };
  }
};

export default userReducer;
