import { takeEvery, call, put } from "redux-saga/effects";
import { ActionTypes } from "./Types";
import { setCommonFileUploadSuccess, setCommonFileUploadFailure, getErrorTokenResponseSuccess } from "saga/Actions";
import { ConfigAPI } from "services/config";
import { baseAPI } from "services/Service";
import { toast } from 'react-toastify';
import { appConstants } from "shared/constants/AppConst";

export const watchSetCommonFileUpload = function* () {
  yield takeEvery(ActionTypes.SET_COMMON_FILEUPLOAD_REQUEST, workerSetCommonFileUpload)
}

function* workerSetCommonFileUpload(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.commonFileUpload;
    const response = yield call(baseAPI.post, `${uri}`, request.data);
    if (response.data.status === true) {
      yield put(setCommonFileUploadSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(setCommonFileUploadFailure(response.data))
    }
  } catch (error: any) {
    yield put(setCommonFileUploadFailure(error))
  }
}

