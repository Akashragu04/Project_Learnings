import { takeEvery, call, put } from "redux-saga/effects";
import { FinanceProcessTypes } from "./Types";
import {
  checkAddProvisionDetailFailure,
  checkAddProvisionDetailSuccess,
  createEntityMasterRequestFailure,
  createEntityMasterRequestSuccess,
  createMaterialMasterRequestFailure,
  createMaterialMasterRequestSuccess,
  downloadProvisionsOverallDetailsFailure,
  downloadProvisionsOverallDetailsSuccess,
  getAccuralsDetailsFailure,
  getAccuralsDetailsSuccess,
  getAllAccuralsDetailsFailure, getAllAccuralsDetailsSuccess, getAllCostCenterYTDDetailsFailure, getAllCostCenterYTDDetailsSuccess, getAllEntityMasterDetailsFailure,
  getAllEntityMasterDetailsSuccess, getAllMaterialMasterDetailsFailure, getAllMaterialMasterDetailsSuccess, getAllProvisionsCostCenterFailure, getAllProvisionsCostCenterSuccess, getAllProvisionsStatusFailure, getAllProvisionsStatusSuccess, getAllRateCardDetailsFailure, getAllRateCardDetailsSuccess, getAllSLAContractsDetailsFailure, getAllSLAContractsDetailsSuccess, getAllSLACountryDetailssFailure, getAllSLACountryDetailsSuccess, getCostCenterYTDDetailsFailure,
  getCostCenterYTDDetailsSuccess, getErrorTokenResponseSuccess, getProvisionsFilterDetailsFailure, getProvisionsFilterDetailsSuccess, getProvisionsOverallMetricsFailure, getProvisionsOverallMetricsSuccess, getRateCardDetailsFailure, getRateCardDetailsSuccess, setAccuralFileDownloadFailure, setAccuralFileDownloadSuccess, setAccuralFileUploadFailure, setAccuralFileUploadSuccess, setCostCenterYTDUploadFailure, setCostCenterYTDUploadSuccess, setProvisionsArchieveDownloadFailure, setProvisionsArchieveDownloadSuccess, updateAccuralDetailsFailure, updateAccuralDetailsSuccess, updateEntityMasterRequestFailure, updateEntityMasterRequestSuccess, updateMaterialMasterRequestFailure, updateMaterialMasterRequestSuccess, updateProvisionsDetailsFailure, updateProvisionsDetailsSuccess, updateRateCardDetailsFailure, updateRateCardDetailsSuccess, uploadEntityMasterFileFailure, uploadEntityMasterFileSuccess, uploadMaterialMasterFileFailure, uploadMaterialMasterFileSuccess
} from "saga/Actions";
import { ConfigAPI } from "services/config";
import { baseAPI } from "services/Service";
import { toast } from 'react-toastify';
import { appConstants } from "shared/constants/AppConst";


export const watchGetAllRateCardDetails = function* () {
  yield takeEvery(FinanceProcessTypes.GET_ALL_FINANCE_RATECARD_DETAILS, workerGetAllRateCardDetails)
}

export const watchGetBizRateCardDetails = function* () {
  yield takeEvery(FinanceProcessTypes.GET_FINANCE_RATECARD_DETAILS, workerGetBizRateCardDetails)
}

export const watchUpdateBizRateCardDetails = function* () {
  yield takeEvery(FinanceProcessTypes.UPDATE_FINANCE_RATECARD_REQUEST, workerUpdateBizRateCardDetails)
}

export const watchGetAllAccuralsDetails = function* () {
  yield takeEvery(FinanceProcessTypes.GET_ALL_FINANCE_ACCURALS_DETAILS, workerGetAllAccuralsDetails)
}

export const watchGetAccuralsDetails = function* () {
  yield takeEvery(FinanceProcessTypes.GET_FINANCE_ACCURALS_DETAILS_RESPONSE, workerGetAccuralsDetails)
}

export const watchGetAllCostCenterYTDDetails = function* () {
  yield takeEvery(FinanceProcessTypes.GET_ALL_FINANCE_COST_CENTER_YTD_DETAILS, workerGetAllCostCenterYTDDetails)
}

export const watchGetCostCenterYTDDetails = function* () {
  yield takeEvery(FinanceProcessTypes.GET_FINANCE_COST_CENTER_YTD_DETAILS, workerGetCostCenterYTDDetails)
}

