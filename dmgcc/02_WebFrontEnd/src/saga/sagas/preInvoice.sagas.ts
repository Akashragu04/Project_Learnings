import { takeEvery, call, put } from "redux-saga/effects";
import { PreInvoiceTypes } from "./Types";
import {
  getAllPreInvoiceDetailsFailure, getAllPreInvoiceDetailsSuccess, getAllInvoiceDetailsFailure, getAllInvoiceDetailsSuccess,
  createPreInvoiceSuccess, createPreInvoiceFailure, getPreInvoiceDetailSuccess, getPreInvoiceDetailFailure, getErrorTokenResponseSuccess, reqDeleteProvisionsFailure, reqDeleteProvisionsSuccess, ProjectProvisionsSuccess, ProjectProvisionsFailure, SLAProvisionsSuccess, SLAProvisionsFailure
} from "saga/Actions";
import { ConfigAPI } from "services/config";
import { baseAPI } from "services/Service";
import { toast } from 'react-toastify';
import { appConstants } from "shared/constants/AppConst";


export const watchGetAllPreInvoiceDetails = function* () {
  yield takeEvery(PreInvoiceTypes.GET_ALL_PREINVOICE_DETAILS, workerGetAllPreInvoiceDetails)
}

export const watchGetPreInvoiceDetail = function* () {
  yield takeEvery(PreInvoiceTypes.GET_PREINVOICE_DETAIL_REQUEST, workerGetPreInvoiceDetail)
}


function* workerGetPreInvoiceDetail(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.slapreinvoice;
    const { data } = yield call(baseAPI.get, `${uri}${request.preInvoiceId}`);
    if (data.status) {
      yield put(getPreInvoiceDetailSuccess({
        payload: data,
        responseData: data.data
      }))
    }  else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warn(data.message, { position: 'bottom-right' });
      yield put(getPreInvoiceDetailFailure(data))
    }
  } catch (error: any) {
    yield put(getPreInvoiceDetailFailure(error))
  }
}


function* workerGetAllPreInvoiceDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getAllPreInvoice;
    const { data } = yield call(baseAPI.get, `${uri}?size=${request.size}&page=${request.page}&sort=${request.sort}&Searchkeyword=${request.Searchkeyword}`);
    if (data.status) {
      yield put(getAllPreInvoiceDetailsSuccess({
        payload: data,
        responseData: data.data,
        tableData: data.data.content
      }))
    }  else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warn(data.message, { position: 'bottom-right' });
      yield put(getAllPreInvoiceDetailsFailure(data))
    }
  } catch (error: any) {
    yield put(getAllPreInvoiceDetailsFailure(error))
  }
}

export const watchGetAllInvoiceDetails = function* () {
  yield takeEvery(PreInvoiceTypes.GET_ALL_INVOICE_DETAILS, workerGetAllInvoiceDetails)
}


function* workerGetAllInvoiceDetails(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getAllInvoice;
    const { data } = yield call(baseAPI.get, `${uri}?size=${request.size}&page=${request.page}&sort=${request.sort}&Searchkeyword=${request.Searchkeyword}`);
    if (data.status) {
      yield put(getAllInvoiceDetailsSuccess({
        payload: data,
        responseData: data.data,
        tableData: data.data.content
      }))
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   }  else {
      toast.warn(data.message, { position: 'bottom-right' });
      yield put(getAllInvoiceDetailsFailure(data))
    }
  } catch (error: any) {
    yield put(getAllInvoiceDetailsFailure(error))
  }
}

export function* createPreInvoiceDetails(getPreInvoiceInfo?: any) {
  try {
    const uri = ConfigAPI.createPreInvoiceDetail;
    const { data } = yield call(baseAPI.post, `${uri}${getPreInvoiceInfo.payload.slaid}`, getPreInvoiceInfo.payload.slaFormData);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        createPreInvoiceSuccess({
          payload: data,
          getSLAData: data.data
        })
      );
    } else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   }  else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        createPreInvoiceFailure({
          errors: data.data,
        })
      );
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      createPreInvoiceFailure({
        errors: e.message,
      })
    );
  }
}
export function* getPreInvoiceDetails(getPreInvoiceInfo?: any) {
  try {
    const uri = ConfigAPI.getEditPreInvoice;
    const { data } = yield call(baseAPI.post, `${uri}/${getPreInvoiceInfo.payload}`);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        createPreInvoiceSuccess({
          payload: data,
          getSLAData: data.data
        })
      );
    }  else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        createPreInvoiceFailure({
          errors: data.data,
        })
      );
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      createPreInvoiceFailure({
        errors: e.message,
      })
    );
  }
}

export function* deleteProvisionsDetails(getPreInvoiceInfo?: any) {
  try {
    const uri = ConfigAPI.removeProvisionData;
    const { data } = yield call(baseAPI.delete, `${uri}${getPreInvoiceInfo.payload}`);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        reqDeleteProvisionsSuccess({
          payload: data
        })
      );
    }  else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        reqDeleteProvisionsFailure({
          errors: data.data,
        })
      );
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      reqDeleteProvisionsFailure({
        errors: e.message,
      })
    );
  }
}

export function* projectProvisionsDetails(getPreInvoiceInfo?: any) {
  try {
    const uri = ConfigAPI.getProjectsProvision;
    const { data } = yield call(baseAPI.get, `${uri}${getPreInvoiceInfo.payload}`);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        ProjectProvisionsSuccess({
          payload: data,
          provisionProjectList:data.data
        })
      );
    }  else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        ProjectProvisionsFailure({
          errors: data.data,
        })
      );
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      ProjectProvisionsFailure({
        errors: e.message,
      })
    );
  }
}


export function* slaProvisionsDetails(getPreInvoiceInfo?: any) {
  try {
    const uri = ConfigAPI.getSlabyproject;
    const { data } = yield call(baseAPI.get, `${uri}${getPreInvoiceInfo.payload}`);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        SLAProvisionsSuccess({
          payload: data,
          provisionSLAList:data.data
        })
      );
    }  else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   } else {
      toast.warning(data.message, { position: 'bottom-right' });
      yield put(
        SLAProvisionsFailure({
          errors: data.data,
        })
      );
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      SLAProvisionsFailure({
        errors: e.message,
      })
    );
  }
}