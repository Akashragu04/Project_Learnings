import { takeEvery, call, put } from "redux-saga/effects";
import { BizCaseSLATypes } from "./Types";
import {
  getAllBizCaseSLADetailsFailure, getAllBizCaseSLADetailsSuccess,
  getBizCaseSLAEditSuccess, getBizCaseSLAEditFailure, getBizCaseSLASuccess,
  getBizCaseSLAFailure, getBizCaseSLACustomerSuccess, getBizCaseSLACustomerFailure, getBizCaseSLACostcenterSuccess,
  getBizCaseSLACostcenterFailure, getBizCaseSLAMaterialDescSuccess, getBizCaseSLAMaterialDescFailure, updateBizCaseSLASuccess,
  updateBizCaseSLAFailure, updateTermsConditionsSuccess, updateTermsConditionsFailure, updateAttachmentsConditionsSuccess,
  updateAttachmentsConditionsFailure, getBillingCycleListSuccess, getBillingCycleListFailure, getProjectSLADetailsFailure,
  getProjectSLADetailsSuccess, getBillingcycleFailure, getBillingcycleSuccess, getOrganizationSuccess,
  getOrganizationFailure,
  updateBizSLAContractDetailsSuccess,
  updateBizSLAContractDetailsFailure,
  getPerinvoiceSuccess,
  getPerinvoiceFailure,
  setBizCaseC4DSLARequestSuccess,
  setBizCaseC4DSLARequestFailure,
  getBizCaseC4DSLADetailsSuccess,
  getBizCaseC4DSLADetailsFailure,
  getMaterialdescriptionSuccess,
  getMaterialdescriptionFailure,
  getContractOptionSuccess,
  getContractOptionFailure,
  getCountryListSuccess,
  getCountryListFailure,
  getRateCardSuccess,
  getRateCardFailure,
  getTariffSheetMaterialdescriptionSuccess,
  getTariffSheetMaterialdescriptionFailure,
  getErrorTokenResponseSuccess,
  sentApprovalSlaFailure,
  sentApprovalSlaSuccess,
  getApprovalSlaFailure,
  getApprovalSlaSuccess
} from "saga/Actions";
import { ConfigAPI } from "services/config";
import { baseAPI } from "services/Service";
import { toast } from 'react-toastify';
import { appConstants } from "shared/constants/AppConst";


export function* createBizCaseSLA(getBizCaseSLAInfo?: any) {
  try {
    const uri = ConfigAPI.createBizCaseSLA;
    const { data } = yield call(baseAPI.post, `${uri}${getBizCaseSLAInfo.payload.slaid}`, getBizCaseSLAInfo.payload.slaFormData);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getBizCaseSLASuccess({
          payload: data,
          createSLAResponse: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        getBizCaseSLAFailure({
          errors: data,
        })
      );
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getBizCaseSLAFailure({
        errors: e.message,
      })
    );
  }
}

export function* getTariffSheetMaterialdescriptionData(action: any) {
  const request = action.payload;
  try {
    const uri = ConfigAPI.getMatericalDescriptionURL;
    const { data } = yield call(baseAPI.get, `${uri}?costcenter=${request.costcenter}&contractoption=${request.contractoption}&materialdescription=${request.materialdescription}&country=${request.countryname}`);
    if (data.status === true && data.statuscode === 200) {
      yield put(getTariffSheetMaterialdescriptionSuccess({
        payload: data
      }))
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warn(data.message, { position: 'bottom-right' });
      yield put(getTariffSheetMaterialdescriptionFailure(data))
    }
  } catch (error: any) {
    yield put(getTariffSheetMaterialdescriptionFailure(error))
  }
}

export function* getMaterialdescriptionData(action: any) {
  const request = action.payload;
  try {
    const uri = ConfigAPI.getMatericalDescriptionURL;
    const { data } = yield call(baseAPI.get, `${uri}?costcenter=${request.costcenter}&materialdescription=${request.materialdescription}&country=${request.country}`);
    if (data.status === true && data.statuscode === 200) {
      yield put(getMaterialdescriptionSuccess({
        payload: data
      }))
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warn(data.message, { position: 'bottom-right' });
      yield put(getMaterialdescriptionFailure(data))
    }
  } catch (error: any) {
    yield put(getMaterialdescriptionFailure(error))
  }
}