export const watchGetAllEntityMasterDetails = function* () {
  yield takeEvery(FinanceProcessTypes.GET_ALL_FINANCE_ENTITYMASTER_DETAILS, workerGetAllEntityMasterDetails)
}

export const watchCreateEntityMaster = function* () {
  yield takeEvery(FinanceProcessTypes.CREATE_ENTITY_MASTER_REQUEST, workerCreateEntityMaster)
}

export const watchUpdateEntityMaster = function* () {
  yield takeEvery(FinanceProcessTypes.UPDATE_ENTITY_MASTER_REQUEST, workerUpdateEntityMaster)
}

export const watchUploadEntityMaster = function* () {
  yield takeEvery(FinanceProcessTypes.SET_ENTITYMASTER_UPLOAD_REQUEST, workerUploadEntityMaster)
}

export const watchUploadCostCenterYTD = function* () {
  yield takeEvery(FinanceProcessTypes.SET_COSTCENTER_YTD_UPLOAD_REQUEST, workerUploadCostCenterYTD)
}

export const watchGetAllMaterialMasterDetails = function* () {
  yield takeEvery(FinanceProcessTypes.GET_ALL_FINANCE_MATERIALMASTER_DETAILS, workerGetAllMaterialMasterDetails)
}

export const watchCreateMaterialMaster = function* () {
  yield takeEvery(FinanceProcessTypes.CREATE_MATERIAL_MASTER_REQUEST, workerCreateMaterialMaster)
}

export const watchUpdateMaterialMaster = function* () {
  yield takeEvery(FinanceProcessTypes.UPDATE_MATERIAL_MASTER_REQUEST, workerUpdateMaterialMaster)
}

export const watchUploadMaterialMaster = function* () {
  yield takeEvery(FinanceProcessTypes.SET_MATERIALMASTER_UPLOAD_REQUEST, workerUploadMaterialMaster)
}

export const watchUploadAccuralInfo = function* () {
  yield takeEvery(FinanceProcessTypes.SET_ACCURAL_UPLOAD_FILE, workerUploadAccuralInfo)
}

export const watchUpdateAccuralsDetails = function* () {
  yield takeEvery(FinanceProcessTypes.UPDATE_ACCURALS_DETAILS_REQUEST, workerUpdateAccuralsDetails)
}

export const watchDownloadAccuralInfo = function* () {
  yield takeEvery(FinanceProcessTypes.DOWNLOAD_ACCURAL_DETAILS_REQUEST, workerDownloadAccuralInfo)
}

export const watchGetAllProvisionCostCenterDetails = function* () {
  yield takeEvery(FinanceProcessTypes.GET_PROVISIONS_COSTCENTER_REQUEST, workerGetAllProvisionCostCenterDetails)
}

export const watchGetAllProvisionsStatusDetails = function* () {
  yield takeEvery(FinanceProcessTypes.GET_PROVISIONS_STATUS_REQUEST, workerGetAllProvisionsStatusDetails)
}

export const watchGetProvisionsFilterDetails = function* () {
  yield takeEvery(FinanceProcessTypes.GET_PROVISIONS_FILTER_REQUEST, workerGetProvisionsFilterDetails)
}

export const watchUpdateProvisionDetails = function* () {
  yield takeEvery(FinanceProcessTypes.UPDATE_PROVISIONS_DATA_REQUEST, workerUpdateProvisionDetails)
}

export const watchGetProvisionArchieveReport = function* () {
  yield takeEvery(FinanceProcessTypes.DOWNLOAD_PROVISIONS_ARCHIEVE_REQUEST, workerGetProvisionArchieveReport)
}

export const watchCheckAddProvisionDetails = function* () {
  yield takeEvery(FinanceProcessTypes.CHECK_ADD_PROVISIONS_DETAILS_REQUEST, workerCheckAddProvisionDetails)
}

export const watchDownloadProvisionsOverallReport = function* () {
  yield takeEvery(FinanceProcessTypes.DOWNLOAD_PROVISIONS_OVERALL_DETAILS_REQUEST, workerDownloadProvisionsOverallReport)
}

