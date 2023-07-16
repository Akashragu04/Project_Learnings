import { takeEvery, call, put } from "redux-saga/effects";
import { BizJDMappingTypes } from "./Types";
import {
  createBizJDMappingSuccess, createBizJDMappingFailure, getBizJDMappingSuccess, getBizJDMappingFailure,
  getBizProjectSuccess, getBizProjectFailure, setJDFileUploadSuccess, setJDFileUploadFailure, createJDAssignAndJDMappingSuccess,
  createJDAssignAndJDMappingFailure,
  getJDOptionsListSuccess,
  getJDOptionsListFailure,
  getErrorTokenResponseSuccess
} from "saga/Actions";
import { ConfigAPI } from "services/config";
import { baseAPI } from "services/Service";
import { toast } from 'react-toastify';
import { appConstants } from "shared/constants/AppConst";


export const watchGetBizProjectJDDetail = function* () {
  yield takeEvery(BizJDMappingTypes.GET_BIZ_PROJECT_DETAILS, workerGetBizProjectJDDetail)
}

export const watchCreateBizJDMapping = function* () {
  yield takeEvery(BizJDMappingTypes.CREATE_BIZ_JDMAPPINGS, workerCreateBizJDMapping)
}

export const watchGetBizJDMappingDetail = function* () {
  yield takeEvery(BizJDMappingTypes.GET_BIZ_JDMAPPINGS_DETAILS, workerGetBizJDMappingDetail)
}

export const watchSetJDFileUpload = function* () {
  yield takeEvery(BizJDMappingTypes.SET_JDFILE_UPLOAD, workerSetJDFileUpload)
}

export const watchCreateBizJDAssignAndMapping = function* () {
  yield takeEvery(BizJDMappingTypes.CREATE_JDASSIGN_AND_MAPPINGS, workerCreateBizJDAssignAndMapping)
}

export const watchGetJDListOptions = function* () {
  yield takeEvery(BizJDMappingTypes.GET_JDLIST_DETAILS_ACTION, workerGetJDListOptions)
}

function* workerCreateBizJDAssignAndMapping(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.setJDMapAssign;
    const response = yield call(baseAPI.post, `${uri}${request.bizcase_id}`, request.data);
    if (response.data.status === true) {
      yield put(createJDAssignAndJDMappingSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(createJDAssignAndJDMappingFailure(response.data))
    }
  } catch (error: any) {
    yield put(createJDAssignAndJDMappingFailure(error))
  }
}

function* workerCreateBizJDMapping(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.createBizJDMapping;
    const response = yield call(baseAPI.post, `${uri}${request.bizcase_id}`, request.data);
    if (response.data.status === true) {
      yield put(createBizJDMappingSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(createBizJDMappingFailure(response.data))
    }
  } catch (error: any) {
    yield put(createBizJDMappingFailure(error))
  }
}

function* workerGetJDListOptions(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getJDListData;
    const response = yield call(baseAPI.get, `${uri}${request.bizcase_id}`);
    if (response.data.status === true) {
      yield put(getJDOptionsListSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getJDOptionsListFailure(response.data))
    }
  } catch (error: any) {
    yield put(getJDOptionsListFailure(error))
  }
}

function* workerGetBizProjectJDDetail(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getJDProjectDetails;
    const response = yield call(baseAPI.get, `${uri}${request.bizcase_id}`);
    if (response.data.status === true) {
      yield put(getBizProjectSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getBizProjectFailure(response.data))
    }
  } catch (error: any) {
    yield put(getBizProjectFailure(error))
  }
}

function* workerGetBizJDMappingDetail(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getBizJDMapAssigningDetails;
    const response = yield call(baseAPI.get, `${uri}${request.bizcase_id}`);
    if (response.data.status === true) {
      yield put(getBizJDMappingSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getBizJDMappingFailure(response.data))
    }
  } catch (error: any) {
    yield put(getBizJDMappingFailure(error))
  }
}

function* workerSetJDFileUpload(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.setJDFileUpload;
    const response = yield call(baseAPI.post, `${uri}`, request.data);
    if (response.data.status === true) {
      yield put(setJDFileUploadSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(setJDFileUploadFailure(response.data))
    }
  } catch (error: any) {
    yield put(setJDFileUploadFailure(error))
  }
}

