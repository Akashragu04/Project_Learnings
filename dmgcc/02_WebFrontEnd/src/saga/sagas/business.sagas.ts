import { call, put } from "redux-saga/effects";
import { toast } from 'react-toastify';
import {baseAPI} from '../../services/Service';
import {ConfigAPI} from '../../services/config';
import {getLeadsSuccess, getLeadsFailure, addLeadsSuccess, addLeadsFailure, getUserDetailSuccess, getUserDetailFailure, pullAssignUserSuccess, pullAssignUserFailure, getLeadsEditSuccess, getLeadsEditFailure, putLeadsDetailsFailure, putLeadsDetailsSuccess, clearBusinessSuccess, getBusinessCaseReqSuccess, getBusinessCaseReqFailure, getBusinessCaseApprovelSuccess, getBusinessCaseApprovelFailure, businessCaseApprovelFailure, businessCaseApprovelSuccess, removeImageSuccess, removeImageFailure, leadsConversionSuccess, leadsConversionFailure, getDepartmentListsFailure, getDepartmentListsSuccess, getStepperListsSuccess, getStepperListsFailure, getBizCaseSetupChartFailure, getBizCaseSetupChartSuccess, getCustomerAndBusinessFailure, getCustomerAndBusinessSuccess} from '../Actions/business.actions';
import { getErrorTokenResponseSuccess } from "saga/Actions";
import { appConstants } from "shared/constants/AppConst";

