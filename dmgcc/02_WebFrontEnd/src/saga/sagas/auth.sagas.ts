
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getLoginSuccess, getLoginFailure, getLogoutSuccess,
  getLogoutFailure, forgetpasswordSuccess, forgetpasswordFailure,
  changePasswordSuccess, changePasswordFailure, getTokenResponseSuccess, getTokenResponseFailure, getClearLoginDetailsSuccess, removePushNotificationSuccess, removePushNotificationFailure, checkNonCustomerValidationSuccess, checkNonCustomerValidationFailure
} from '../Actions/auth.actions';
import { baseAPI } from '../../services/Service';
import { ConfigAPI } from '../../services/config';
// import { history } from '../store';
import { toast } from 'react-toastify';
import { ActionTypes } from "./Types";


export const watchRemovePushNotification = function* () {
  yield takeEvery(ActionTypes.REMOVE_PUSH_NOTIFICATION_REQUEST, workerRemovePushNotification)
}

export const watchCreateNewCustomer = function* () {
  yield takeEvery(ActionTypes.GUEST_CUSTOMER_VALIDATION_REQUEST, workerCreateNewCustomer)
}

function* workerCreateNewCustomer(action: any) {
  try {
    const uri = ConfigAPI.createNewCustomer;
    const { data } = yield call(baseAPI.get, `${uri}`);
    if (data.status) {
      yield put(checkNonCustomerValidationSuccess({
        payload: data
      }))
    } else {
      toast.warn(data.message, { position: 'bottom-right' });
      yield put(checkNonCustomerValidationFailure({
        errors: data.message,
      }))
    }
  } catch (error: any) {
    yield put(checkNonCustomerValidationFailure({
      errors: error.message,
    }))
  }
}

function* workerRemovePushNotification(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.removePushNotification;
    const response = yield call(baseAPI.put, `${uri}${request.notification_id}`, request.data);
    if (response.data.status) {
      yield put(removePushNotificationSuccess(response.data))
    } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(removePushNotificationFailure(response.data))
    }
  } catch (error: any) {
    yield put(removePushNotificationFailure(error))
  }
}

export function* Login(action?: any) {
  try {
    const uri = ConfigAPI.login;
    const { data } = yield call(baseAPI.get, uri, action.value);
    if (data.status === true) {
      // toast.success(data.message, { position: 'bottom-right' });
      yield put(
        getLoginSuccess({
          payload: data,
          token: action.value
        })
      );
    } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        getLoginFailure({
          errors: data.message,
        })
      );
    }
  } catch (e: any) {
    toast.error(e.message, { position: 'bottom-right' });
    yield put(
      getLoginFailure({
        errors: e.message,
      })
    );
  }
}

  // This is a function used to clear business Data list
  export function* clearAuthData() {
    try {
      yield put(
        getClearLoginDetailsSuccess({})
            );
     }
    catch (e:any) {
      yield put(
        getClearLoginDetailsSuccess({})
            );
    }
  }

export function* Logout() {
  try {
    const uri = ConfigAPI.logout;
    const { data } = yield call(baseAPI.get, uri);
    if (data.statuscode === 200 && data.statuscode !== undefined) {
      yield put(
        getLogoutSuccess({
          payload: data,
        })
      );
    } else {
      yield put(
        getLogoutFailure({
          errors: data,
        })
      );
      // toast.warning(data.message, { position: 'bottom-right' });
    }

  } catch (e: any) {
    // toast.error(e.message, { position: 'bottom-right' });
    yield put(
      getLogoutFailure({
        errors: e.message,
      })
    );
  }
}

export function* changePassword(postValue?: any) {
  try {
    const uri = ConfigAPI.resetpassword;
    const { data } = yield call(baseAPI.get, `${uri}?token=${postValue.value.token}&password=${postValue.value.password}`)
    if (data.status === true && data.data === null) {
      toast.success(data.message, { position: 'bottom-right' });
      yield put(
        changePasswordSuccess({
          payload: data,
        })
      );
    } else {
      toast.warning(data.message, { position: 'bottom-right' });
    }

  } catch (e: any) {
    toast.error(e, { position: 'bottom-right' });
    yield put(
      changePasswordFailure({
        errors: e.message,
      })
    );
  }
}

export function* forgotPassword(postValue?: any) {
  try {
    const uri = ConfigAPI.forgetpassword;
    const { data } = yield call(baseAPI.get, `${uri}?email=${postValue.value.email}`)
    // const { data } = yield call(baseAPI.post, uri, postValue.value)
    if (data.statuscode === 200) {
      toast.success(data.message, { position: 'bottom-right' });
      yield put(
        forgetpasswordSuccess({
          payload: data,
        })
      );
    } else {
      toast.warning(data.message, { position: 'bottom-right' });
    }
  } catch (e: any) {
    toast.error(e, { position: 'bottom-right' });
    yield put(
      forgetpasswordFailure({
        errors: e.message,
      })
    );
  }
}

export function* TokenValidationResponse() {
  try {
    const uri = ConfigAPI.checkauth;
    const { data } = yield call(baseAPI.get, uri)
    yield put(
      getTokenResponseSuccess({
        payload: data,
        tokenValidationStatus:data
      })
    );
  }catch(error:any) {
yield put(
  getTokenResponseFailure({
    payload: 'Invalid Valid',
  })
);
  }
} 