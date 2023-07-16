import { takeEvery, call, put } from "redux-saga/effects";
import { BusinessRequirementTypes } from "./Types";
import {
  getHRUserDetailSuccess, getHRUserDetailFailure, getITUserDetailSuccess, getITUserDetailFailure, getFacilityUserDetailSuccess,
  getFacilityUserDetailFailure, createBizRequirementSuccess, createBizRequirementFailure, updateBizRequirementSuccess, updateBizRequirementFailure,
  getBizRequirementDetailSuccess, getBizRequirementDetailFailure, saveAndNotifyBizRequirementSuccess, saveAndNotifyBizRequirementFailure,
  saveAndNotifyAllBizRequirementSuccess, saveAndNotifyAllBizRequirementFailure, getBizIterationDetailSuccess, getBizIterationDetailFailure, getExistingRateCardListSuccess, getExistingRateCardListFailure, setRequirementWOBizCaseSuccess, setRequirementWOBizCaseFailure, setActiveRampupIterationDataSuccess, setActiveRampupIterationDataFailure, getFinanceUserDetailSuccess, getFinanceUserDetailFailure, sendFinanceBizEmailSuccess, sendFinanceBizEmailFailure, getErrorTokenResponseSuccess
} from "saga/Actions";
import { ConfigAPI } from "services/config";
import { baseAPI } from "services/Service";
import { toast } from 'react-toastify';
import { appConstants } from "shared/constants/AppConst";


export const watchGetFinanceUserDetails = function* () {
  yield takeEvery(BusinessRequirementTypes.GET_FINANCE_USERDETAILS_REQUEST, workerGetFinanceUserDetails)
}

export const watchSendFinanceBizMailData = function* () {
  yield takeEvery(BusinessRequirementTypes.SEND_FINANCE_BIZ_EMAIL_REQUEST, workerSendFinanceBizMailData)
}

export const watchSetRequirementWoBizCase = function* () {
  yield takeEvery(BusinessRequirementTypes.SET_REQUIREMENT_WITHOUT_BIZCASE_REQUEST, workerSetRequirementWoBizCase)
}

export const watchSetActiveRampupIterationData = function* () {
  yield takeEvery(BusinessRequirementTypes.SET_ACTIVE_RAMPUPDATA_REQUEST, workerSetActiveRampupIterationData)
}

export const watchGetHRUserDetails = function* () {
  yield takeEvery(BusinessRequirementTypes.GET_HR_USERDETAILS_REQUEST, workerGetHRUserDetails)
}

export const watchGetITUserDetails = function* () {
  yield takeEvery(BusinessRequirementTypes.GET_IT_USERDETAILS_REQUEST, workerGetITUserDetails)
}

export const watchGetFacilityUserDetails = function* () {
  yield takeEvery(BusinessRequirementTypes.GET_FACILITY_USERDETAILS_REQUEST, workerGetFacilityUserDetails)
}

export const watchGetExistingRateCardList = function* () {
  yield takeEvery(BusinessRequirementTypes.GET_EXISTING_RATECARD_LIST_REQUEST, workerGetExistingRateCardList)
}

export const watchCreateBizRequirement = function* () {
  yield takeEvery(BusinessRequirementTypes.CREATE_BIZ_REQUIREMENTS, workerCreateBizRequirement)
}

export const watchUpdateBizRequirement = function* () {
  yield takeEvery(BusinessRequirementTypes.UPDATE_BIZ_REQUIREMENTS_REQUEST, workerUpdateBizRequirement)
}

export const watchGetBizRequirementDetail = function* () {
  yield takeEvery(BusinessRequirementTypes.GET_BIZ_REQUIREMENT_DETAILS, workerGetBizRequirementDetail)
}

export const watchSaveandNotifyBizRequirement = function* () {
  yield takeEvery(BusinessRequirementTypes.SAVEANDNOTIFY_BIZ_REQUIREMENTS_REQUEST, workerSaveandNotifyBizRequirement)
}

export const watchSaveandNotifyAllBizRequirement = function* () {
  yield takeEvery(BusinessRequirementTypes.SAVEANDNOTIFYALL_BIZ_REQUIREMENTS_REQUEST, workerSaveandNotifyAllBizRequirement)
}

export const watchGetBizIterationsDetails = function* () {
  yield takeEvery(BusinessRequirementTypes.GET_BIZ_ITERATION_DETAILS, workerGetBizIterationsDetail)
}


function* workerSetActiveRampupIterationData(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.setIterationRampup;
    const response = yield call(baseAPI.put, `${uri}${request.biz_id}`, request.data);
    if (response.data.status === true) {
      yield put(setActiveRampupIterationDataSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(setActiveRampupIterationDataFailure(response.data))
    }
  } catch (error: any) {
    yield put(setActiveRampupIterationDataFailure(error))
  }
}

