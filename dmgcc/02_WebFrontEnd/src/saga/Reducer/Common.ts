import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  TOGGLE_APP_DRAWER,
} from "../../types/actions/Common.action";
import { ActionTypes } from "saga/sagas/Types";

const INIT_STATE: any = {
  error: "",
  loading: false,
  isAppDrawerOpen: false,
  updatingContent: false,
  message: "",
  fileResponse: {}
};

const CommonReducer = (
  state = INIT_STATE,
  action: any
): any => {
  const response = action.data;
  switch (action.type) {
    case FETCH_START: {
      return { ...state, error: "", message: "", loading: true };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        error: "",
        message: "",
        loading: false,
        updatingContent: false,
      };
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        error: "",
        message: action.message,
        loading: false,
        updatingContent: false,
      };
    }
    case FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
        message: "",
        updatingContent: false,
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        loading: false,
        error: "",
        message: "",
        updatingContent: false,
      };
    }
    case TOGGLE_APP_DRAWER: {
      return {
        ...state,
        isAppDrawerOpen: !state.isAppDrawerOpen,
      };
    }
    case ActionTypes.SET_COMMON_FILEUPLOAD_RESET:
      return { ...state, loading: false, fileResponse: {} }
    case ActionTypes.SET_COMMON_FILEUPLOAD_REQUEST:
      return { ...state, loading: true, fileResponse: {} }
    case ActionTypes.SET_COMMON_FILEUPLOAD_SUCCESS:
      return { ...state, loading: false, fileResponse: response }
    case ActionTypes.SET_COMMON_FILEUPLOAD_FAILURE:
      return { ...state, loading: false, errors: action.error }
    default:
      return state;
  }
};
export default CommonReducer;