export const watchGetProvisionsOverallMetrics = function* () {
  yield takeEvery(FinanceProcessTypes.GET_PROVISIONS_OVERALL_METRICS_REQUEST, workerGetProvisionsOverallMetrics)
}

export const watchGetAllSlaContractsDetails = function* () {
  yield takeEvery(FinanceProcessTypes.GET_SLA_CONTRACTS_LIST_DETAILS, workerGetAllSlaContractsDetails)
}

export const watchGetAllSlaCountrysDetails = function* () {
  yield takeEvery(FinanceProcessTypes.GET_SLA_COUNTRYS_LIST_DETAILS, workerGetAllSlaCountrysDetails)
}


function* workerGetAllSlaCountrysDetails(action: any) {
  try {
    const uri = ConfigAPI.getSLACountrysList;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data.status) {
      yield put(getAllSLACountryDetailsSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getAllSLACountryDetailssFailure(response.data))
    }
  } catch (error: any) {
    yield put(getAllSLACountryDetailssFailure(error))
  }
}

function* workerGetAllSlaContractsDetails(action: any) {
  try {
    const uri = ConfigAPI.getSLAContractsList;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data.status) {
      yield put(getAllSLAContractsDetailsSuccess(response.data))
    }  else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getAllSLAContractsDetailsFailure(response.data))
    }
  } catch (error: any) {
    yield put(getAllSLAContractsDetailsFailure(error))
  }
}

function* workerGetProvisionsOverallMetrics(action: any) {
  try {
    const uri = ConfigAPI.getProvisionOverallReport;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data) {
      yield put(getProvisionsOverallMetricsSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getProvisionsOverallMetricsFailure(response.data))
    }
  } catch (error: any) {
    yield put(getProvisionsOverallMetricsFailure(error))
  }
}

function* workerDownloadProvisionsOverallReport(action: any) {
  try {
    const uri = ConfigAPI.downloadProvisionOverallReport;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data) {
      yield put(downloadProvisionsOverallDetailsSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadProvisionsOverallDetailsFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadProvisionsOverallDetailsFailure(error))
  }
}

function* workerCheckAddProvisionDetails(action: any) {
  try {
    const uri = ConfigAPI.checkAddProvisionDetail;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data) {
      yield put(checkAddProvisionDetailSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(checkAddProvisionDetailFailure(response.data))
    }
  } catch (error: any) {
    yield put(checkAddProvisionDetailFailure(error))
  }
}

function* workerGetProvisionArchieveReport(action: any) {
  // const request = action.data;
  try {
    const uri = ConfigAPI.downloadProvisionArchieve;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data) {
      yield put(setProvisionsArchieveDownloadSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(setProvisionsArchieveDownloadFailure(response.data))
    }
  } catch (error: any) {
    yield put(setProvisionsArchieveDownloadFailure(error))
  }
}

function* workerUpdateProvisionDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.updateProvisionDetails;
    const response = yield call(baseAPI.put, `${uri}`, request.data);
    if (response.data.status) {
      yield put(updateProvisionsDetailsSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(updateProvisionsDetailsFailure(response.data))
    }
  } catch (error: any) {
    yield put(updateProvisionsDetailsFailure(error))
  }
}

function* workerGetAllProvisionCostCenterDetails(action: any) {
  try {
    const uri = ConfigAPI.getProvisionCostCenter;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data.status) {
      yield put(getAllProvisionsCostCenterSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getAllProvisionsCostCenterFailure(response.data))
    }
  } catch (error: any) {
    yield put(getAllProvisionsCostCenterFailure(error))
  }
}

function* workerGetAllProvisionsStatusDetails(action: any) {
  try {
    const uri = ConfigAPI.getProvisionsStatus;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data.status) {
      yield put(getAllProvisionsStatusSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getAllProvisionsStatusFailure(response.data))
    }
  } catch (error: any) {
    yield put(getAllProvisionsStatusFailure(error))
  }
}

function* workerGetProvisionsFilterDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getProvisionsDetails;
    const response = yield call(baseAPI.put, `${uri}`, request);
    if (response.data.status) {
      yield put(getProvisionsFilterDetailsSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getProvisionsFilterDetailsFailure(response.data))
    }
  } catch (error: any) {
    yield put(getProvisionsFilterDetailsFailure(error))
  }
}

function* workerGetAllRateCardDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getAllbizRateCard;
    const { data } = yield call(baseAPI.get, `${uri}?size=${request.size}&page=${request.page}&sort=${request.sort}&Searchkeyword=${request.Searchkeyword}`);
    if (data.status) {
      yield put(getAllRateCardDetailsSuccess({
        payload: data,
        responseData: data.data,
        tableData: data.data.content
      }))
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warn(data.message, { position: 'bottom-right' });
      yield put(getAllRateCardDetailsFailure(data))
    }
  } catch (error: any) {
    yield put(getAllRateCardDetailsFailure(error))
  }
}

function* workerUpdateBizRateCardDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.updateBizRateCardInfo;
    const response = yield call(baseAPI.put, `${uri}${request.ratecard_id}`, request.data);
    if (response.data.status) {
      yield put(updateRateCardDetailsSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(updateRateCardDetailsFailure(response.data))
    }
  } catch (error: any) {
    yield put(updateRateCardDetailsFailure(error))
  }
}

function* workerGetBizRateCardDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getBizRateCardInfo;
    const response = yield call(baseAPI.get, `${uri}${request.bizcase_id}`);
    if (response.data.status) {
      yield put(getRateCardDetailsSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getRateCardDetailsFailure(response.data))
    }
  } catch (error: any) {
    yield put(getRateCardDetailsFailure(error))
  }
}

function* workerGetAllAccuralsDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getAccurals;
    const { data } = yield call(baseAPI.get, `${uri}?size=${request.size}&page=${request.page}&sort=${request.sort}&Searchkeyword=${request.Searchkeyword}`);
    if (data.status) {
      yield put(getAllAccuralsDetailsSuccess({
        payload: data,
        responseData: data.data,
        tableData: data.data.content
      }))
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warn(data.message, { position: 'bottom-right' });
      yield put(getAllAccuralsDetailsFailure(data))
    }
  } catch (error: any) {
    yield put(getAllAccuralsDetailsFailure(error))
  }
}

function* workerGetAccuralsDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getAccuralsSLADetails; // getAccuralsDetail
    const response = yield call(baseAPI.get, `${uri}${request.accural_id}`);
    if (response.data.status) {
      yield put(getAccuralsDetailsSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getAccuralsDetailsFailure(response.data))
    }
  } catch (error: any) {
    yield put(getAccuralsDetailsFailure(error))
  }
}

function* workerGetAllCostCenterYTDDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getAllCostCenterYTD;
    const { data } = yield call(baseAPI.get, `${uri}?size=${request.size}&page=${request.page}&sort=${request.sort}&searchKeyword=${request.Searchkeyword}`);
    if (data.status) {
      yield put(getAllCostCenterYTDDetailsSuccess({
        payload: data,
        responseData: data.data,
        tableData: data.data.content
      }))
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warn(data.message, { position: 'bottom-right' });
      yield put(getAllCostCenterYTDDetailsFailure(data))
    }
  } catch (error: any) {
    yield put(getAllCostCenterYTDDetailsFailure(error))
  }
}

function* workerGetCostCenterYTDDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getCostCenterYTDDetail;
    const response = yield call(baseAPI.get, `${uri}${request.ccdump_id}`);
    if (response.data.status) {
      yield put(getCostCenterYTDDetailsSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getCostCenterYTDDetailsFailure(response.data))
    }
  } catch (error: any) {
    yield put(getCostCenterYTDDetailsFailure(error))
  }
}

function* workerGetAllEntityMasterDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getAllEntityMaster;
    const { data } = yield call(baseAPI.get, `${uri}?size=${request.size}&page=${request.page}&sort=${request.sort}&searchKeyword=${request.Searchkeyword}`);
    if (data.status) {
      yield put(getAllEntityMasterDetailsSuccess({
        payload: data,
        responseData: data.data,
        tableData: data.data.content
      }))
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warn(data.message, { position: 'bottom-right' });
      yield put(getAllEntityMasterDetailsFailure(data))
    }
  } catch (error: any) {
    yield put(getAllEntityMasterDetailsFailure(error))
  }
}

function* workerCreateEntityMaster(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.createEntityMaster;
    const response = yield call(baseAPI.post, `${uri}`, request.data);
    if (response.data.status) {
      yield put(createEntityMasterRequestSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(createEntityMasterRequestFailure(response.data))
    }
  } catch (error: any) {
    yield put(createEntityMasterRequestFailure(error))
  }
}