export function* getSLAEditDetails(getSLAEdit?: any) {
  try {
    const uri = ConfigAPI.getBizCaseSLA;
    const { data } = yield call(baseAPI.get, `${uri}/${getSLAEdit.payload}`);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getBizCaseSLAEditSuccess({
          payload: data,
          getSlaEditData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        getBizCaseSLAEditFailure({
          errors: data.data,
        })
      );
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getBizCaseSLACustomerFailure({
        errors: e.message,
      })
    );
  }
}
export function* updateBizCaseSLAContact(updateBizCaseSLAInfo?: any) {
  try {
    const uri = ConfigAPI.updateSLAContactsURL;
    const { data } = yield call(baseAPI.put, `${uri}${updateBizCaseSLAInfo.payload.slaid}`, updateBizCaseSLAInfo.payload.slaFormData);

    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        updateBizCaseSLASuccess({
          payload: data,
          getSLAData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        updateBizCaseSLAFailure({
          errors: data,
        })
      );
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      updateBizCaseSLAFailure({
        errors: e.message,
      })
    );
  }
}

export function* getcustomerList() {
  try {
    const uri = ConfigAPI.customerBizCaseSLA;
    const { data } = yield call(baseAPI.get, `${uri}`);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getBizCaseSLACustomerSuccess({
          payload: data,
          getCustomerData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        getBizCaseSLACustomerFailure({
          errors: data.data,
        })
      );
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getBizCaseSLACustomerFailure({
        errors: e.message,
      })
    );
  }
}

// This is the used to get country list
export function* getCountryListData() {
  try {
    const uri = ConfigAPI.getCountryListUrl;
    const { data } = yield call(baseAPI.get, `${uri}`);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getCountryListSuccess({
          payload: data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        getCountryListFailure({
          errors: data.data,
        })
      );
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getCountryListFailure({
        errors: e.message,
      })
    );
  }
}

// This is the used to get Contract Option
export function* getContractOptionData() {
  try {
    const uri = ConfigAPI.getContractListUrl;
    const { data } = yield call(baseAPI.get, `${uri}`);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getContractOptionSuccess({
          payload: data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        getContractOptionFailure({
          errors: data.data,
        })
      );
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getContractOptionFailure({
        errors: e.message,
      })
    );
  }
}

export function* getCostcenterList() {
  try {
    const uri = ConfigAPI.costCenterBizCaseSLA;
    const { data } = yield call(baseAPI.get, `${uri}`);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getBizCaseSLACostcenterSuccess({
          payload: data,
          getCostcenterData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        getBizCaseSLACostcenterFailure({
          errors: data.data,
        })
      );
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getBizCaseSLACostcenterFailure({
        errors: e.message,
      })
    );
  }
}

export function* getMaterialList(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.MaterialBizCaseSLA;
    const { data } = yield call(baseAPI.get, `${uri}/${request.costCenter}`);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getBizCaseSLAMaterialDescSuccess({
          payload: data,
          getMaterialDescData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        getBizCaseSLAMaterialDescFailure({
          errors: data.data,
        })
      );
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getBizCaseSLAMaterialDescFailure({
        errors: e.message,
      })
    );
  }
}

export function* getRateCardData(action: any) {
  const request = action.payload;
  try {
    const uri = ConfigAPI.getCurrecncyUrl;
    const { data } = yield call(baseAPI.get, `${uri}?currencytype=${request}`);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getRateCardSuccess({
          payload: data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        getRateCardFailure({
          errors: data.data,
        })
      );
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getRateCardFailure({
        errors: e.message,
      })
    );
  }
}

export const watchGetAllBizCaseDetails = function* () {
  yield takeEvery(BizCaseSLATypes.GET_ALL_BIZCASE_SLA_DETAILS, workerGetAllBizCaseDetails)
}

