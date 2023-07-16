import { toast } from 'react-toastify'
import { Reducer } from 'redux'
import { ActionTypes, AuthState } from '../sagas/Types'
// import {history} from '../store/index';

// Type-safe initialState!
export const initialState: AuthState = {
  loading: false,
  items: [],
  errors: null,
  userRoleType: null,
  profileDetails: null,
  isAuthenticated: false,
  isLoading: false,
  getUserDateList: null,
  businessGridData: null,
  leadsResponse: null,
  assignSuccess: null,
  resetPassword: null,
  getLeadsEditResponse: null,
  totalElements: 0,
  totalPages: 10,
  pageSize: 10,
  updateStatus: false,
  getLeadsEditResponseState: false,
  assignSuccessStatus: false,
  tokenValidationStatus: null,
  accessToken: null,
  isCustomerValid: null,
  removeNotificationResponse: {},
  resTokenError:false
}

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  const response = action.data;
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
    case ActionTypes.FORGOTPASSWORD_REQUEST:
    case ActionTypes.CHANGEPASSWORD_REQUEST:
    case ActionTypes.LOGOUT_REQUEST:
      {
        return {
          ...state,
          loading: true,
          isLoading: true,
          tokenValidationStatus: null,
          resTokenError:false,
          errors:null
        }
      }

      case ActionTypes.TOKEN_VALIDATION_REQUEST:
        {
          return {
            ...state,
            loading: true,
            isLoading: true,
            tokenValidationStatus: null,
            errors:null
          }
        }

    case ActionTypes.CLEAR_REQUEST:
      {
        return initialState
      }

    case ActionTypes.LOGIN_SUCCESS:
      {
        const { payload, token } = action.payload
        if (!payload.data.roles) {
          toast.warn("There is no active role for you, Please contact G3C Admin", {
            position: 'bottom-right',
            autoClose: false
          });
        }
        return {
          ...state,
          items: payload,
          loading: false,
          isLoading: false,
          userRoleType: payload.data.roles,
          profileDetails: payload.data,
          isAuthenticated: true,
          getUserDetails: payload,
          accessToken: token?.headers?.Authorization
        };
      }

    case ActionTypes.CHANGEPASSWORD_SUCCESS:
      {
        const { payload } = action.payload
        return {
          ...state,
          loading: false,
          isLoading: false,
          errors: {},
          items: payload,
          isAuthenticated: false,
          resetPassword: payload
        };
      }
      case ActionTypes.TOKEN_ERROR_CHECK_SUCCESS:
        {
          const { resTokenError } = action.payload
          return {
            ...state,
            loading: false,
            resTokenError: resTokenError
          };
        }
  
    case ActionTypes.FORGOTPASSWORD_SUCCESS: {
      const { payload } = action.payload
      return {
        ...state,
        loading: false,
        isLoading: false,
        errors: {},
        items: payload,
        isAuthenticated: false,
      }
    }
    case ActionTypes.LOGOUT_SUCCESS:
      {
        return initialState;
      }

    case ActionTypes.TOKEN_VALIDATION_SUCCESS: {
      const { tokenValidationStatus } = action.payload
      return {
        ...state,
        tokenValidationStatus: tokenValidationStatus
      }
    }
    case ActionTypes.LOGIN_ERROR:
    case ActionTypes.FORGOTPASSWORD_ERROR:
    case ActionTypes.CHANGEPASSWORD_ERROR:
    case ActionTypes.LOGOUT_ERROR:
      {
        return {
          ...state,
          loading: false,
          isLoading: false,
          errors: action.payload,
          items: [],
          isAuthenticated: false,
        }
      }

    case ActionTypes.TOKEN_VALIDATION_ERROR:
      {
        const { payload } = action;
        return {
          ...state,
          loading: false,
          isLoading: false,
          errors: payload,
          items: [],
          isAuthenticated: false,
          tokenValidationStatus: payload
        }
      }
    case ActionTypes.RESET_CUSTOMER_VALIDATION:
      return { ...state, loading: false, isCustomerValid: {} }
    case ActionTypes.GUEST_CUSTOMER_VALIDATION_REQUEST:
      return { ...state, loading: true, isCustomerValid: {},
      errors:null }
    case ActionTypes.GUEST_CUSTOMER_VALIDATION_SUCCESS:
      {
        const { payload } = response;
        window.location.reload();
        return {
          ...state, loading: false, isCustomerValid: payload,
          items: payload,
          userRoleType: payload.data.roles,
          profileDetails: payload.data,
          isAuthenticated: true,
          getUserDetails: payload,
        }
      }
    case ActionTypes.GUEST_CUSTOMER_VALIDATION_ERROR:
      return { ...state, loading: false, errors: action.error }
    case ActionTypes.RESET_PUSH_NOTIFICATION_REQUEST:
      return {
        ...state, loading: false, removeNotificationResponse: {},
        errors:null
      }
    case ActionTypes.REMOVE_PUSH_NOTIFICATION_REQUEST:
      return { ...state, loading: true, removeNotificationResponse: {},
      errors:null }
    case ActionTypes.REMOVE_PUSH_NOTIFICATION_SUCCESS:
      {
        return { ...state, loading: false, removeNotificationResponse: response }
      }
    case ActionTypes.REMOVE_PUSH_NOTIFICATION_ERROR:
      return { ...state, loading: false, errors: action.error }
    case ActionTypes.PROFILE_RESET:
      return initialState;

    default: {
      return state
    }
  }
}

export { reducer as authenticationReducer }