//This is a function used to get lead details
export function* getLeadsDetails(action?:any) {
    try {
      const uri = ConfigAPI.getLeadsDetailList;
      const {data} = yield call(baseAPI.get, `${uri}?size=${action.value.size}&page=${action.value.page}&sort=${action.value.sort}&Serachkeyword=${action.value.Serachkeyword}`);    
  
      if (data.statuscode === 200 && data.statuscode !== undefined ) {
        yield put(
            getLeadsSuccess({
            payload: data,
            responseData:data.data,
            tableData:data.data.content
          })
        );
      }else if(data?.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else{
        // toast.error(data.message, {position: 'bottom-right'});
        getLeadsFailure({
          errors: data,
        })
      }
    } catch (e:any) {
      yield put(
        getLeadsFailure({
          errors: e.message,
        })
      );
    }
  }

//This is a function used to get lead details
export function* getBusinessCase(action?:any) {
  try {
    const uri = ConfigAPI.businesscaserequest;
    const {data} = yield call(baseAPI.get, `${uri}?size=${action.value.size}&page=${action.value.page}&sort=${action.value.sort}&Serachkeyword=${action.value.Serachkeyword}`);    
    if (data.statuscode === 200 && data.statuscode !== undefined ) {
      yield put(
        getBusinessCaseReqSuccess({
          payload: data,
          responseData:data.data,
          tableData:data.data.content
        })
      );
    }else if(data?.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else{
      // toast.error(data.message, {position: 'bottom-right'});
      getBusinessCaseReqFailure({
        errors: data,
      })
    }
  } catch (e:any) {
    yield put(
      getBusinessCaseReqFailure({
        errors: e.message,
      })
    );
  }
}

//This is a function used to get lead details
export function* removeImageFile(action?:any) {
  try {
    const uri = ConfigAPI.removeDocs;
    const {data} = yield call(baseAPI.put, `${uri}${action.deleteImage.lead_id}/${action.deleteImage.file_image}`);    
    if (data.statuscode === 200 && data.statuscode !== undefined ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        removeImageSuccess({
          payload: data
        })
      );
    }else if(data?.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else{
      toast.error(data.message, {position: 'bottom-right'});
      removeImageFailure({
        errors: data,
      })
    }
  } catch (e:any) {
    yield put(
      removeImageFailure({
        errors: e.message,
      })
    );
  }
}

  export function* addLeadsDetails(getPostData?:any) {
    try {
      const uri = ConfigAPI.getLeadsDetailList;
      const {data} = yield call(baseAPI.post, uri, getPostData.getValues);
      if (data.status === true ) {
        toast.success(data.message, {position: 'bottom-right'});
        yield put(
            addLeadsSuccess({
            data: data,
          })
        );
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else {
        toast.warning(data.message, {position: 'bottom-right'});
        
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        addLeadsFailure({
          errors: e.message,
        })
      );
    }
  }
  
  export function* getUserDetailList() {
    try { 
      const uri = ConfigAPI.getUserDetails;
      const {data} = yield call(baseAPI.get, uri);
      if (data.status === true ) {
        // toast(data.message, {position: 'bottom-right'});
        yield put(
          getUserDetailSuccess({
            payload: data,
            getUserData:data.data
          })
        );
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else {
        yield put(
          getUserDetailFailure({
            errors: data,
          })
        );
        // toast.warning(data.message, {position: 'bottom-right'});
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getUserDetailFailure({
          errors: e.message,
        })
      );
    }
  }

    
  export function* pullAssignUserProcess(getValues?:any) {
    try { 
      const uri = ConfigAPI.leadsAssignuer;
      const {data} = yield call(baseAPI.put, `${uri}${getValues.value.assignId}`, getValues.value.postData);
      if (data.status === true ) {
        toast.success(data.message, {position: 'bottom-right'});
        yield put(
          pullAssignUserSuccess({
            payload: data,
            assignSuccess:data.data
          })
        );
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else {
        toast.warning(data.message, {position: 'bottom-right'});
      }
      
    } catch (e:any) {
      yield put(
        pullAssignUserFailure({
          errors: e.message,
        })
      );
    }
  }

      
  export function* putLeadsData(getValues?:any) {
    try { 
      const uri = ConfigAPI.getLeadsDetailList;
      const {data} = yield call(baseAPI.put, `${uri}/${getValues.postValue.leadId}`, getValues.postValue.postValue);
      if (data.status === true ) {
        toast.success(data.message, {position: 'bottom-right'});
        yield put(
          putLeadsDetailsSuccess({
            payload: data,
            assignSuccess:data.data
          })
        );
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else {
        yield put(
          putLeadsDetailsFailure({
            errors: data,
          })
        );
        toast.warning(data.message, {position: 'bottom-right'});
      }
      
    } catch (e:any) {
      toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        putLeadsDetailsFailure({
          errors: e.message,
        })
      );
    }
  }

  // This is a function used to clear business Data list
  export function* clearBusinessData() {
    try {
      yield put(
        clearBusinessSuccess({})
            );
     }
    catch (e:any) {
      yield put(
        clearBusinessSuccess({})
            );
    }
  }

  export function* getLeadsEditData(getValues?:any) {
    try { 
      const uri = ConfigAPI.getLeadsDetailList;
      const {data} = yield call(baseAPI.get, `${uri}/${getValues.getValues}`);
      if (data.status === true ) {
        // toast.dark(data.message, {position: 'bottom-right'});
        yield put(
          getLeadsEditSuccess({
            payload: data,
            assignSuccess:data.data
          })
        );
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else {
        yield put(
          getLeadsEditFailure({
            errors: data,
          })
        );
        // toast.warning(data.message, {position: 'bottom-right'});
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getLeadsEditFailure({
          errors: e.message,
        })
      );
    }
  }

  export function* postBusinessCaseApprovel(postValues?:any) {
    try { 
      if(postValues.getValues.assign_sla === 'MOMUpload'){
        const {data} = yield call(baseAPI.post, postValues.getValues.url, postValues.getValues.formData);
        if (data.status === true ) {
          toast.success(data.message, {position: 'bottom-right'});
          yield put(
            getBusinessCaseApprovelSuccess({
              payload: data,
              assignSuccess:data.data
            })
          );
        }else if(data.status === false && data?.message === appConstants.invalidToken){
          yield put( getErrorTokenResponseSuccess({
           payload:data,
           resTokenError:true
         }));
       }else {
          toast.warning(data.message, {position: 'bottom-right'});
        }
      }else {
        const {data} = yield call(baseAPI.post, `${postValues.getValues.url}/${postValues.getValues.biz_case_id}`, postValues.getValues.formData);
        if (data.status === true ) {
          toast.success(data.message, {position: 'bottom-right'});
          yield put(
            getBusinessCaseApprovelSuccess({
              payload: data,
              assignSuccess:data.data
            })
          );
        }else if(data.status === false && data?.message === appConstants.invalidToken){
          yield put( getErrorTokenResponseSuccess({
           payload:data,
           resTokenError:true
         }));
       }else {
          yield put(
            getBusinessCaseApprovelFailure({
              errors:data,
            })
          );
          toast.warning(data.message, {position: 'bottom-right'});
        }
      }
     
      // const uri = ConfigAPI.getLeadsDetailList;
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getBusinessCaseApprovelFailure({
          errors: e.message,
        })
      );
    }
  }

  export function* putBusinessCaseApprovel(putValues?:any) {
    try { 
      const uri = ConfigAPI.bizApprovalPut;
      const {data} = yield call(baseAPI.put, `${uri}${putValues.value.Biz_Case_ID}/${putValues.value.Approval_ID}/${putValues.value.receiver}/${putValues.value.token}`);
      if (data.status === true ) {
        toast.success(data.message, {position: 'bottom-right'});
        yield put(
          businessCaseApprovelSuccess({
            payload: data,
            assignSuccess:data.data
          })
        );
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else {
        yield put(
          businessCaseApprovelFailure({
            errors: data,
          })
        );
        toast.warning(data.message, {position: 'bottom-right'});
      }
      
    } catch (e:any) {
      toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        businessCaseApprovelFailure({
          errors: e.message,
        })
      );
    }
  }

  
  export function* resendMailUser(getApprovalId?:any) {
    try { 
      const uri = ConfigAPI.resendEmail;
      const {data} = yield call(baseAPI.get, `${uri}${getApprovalId.value.id}`);
      if (data.status === true ) {
        toast.success(data.message, {position: 'bottom-right'});
        yield put(
          businessCaseApprovelSuccess({
            payload: data
          })
        );
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else {
        yield put(
          businessCaseApprovelFailure({
            errors: data,
          })
        );
        // toast.warning(data.message, {position: 'bottom-right'});
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        businessCaseApprovelFailure({
          errors: e.message,
        })
      );
    }
  }

    
  export function* getLeadsConversion(LeadsConv?:any) {
    try { 
      const uri = ConfigAPI.leadConversionAverage;
      const {data} = yield call(baseAPI.post, `${uri}`, LeadsConv.value);
      if (data.status === true ) {
        toast.success(data.message, {position: 'bottom-right'});
        yield put(
          leadsConversionSuccess({
            payload: data
          })
        );
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else {
        // toast.warning(data.message, {position: 'bottom-right'});
        yield put(
          leadsConversionFailure({
            errors: data,
          })
        );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        leadsConversionFailure({
          errors: e.message,
        })
      );
    }
  }
    
  export function* getDepartment() {
    try { 
      const uri = ConfigAPI.getDepartment;
      const {data} = yield call(baseAPI.get, `${uri}`);
      if (data.status === true ) {
        yield put(
          getDepartmentListsSuccess({
            payload: data
          })
        );
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else {
        // toast.warning(data.message, {position: 'bottom-right'});
        yield put(
          getDepartmentListsFailure({
            errors: data,
          })
        );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getDepartmentListsFailure({
          errors: e.message,
        })
      );
    }
  }
      
  export function* getStepper(getLeadId?:any) {
    try { 
      const uri = ConfigAPI.getStepperAPI;
      const {data} = yield call(baseAPI.get, `${uri}${getLeadId.value}`);
      if (data.status === true ) {
        yield put(
          getStepperListsSuccess({
            payload: data
          })
        );
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else {
        // toast.warning(data.message, {position: 'bottom-right'});
        yield put(
          getStepperListsFailure({
            errors: data,
          })
        );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getStepperListsFailure({
          errors: e.message,
        })
      );
    }
  }
      
  export function* getBizCaseSetupChartData(getBizId?:any) {
    try { 
      const uri = ConfigAPI.bizCaseInfoByProjectId;
      const {data} = yield call(baseAPI.get, `${uri}/${getBizId.payload}`);
      if (data.status === true ) {
        yield put(
          getBizCaseSetupChartSuccess({
            payload: data,
            getBizCaseSetupChart:data.data
          })
        );
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else {
        // toast.warning(data.message, {position: 'bottom-right'});
        yield put(
          getBizCaseSetupChartFailure({
            errors: data,
          })
        );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getBizCaseSetupChartFailure({
          errors: e.message,
        })
      );
    }
  }
      
  export function* getCustomerAndBusinessData() {
    try { 
      const uri = ConfigAPI.getcustomerandbusiness;
      const {data} = yield call(baseAPI.get, `${uri}`);
      if (data.status === true ) {
        yield put(
          getCustomerAndBusinessSuccess({
            payload: data,
            getCustomerandBusiness:data.data
          })
        );
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else {
        // toast.warning(data.message, {position: 'bottom-right'});
        yield put(
          getCustomerAndBusinessFailure({
            errors: data,
          })
        );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getCustomerAndBusinessFailure({
          errors: e.message,
        })
      );
    }
  }
