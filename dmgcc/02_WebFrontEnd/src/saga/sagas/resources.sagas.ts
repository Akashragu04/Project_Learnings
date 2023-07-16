import { call, put } from "redux-saga/effects";
import { toast } from 'react-toastify';
import {baseAPI} from '../../services/Service';
import {ConfigAPI} from '../../services/config';
import {getCostCentreSuccess, getCostCentreFailure, getCostCentreResourceSuccess, getCostCentreResourceFailure, 
  getResourceRecordFailure, getResourceRecordSuccess, putResourceRecordSuccess, 
  putResourceRecordFailure, getUtilizationSuccess, getUtilizationFailure, getEmployeeSuccess, 
  getEmployeeFailure, addThirdpartyResourceFailure, addThirdpartyResourceSuccess, 
  updateThirdpartyResourceSuccess, updateThirdpartyResourceFailure, 
  getThirdpartyResourceFailure, getThirdpartyResourceSuccess, deleteThirdpartyResourceFailure, deleteThirdpartyResourceSuccess, getResourceDetailsSuccess, getResourceDetailsFailure, getJDMappingDetailsSuccess, getJDMappingDetailsFailure, postJDMappingDetailsSuccess, postJDMappingDetailsFailure, putJDMappingDetailsFailure, putJDMappingDetailsSuccess } from '../Actions/resources.actions';
import { getErrorTokenResponseSuccess } from "saga/Actions/auth.actions";
import { appConstants } from "shared/constants/AppConst";
    