export const watchUpdateBizSLAContractDetail = function* () {
  yield takeEvery(BizCaseSLATypes.UPDATE_BIZCASE_SLA_CONTRACT_DETAILS, workerUpdateBizSLAContractDetail)
}

export const watchUpdateBizC4DSLADetail = function* () {
  yield takeEvery(BizCaseSLATypes.SET_BIZCASE_C4DSLA_REQUEST, workerUpdateBizC4DSLADetail)
}

export const watchGetBizC4DSLADetails = function* () {
  yield takeEvery(BizCaseSLATypes.GET_BIZCASE_C4DSLA_DETAILS, workerGetBizC4DSLADetails)
}

function* workerGetBizC4DSLADetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getSLAC4dDetails;
    const response = yield call(baseAPI.post, `${uri}${request.project_id}`, request.data);
    if (response.data.status) {
      yield put(getBizCaseC4DSLADetailsSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getBizCaseC4DSLADetailsFailure(response.data))
    }
  } catch (error: any) {
    yield put(getBizCaseC4DSLADetailsFailure(error))
  }
}

function* workerUpdateBizC4DSLADetail(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.slaC4dUpload;
    const response = yield call(baseAPI.post, `${uri}`, request.data);
    if (response.data.status) {
      yield put(setBizCaseC4DSLARequestSuccess(response.data))
    }else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   } else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(setBizCaseC4DSLARequestFailure(response.data))
    }
  } catch (error: any) {
    yield put(setBizCaseC4DSLARequestFailure(error))
  }
}

export function* workerUpdateBizSLAContractDetail(action?: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.updateSLAContractStatus;
    const { data } = yield call(baseAPI.put, `${uri}${request.slaid}`, request.slaFormData);

    if (data.status) {
      yield put(
        updateBizSLAContractDetailsSuccess({
          payload: data,
          getSLAData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        updateBizSLAContractDetailsFailure({
          errors: data.data,
        })
      );
    }

  } catch (e: any) {
    yield put(
      updateBizSLAContractDetailsFailure({
        errors: e.message,
      })
    );
  }
}

function* workerGetAllBizCaseDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getAllBizCase;
    const { data } = yield call(baseAPI.get, `${uri}?size=${request.size}&page=${request.page}&sort=${request.sort}&Searchkeyword=${request.Searchkeyword}`);
    if (data.status) {
      yield put(getAllBizCaseSLADetailsSuccess({
        payload: data,
        responseData: data.data,
        tableData: data.data.content
      }))
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warn(data.message, { position: 'bottom-right' });
      yield put(getAllBizCaseSLADetailsFailure(data))
    }
  } catch (error: any) {
    yield put(getAllBizCaseSLADetailsFailure(error))
  }
}


export function* updateTermsConditionsData(getFileUploadData?: any) {
  try {
    const uri = ConfigAPI.taskFileUpload;
    const { data } = yield call(baseAPI.post, `${uri}`, getFileUploadData.payload);
    if (data.status === true) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        updateTermsConditionsSuccess({
          payload: data,
          resTermsFileUpload: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        updateTermsConditionsFailure({
          payload:data,
          errors: data.data,
        })
      );
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      updateTermsConditionsFailure({
        errors: e.message,
      })
    );
  }
}

export function* updateAttachmentsConditionsData(getFileUploadData?: any) {
  try {
    const uri = ConfigAPI.taskFileUpload;
    const { data } = yield call(baseAPI.post, `${uri}`, getFileUploadData.payload);
    if (data.status === true) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        updateAttachmentsConditionsSuccess({
          payload: data,
          resAttachmentsFileUpload: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        updateAttachmentsConditionsFailure({
          payload:data,
          errors: data.data,
        })
      );
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      updateAttachmentsConditionsFailure({
        errors: e.message,
      })
    );
  }
}