function* workerSetRequirementWoBizCase(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.setWithoutBizCase;
    const response = yield call(baseAPI.post, `${uri}${request.lead_id}`, request.data);
    if (response.data.status === true) {
      yield put(setRequirementWOBizCaseSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(setRequirementWOBizCaseFailure(response.data))
    }
  } catch (error: any) {
    yield put(setRequirementWOBizCaseFailure(error))
  }
}

function* workerCreateBizRequirement(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.createBizRequirement;
    const response = yield call(baseAPI.post, `${uri}${request.lead_id}`, request.data);
    if (response.data.status === true) {
      yield put(createBizRequirementSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(createBizRequirementFailure(response.data))
    }
  } catch (error: any) {
    yield put(createBizRequirementFailure(error))
  }
}

function* workerGetBizRequirementDetail(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getBizRequirement;
    const response = yield call(baseAPI.get, `${uri}${request.bizcase_id}`);
    if (response.data.status === true) {
      yield put(getBizRequirementDetailSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getBizRequirementDetailFailure(response.data))
    }
  } catch (error: any) {
    yield put(getBizRequirementDetailFailure(error))
  }
}

function* workerGetBizIterationsDetail(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getIterationDetails;
    const response = yield call(baseAPI.get, `${uri}${request.bizcase_id}`);
    if (response.data.status === true) {
      yield put(getBizIterationDetailSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getBizIterationDetailFailure(response.data))
    }
  } catch (error: any) {
    yield put(getBizIterationDetailFailure(error))
  }
}

function* workerSaveandNotifyAllBizRequirement(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.saveAndNotifyAllBizRequirement;
    const response = yield call(baseAPI.post, `${uri}${request.lead_id}/${request.action}/${request.email}`, request.data);
    if (response.data.status === true) {
      yield put(saveAndNotifyAllBizRequirementSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(saveAndNotifyAllBizRequirementFailure(response.data))
    }
  } catch (error: any) {
    yield put(saveAndNotifyAllBizRequirementFailure(error))
  }
}

function* workerSaveandNotifyBizRequirement(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.saveAndNotifyBizRequirement;
    const response = yield call(baseAPI.post, `${uri}${request.bizcase_id}`, request.data);
    if (response.data.status === true) {
      yield put(saveAndNotifyBizRequirementSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(saveAndNotifyBizRequirementFailure(response.data))
    }
  } catch (error: any) {
    yield put(saveAndNotifyBizRequirementFailure(error))
  }
}

function* workerUpdateBizRequirement(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.updateBizRequirement;
    const response = yield call(baseAPI.post, `${uri}${request.bizcase_id}`, request.data);
    if (response.data.status === true) {
      yield put(updateBizRequirementSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(updateBizRequirementFailure(response.data))
    }
  } catch (error: any) {
    yield put(updateBizRequirementFailure(error))
  }
}

function* workerGetHRUserDetails(action: any) {
  try {
    const uri = ConfigAPI.hrUserDetail;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data.status === true) {
      yield put(getHRUserDetailSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getHRUserDetailFailure(response.data))
    }
  } catch (error: any) {
    yield put(getHRUserDetailFailure(error))
  }
}

function* workerGetITUserDetails(action: any) {
  try {
    const uri = ConfigAPI.itUserDetail;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data.status === true) {
      yield put(getITUserDetailSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getITUserDetailFailure(response.data))
    }
  } catch (error: any) {
    yield put(getITUserDetailFailure(error))
  }
}

function* workerGetFacilityUserDetails(action: any) {
  try {
    const uri = ConfigAPI.facilityUserDetail;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data.status === true) {
      yield put(getFacilityUserDetailSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getFacilityUserDetailFailure(response.data))
    }
  } catch (error: any) {
    yield put(getFacilityUserDetailFailure(error))
  }
}

function* workerGetExistingRateCardList(action: any) {
  try {
    const uri = ConfigAPI.existingRateCard;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data.status === true) {
      yield put(getExistingRateCardListSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getExistingRateCardListFailure(response.data))
    }
  } catch (error: any) {
    yield put(getExistingRateCardListFailure(error))
  }
}

function* workerGetFinanceUserDetails(action: any) {
  try {
    const uri = ConfigAPI.getFinanceUsersList;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data.status === true) {
      yield put(getFinanceUserDetailSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getFinanceUserDetailFailure(response.data))
    }
  } catch (error: any) {
    yield put(getFinanceUserDetailFailure(error))
  }
}

function* workerSendFinanceBizMailData(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.sendFinanceMail;
    const response = yield call(baseAPI.post, `${uri}${request.biz_id}`, request.data);
    if (response.data.status === true) {
      yield put(sendFinanceBizEmailSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(sendFinanceBizEmailFailure(response.data))
    }
  } catch (error: any) {
    yield put(sendFinanceBizEmailFailure(error))
  }
}