function* workerUpdateEntityMaster(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.updateEntityMaster;
    const response = yield call(baseAPI.put, `${uri}${request.entity_id}`, request.data);
    if (response.data.status) {
      yield put(updateEntityMasterRequestSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(updateEntityMasterRequestFailure(response.data))
    }
  } catch (error: any) {
    yield put(updateEntityMasterRequestFailure(error))
  }
}

function* workerGetAllMaterialMasterDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getAllMaterialMaster;
    const { data } = yield call(baseAPI.get, `${uri}?size=${request.size}&page=${request.page}&sort=${request.sort}&searchKeyword=${request.Searchkeyword}`);
    if (data.status) {
      yield put(getAllMaterialMasterDetailsSuccess({
        payload: data,
        responseData: data.data,
        tableData: data.data.content
      }))
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warn(data.message, { position: 'bottom-right' });
      yield put(getAllMaterialMasterDetailsFailure(data))
    }
  } catch (error: any) {
    yield put(getAllMaterialMasterDetailsFailure(error))
  }
}


function* workerCreateMaterialMaster(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.createMaterialMaster;
    const response = yield call(baseAPI.post, `${uri}`, request.data);
    if (response.data.status) {
      yield put(createMaterialMasterRequestSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(createMaterialMasterRequestFailure(response.data))
    }
  } catch (error: any) {
    yield put(createMaterialMasterRequestFailure(error))
  }
}

function* workerUpdateMaterialMaster(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.updateMaterialMaster;
    const response = yield call(baseAPI.put, `${uri}${request.material_id}`, request.data);
    if (response.data.status) {
      yield put(updateMaterialMasterRequestSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(updateMaterialMasterRequestFailure(response.data))
    }
  } catch (error: any) {
    yield put(updateMaterialMasterRequestFailure(error))
  }
}

function* workerUploadEntityMaster(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.uploadEntityMasterDump;
    const response = yield call(baseAPI.post, `${uri}`, request.data);
    if (response.data.status) {
      yield put(uploadEntityMasterFileSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(uploadEntityMasterFileFailure(response.data))
    }
  } catch (error: any) {
    yield put(uploadEntityMasterFileFailure(error))
  }
}

function* workerUploadCostCenterYTD(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.uploadCostCenterYTD;
    const response = yield call(baseAPI.post, `${uri}`, request.data);
    if (response.data.status) {
      yield put(setCostCenterYTDUploadSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(setCostCenterYTDUploadFailure(response.data))
    }
  } catch (error: any) {
    yield put(setCostCenterYTDUploadFailure(error))
  }
}

function* workerUploadMaterialMaster(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.uploadMaterialMasterDump;
    const response = yield call(baseAPI.post, `${uri}`, request.data);
    if (response.data.status) {
      yield put(uploadMaterialMasterFileSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(uploadMaterialMasterFileFailure(response.data))
    }
  } catch (error: any) {
    yield put(uploadMaterialMasterFileFailure(error))
  }
}

function* workerUpdateAccuralsDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.updateAccuralsSLADetails;
    const response = yield call(baseAPI.put, `${uri}`, request.data);
    if (response.data.status) {
      yield put(updateAccuralDetailsSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(updateAccuralDetailsFailure(response.data))
    }
  } catch (error: any) {
    yield put(updateAccuralDetailsFailure(error))
  }
}

function* workerUploadAccuralInfo(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.uploadAccuralsDump;
    const response = yield call(baseAPI.post, `${uri}${request.sla_id}`, request.data);
    if (response.data.status) {
      yield put(setAccuralFileUploadSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(setAccuralFileUploadFailure(response.data))
    }
  } catch (error: any) {
    yield put(setAccuralFileUploadFailure(error))
  }
}

function* workerDownloadAccuralInfo(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getAccuralsDump;
    const response = yield call(baseAPI.get, `${uri}${request.sla_id}`);
    if (response.data) {
      yield put(setAccuralFileDownloadSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(setAccuralFileDownloadFailure(response.data))
    }
  } catch (error: any) {
    yield put(setAccuralFileDownloadFailure(error))
  }
}


// This is used to action get Completed mark Details
export function* clearFinanceStatusDetail(action?: any) {

} 