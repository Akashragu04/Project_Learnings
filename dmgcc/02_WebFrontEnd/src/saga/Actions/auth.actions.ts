import { takeEvery } from "redux-saga/effects";
import { ActionTypes } from '../sagas/Types';
import { Login, Logout, forgotPassword, changePassword, TokenValidationResponse, clearAuthData } from '../sagas/auth.sagas';

export const checkLoginSuccess = (postValue?: any) => {
  return {
    type: ActionTypes.GETDATA_SUCCESS,
    payload: postValue
  }
}

export const checkLoginFailure = (errors?: any) => {
  return {
    type: ActionTypes.GETDATA_ERROR,
    payload: errors
  }
}

// This is function is used to store password
export const getLogin = function* () {
  yield takeEvery(ActionTypes.LOGIN_REQUEST, Login);
}

export const getLoginSuccess = (postValue?: any) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: postValue
  }
}

export const getLoginFailure = (errors?: any) => {
  return {
    type: ActionTypes.LOGIN_ERROR,
    payload: errors
  }
}


export const resetCustomerValidationAction = () => ({
  type: ActionTypes.RESET_CUSTOMER_VALIDATION
})

export const checkNonCustomerValidationAction = (data: any) => ({
  type: ActionTypes.GUEST_CUSTOMER_VALIDATION_REQUEST,
  data
})

export const checkNonCustomerValidationSuccess = (data: any) => ({
  type: ActionTypes.GUEST_CUSTOMER_VALIDATION_SUCCESS,
  data
})

export const checkNonCustomerValidationFailure = (error: any) => ({
  type: ActionTypes.GUEST_CUSTOMER_VALIDATION_ERROR,
  error
})

export const resetPushNotificationAction = () => ({
  type: ActionTypes.RESET_PUSH_NOTIFICATION_REQUEST
})

export const removePushNotificationAction = (data: any) => ({
  type: ActionTypes.REMOVE_PUSH_NOTIFICATION_REQUEST,
  data
})

export const removePushNotificationSuccess = (data: any) => ({
  type: ActionTypes.REMOVE_PUSH_NOTIFICATION_SUCCESS,
  data
})

export const removePushNotificationFailure = (error: any) => ({
  type: ActionTypes.REMOVE_PUSH_NOTIFICATION_ERROR,
  error
})

// This is function is used to Operation
export const clearLoginDetails = function* () {
  yield takeEvery(ActionTypes.CLEAR_REQUEST, clearAuthData);
}
export const  reqClearLoginDetails = (postValue?: any) => {
  return {
      type: ActionTypes.CLEAR_REQUEST,
      payload: postValue
  }
}

export const getClearLoginDetailsSuccess = (postValue?: any) => {
  return {
    type: ActionTypes.CLEAR_SUCCESS,
    payload: postValue
  }
}

// This is function is used to Logout page
export const getLogout = function* () {
  yield takeEvery(ActionTypes.LOGOUT_REQUEST, Logout);
}

export const getLogoutSuccess = (postValue?: any) => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
    payload: postValue
  }
}

export const getLogoutFailure = (errors?: any) => {
  return {
    type: ActionTypes.LOGOUT_ERROR,
    payload: errors
  }
}

//This is function is used to forget password 

export const postForgetpassword = function* () {
  yield takeEvery(ActionTypes.FORGOTPASSWORD_REQUEST, forgotPassword);
}

export const forgetpasswordSuccess = (postValue?: any) => {
  return {
    type: ActionTypes.FORGOTPASSWORD_SUCCESS,
    payload: postValue
  }
}

export const forgetpasswordFailure = (errors?: any) => {
  
  return {
    type: ActionTypes.FORGOTPASSWORD_ERROR,
    payload: errors
  }
}

//This is function is used to Reset password 

export const onChangePassword = function* () {
  yield takeEvery(ActionTypes.CHANGEPASSWORD_REQUEST, changePassword);
}

export const changePasswordSuccess = (postValue?: any) => {
  return {
    type: ActionTypes.CHANGEPASSWORD_SUCCESS,
    payload: postValue
  }
}

export const changePasswordFailure = (errors?: any) => {
  return {
    type: ActionTypes.CHANGEPASSWORD_ERROR,
    payload: errors
  }
}
//This is function is used to get Token Response 

export const getTokenResponse = function* () {
  yield takeEvery(ActionTypes.TOKEN_VALIDATION_REQUEST, TokenValidationResponse);
}

export const reqTokenResonse = (postValue?: any) => {
  return {
      type: ActionTypes.TOKEN_VALIDATION_REQUEST,
      payload: postValue
  }
}

export const getTokenResponseSuccess = (postValue?: any) => {

  return {
    type: ActionTypes.TOKEN_VALIDATION_SUCCESS,
    payload: postValue
  }
}

export const getTokenResponseFailure = (errors?: any) => {
  return {
    type: ActionTypes.TOKEN_VALIDATION_ERROR,
    payload: errors
  }
}


export const getErrorTokenResponseSuccess = (postValue?: any) => {

  return {
    type: ActionTypes.TOKEN_ERROR_CHECK_SUCCESS,
    payload: postValue
  }
}