export function* getBillingCycleListData(getBillingCycleData?: any) {
  try {
    const uri = ConfigAPI.slapreinvoicedropdown;
    const { data } = yield call(baseAPI.get, `${uri}${getBillingCycleData.payload}`);
    if (data.status === true) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getBillingCycleListSuccess({
          payload: data,
          slaBillingCycleList: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        getBillingCycleListFailure({
          errors: data.data,
        })
      );
    }
  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getBillingCycleListFailure({
        errors: e.message,
      })
    );
  }
}

export function* getPerinvoiceData(getPerinvoiceData?: any) {
  try {
    const uri = ConfigAPI.slapreinvoiceinfo;
    const { data } = yield call(baseAPI.post, `${uri}`, getPerinvoiceData.payload);
    if (data.status === true) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getPerinvoiceSuccess({
          payload: data,
          getSlaInfo: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        getPerinvoiceFailure({
          errors: data.data,
        })
      );
    }
  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getPerinvoiceFailure({
        errors: e.message,
      })
    );
  }
}

export function* postPerinvoiceData(getBillingCycleData?: any) {
  try {
    const uri = ConfigAPI.slapreinvoice;
    const { data } = yield call(baseAPI.post, `${uri}${getBillingCycleData.payload}`);
    if (data.status === true) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getBillingCycleListSuccess({
          payload: data,
          slaBillingCycleList: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        getBillingCycleListFailure({
          errors: data.data,
        })
      );
    }
  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getBillingCycleListFailure({
        errors: e.message,
      })
    );
  }
}

export function* getProjectSLADetailsData(getSLAData?: any) {
  try {
    const uri = ConfigAPI.getprojectdetails;
    const { data } = yield call(baseAPI.get, `${uri}${getSLAData.payload}`);
    if (data.status === true) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getProjectSLADetailsSuccess({
          payload: data,
          getProjectSLAData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        getProjectSLADetailsFailure({
          errors: data.data,
        })
      );
    }
  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getProjectSLADetailsFailure({
        errors: e.message,
      })
    );
  }
}


export function* getOrganizationData(getSLAData?: any) {
  try {
    const uri = ConfigAPI.getOrganization;
    const { data } = yield call(baseAPI.get, `${uri}`);
    if (data.status === true) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getOrganizationSuccess({
          payload: data,
          OrganizationData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        getOrganizationFailure({
          errors: data.data,
        })
      );
    }
  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getOrganizationFailure({
        errors: e.message,
      })
    );
  }
}


export function* getBillingcycleData(getSLAData?: any) {
  try {
    const uri = ConfigAPI.getBillingcycle;
    const { data } = yield call(baseAPI.get, `${uri}`);
    if (data.status === true) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getBillingcycleSuccess({
          payload: data,
          BillingcycleData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        getBillingcycleFailure({
          errors: data.data,
        })
      );
    }
  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getBillingcycleFailure({
        errors: e.message,
      })
    );
  }
}

export function* sentApprovalSlaData(putValues?:any) {
  try { 
    const uri = ConfigAPI.slaApprovalUrl;
    const {data} = yield call(baseAPI.put, `${uri}${putValues.payload.Approval_ID}/${putValues.payload.receiver}/${putValues.payload.token}`);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        sentApprovalSlaSuccess({
          payload: data,
          slaApprovalSuccess:data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   }else {
      yield put(
        sentApprovalSlaFailure({
          errors: data,
        })
      );
      toast.warning(data.message, {position: 'bottom-right'});
    }
    
  } catch (e:any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      sentApprovalSlaFailure({
        errors: e.message,
      })
    );
  }
}

export function* getApprovalSlaData(putValues?:any) {
  try { 
    const {data} = yield call(baseAPI.get, `${putValues.payload.url}${putValues.payload.slaId}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getApprovalSlaSuccess({
          payload: data,
          resSLAApproval:data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   }else {
      yield put(
        getApprovalSlaFailure({
          errors: data,
        })
      );
      toast.warning(data.message, {position: 'bottom-right'});
    }
    
  } catch (e:any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getApprovalSlaFailure({
        errors: e.message,
      })
    );
  }
}