export function* getCostCentreData() {
    try { 
      const uri = ConfigAPI.getCostCenter;
      const {data} = yield call(baseAPI.get, `${uri}`);
      if (data.status === true ) {
        // toast(data.message, {position: 'bottom-right'});
        yield put(
            getCostCentreSuccess({
            payload: data,
            getCostCentreList:data.data
          })
        );
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }  else {
        toast.warning(data.message, {position: 'bottom-right'});
        yield put(
            getCostCentreFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getCostCentreFailure({
          errors: e.message,
        })
      );
    }
  }

      
export function* getCostCentreResourceData(getCostCenteId?:any) {
    try { 
      const uri = ConfigAPI.getResourceReport;
      const {data} = yield call(baseAPI.get, `${uri}?size=${getCostCenteId.payload.size}&page=${getCostCenteId.payload.page}&costcenter=${getCostCenteId.payload.costcenter}`);
      if (data.status === true ) {
        // toast(data.message, {position: 'bottom-right'});
        yield put(
          getCostCentreResourceSuccess({
            payload: data,
            getCostCentreResourceData:data.data
          })
        );
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else {
        toast.warning(data.message, {position: 'bottom-right'});
        yield put(
            getCostCentreResourceFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getCostCentreResourceFailure({
          errors: e.message,
        })
      );
    }
  }
  
      
export function* getResourceRecordData(getCostCenteId?:any) {
  try { 
    const uri = ConfigAPI.getResourceProjectReport;
    const {data} = yield call(baseAPI.get, `${uri}?costcenter=${getCostCenteId.payload.CostCenterId}&size=${getCostCenteId.payload.size}&page=${getCostCenteId.payload.page}&sort=${getCostCenteId.payload.sort}&size=${getCostCenteId.payload.size}&page=${getCostCenteId.payload.page}&sort=${getCostCenteId.payload.sort}&Searchkeyword=${getCostCenteId.payload.SearchKeyword}`);
    if (data.status === true ) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getResourceRecordSuccess({
          payload: data,
          getResourceRecordList: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   }else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        getResourceRecordFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getResourceRecordFailure({
        errors: e.message,
      })
    );
  }
}


      
export function* putResourceRecordData(getCostCenteId?:any) {
  try { 
    const uri = ConfigAPI.ResoureceSkillUpdate;
    const {data} = yield call(baseAPI.put, `${uri}${getCostCenteId.payload.emp_id}`,getCostCenteId.payload.update_skill);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        putResourceRecordSuccess({
          payload: data,
          updateREsourceRecord:data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   }else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        putResourceRecordFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      putResourceRecordFailure({
        errors: e.message,
      })
    );
  }
}


      
export function* getUtilizationData(getCostCenteId?:any) {
  try { 
    const uri = ConfigAPI.getUtilizationData;
    const {data} = yield call(baseAPI.get, `${uri}?size=${getCostCenteId.payload.size}&page=${getCostCenteId.payload.page}&cost_center=${getCostCenteId.payload.cost_center}&userid=${getCostCenteId.payload.userid}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getUtilizationSuccess({
          payload: data,
          getUtilizationList:data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   }else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        getUtilizationFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getUtilizationFailure({
        errors: e.message,
      })
    );
  }
}


      
export function* getEmployeeData(getCostCenteId?:any) {
  try { 
    const uri = ConfigAPI.getEmployeeDetails;
    const {data} = yield call(baseAPI.get, `${uri}cost_center=${getCostCenteId.payload.cost_center}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getEmployeeSuccess({
          payload: data,
          getEmpList:data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   }else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        getEmployeeFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getEmployeeFailure({
        errors: e.message,
      })
    );
  }
}

      
export function* postThirdpartyResource(getCostCenteId?:any) {
  try { 
    const uri = ConfigAPI.addThirdPartResource;
    const {data} = yield call(baseAPI.post, `${uri}`, getCostCenteId.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        addThirdpartyResourceSuccess({
          payload: data,
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   }else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        addThirdpartyResourceFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      addThirdpartyResourceFailure({
        errors: e.message,
      })
    );
  }
}

      
export function* getThirdpartyResourceData(getRequestData?:any) {
  try { 
    const uri = ConfigAPI.getViewThirdoartyResource;
    const {data} = yield call(baseAPI.get, `${uri}?size=${getRequestData.payload.size}&page=${getRequestData.payload.page}&sort=${getRequestData.payload.sort}&Serachkeyword=${getRequestData.payload.Serachkeyword}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getThirdpartyResourceSuccess({
          payload: data,
          getThirdPartResource:data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   }else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        getThirdpartyResourceFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getThirdpartyResourceFailure({
        errors: e.message,
      })
    );
  }
}

      
export function* putThirdpartyResource(getCostCenteId?:any) {
  try { 
    const uri = ConfigAPI.upateThirdParty;
    const {data} = yield call(baseAPI.put, `${uri}${getCostCenteId.payload.id}`, getCostCenteId.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        updateThirdpartyResourceSuccess({
          payload: data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   }else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        updateThirdpartyResourceFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      updateThirdpartyResourceFailure({
        errors: e.message,
      })
    );
  }
}
      
export function* deleteThirdpartyResourceData(getResourceId?:any) {
  try { 
    const uri = ConfigAPI.deletethirdpartyemployee;
    const {data} = yield call(baseAPI.put, `${uri}`, getResourceId.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        deleteThirdpartyResourceSuccess({
          payload: data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   }else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        deleteThirdpartyResourceFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      deleteThirdpartyResourceFailure({
        errors: e.message,
      })
    );
  }
}
      
export function* reqResourceDetailData(getResourceId?:any) {
  try { 
    const uri = ConfigAPI.getResourceDetail;
    const {data} = yield call(baseAPI.get, `${uri}/${getResourceId.payload}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getResourceDetailsSuccess({
          payload: data,
          getResourceDetails:data.data,
          getResourceSkill:data.data.user.skills
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   }else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        getResourceDetailsFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getResourceDetailsFailure({
        errors: e.message,
      })
    );
  }
}
      
export function* reqJDMappingInfo(getJDInfoId?:any) {
  try { 
    const uri = ConfigAPI.jdDetails;
    const {data} = yield call(baseAPI.get, `${uri}${getJDInfoId.payload}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        getJDMappingDetailsSuccess({
          payload: data,
          getJDDetails:data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   }else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        getJDMappingDetailsFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getJDMappingDetailsFailure({
        errors: e.message,
      })
    );
  }
}
      
export function* reqJDMappingData(getJDInfoId?:any) {
  try { 
    const uri = ConfigAPI.postHRsetupDetails;
    const {data} = yield call(baseAPI.get, `${uri}${getJDInfoId.payload.biz_id}/${getJDInfoId.payload.level}`);
    if (data.status === true ) {
      // toast.success(data.message, {position: 'bottom-right'});
      yield put(
        postJDMappingDetailsSuccess({
          payload: data,
          getJDMappingInternal:data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   }else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        postJDMappingDetailsFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      postJDMappingDetailsFailure({
        errors: e.message,
      })
    );
  }
}

export function* putJDMappingData(getJDInfoId?:any) {
  try { 
    const uri = ConfigAPI.putJDMappingInternalhire;
    const {data} = yield call(baseAPI.put, `${uri}`, getJDInfoId.payload);
    if (data.status === true ) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        putJDMappingDetailsSuccess({
          payload: data,
          postResJDMapping:data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:data,
       resTokenError:true
     }));
   }else {
      toast.warning(data.message, {position: 'bottom-right'});
      yield put(
        putJDMappingDetailsFailure({
            errors: data.data,
          })
        );
    }
    
  } catch (e:any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      putJDMappingDetailsFailure({
        errors: e.message,
      })
    );
  }
}


export function* restInitialDetails() {

}