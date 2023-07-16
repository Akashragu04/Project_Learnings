import { takeEvery, call, put } from "redux-saga/effects";
import { BusinessCalculationTypes } from "./Types";
import {
  getBizProfitLossCalculationDetailFailure, getBizProfitLossCalculationDetailSuccess, getBizProfitLossCalculationListFailure, getBizProfitLossCalculationListSuccess,
  getBizProfitLossIterationDetailsFailure,
  getBizProfitLossIterationDetailsSuccess,
  getErrorTokenResponseSuccess,
  updateBizProfitLossCalculationFailure, updateBizProfitLossCalculationSuccess, updateFinalBizProfitLossFailure, updateFinalBizProfitLossSuccess
} from "saga/Actions";
import { ConfigAPI } from "services/config";
import { baseAPI } from "services/Service";
import { toast } from 'react-toastify';
import { appConstants } from "shared/constants/AppConst";

export const watchGetBizCalculationIterationList = function* () {
  yield takeEvery(BusinessCalculationTypes.GET_BIZ_PROFITLOSS_CALCULATION_LIST_REQUEST, workerGetBizCalculationIterationList)
}

export const watchUpdateBizProfitCalculation = function* () {
  yield takeEvery(BusinessCalculationTypes.UPDATE_BIZ_PROFITLOSS_CALCULATION_REQUEST, workerUpdateBizProfitCalculation)
}

export const watchUpdateFinalBizProfitCalculation = function* () {
  yield takeEvery(BusinessCalculationTypes.UPDATE_FINAL_BIZ_PROFITLOSS_REQUEST, workerUpdateFinalBizProfitCalculation)
}

export const watchGetBizProfitLossCalculationDetail = function* () {
  yield takeEvery(BusinessCalculationTypes.GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_REQUEST, workerGetBizProfitLossCalculationDetail)
}

export const watchGetBizProfitLossIterationsDetail = function* () {
  yield takeEvery(BusinessCalculationTypes.GET_BIZ_PROFITLOSS_ITERATION_DETAIL_REQUEST, workerGetBizProfitLossIterationsDetail)
}


function* workerGetBizProfitLossIterationsDetail(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getProfiltandLossIterationDetail;
    const response = yield call(baseAPI.get, `${uri}${request.biz_id}/${request.iteration_id}`);
    if (response.data.status === true) {
      yield put(getBizProfitLossIterationDetailsSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getBizProfitLossIterationDetailsFailure(response.data))
    }
  } catch (error: any) {
    yield put(getBizProfitLossIterationDetailsFailure(error))
  }
}

function* workerGetBizProfitLossCalculationDetail(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getProfiltandLossDetails;
    const response = yield call(baseAPI.get, `${uri}${request.biz_id}`);
    if (response.data.status === true) {
      yield put(getBizProfitLossCalculationDetailSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getBizProfitLossCalculationDetailFailure(response.data))
    }
  } catch (error: any) {
    yield put(getBizProfitLossCalculationDetailFailure(error))
  }
}

function* workerUpdateBizProfitCalculation(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.setBizCaseCalculation;
    const response = yield call(baseAPI.put, `${uri}${request.biz_id}`, request.data);
    if (response.data.status === true) {
      yield put(updateBizProfitLossCalculationSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(updateBizProfitLossCalculationFailure(response.data))
    }
  } catch (error: any) {
    yield put(updateBizProfitLossCalculationFailure(error))
  }
}

function* workerUpdateFinalBizProfitCalculation(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.setFinalProfitandLossIterationDetail;
    const response = yield call(baseAPI.put, `${uri}${request.biz_id}/${request.iteration_id}`, request.data);
    if (response.data.status === true) {
      yield put(updateFinalBizProfitLossSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(updateFinalBizProfitLossFailure(response.data))
    }
  } catch (error: any) {
    yield put(updateFinalBizProfitLossFailure(error))
  }
}

function* workerGetBizCalculationIterationList(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getProfiltandLossIterationList;
    const response = yield call(baseAPI.get, `${uri}${request.biz_id}`);
    if (response.data.status === true) {
      yield put(getBizProfitLossCalculationListSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getBizProfitLossCalculationListFailure(response.data))
    }
  } catch (error: any) {
    yield put(getBizProfitLossCalculationListFailure(error))
  }
}
