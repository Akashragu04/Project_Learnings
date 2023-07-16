import { call, put } from "redux-saga/effects";
import { baseAPI } from '../../services/Service';
import { ConfigAPI } from '../../services/config';
// import { history } from '../store';
import { toast } from 'react-toastify';
import { assignRoleFailure, assignRoleSuccess, getRoleFailure, getRoleSuccess, getUsersWithOutRoleFailure, getUsersWithOutRoleSuccess, getUsersWithRoleFailure, getUsersWithRoleSuccess } from "saga/Actions/admin.action";
import { getErrorTokenResponseSuccess } from "saga/Actions";
import { appConstants } from "shared/constants/AppConst";


export function* assignRoleDetail(getChartData?:any) {
    try { 
      const uri = ConfigAPI.getAssignRoleURL;
      const {data} = yield call(baseAPI.put, uri, getChartData.payload);
      if (data.status === true ) {
        toast.success(data.message, {position: 'bottom-right'});
        yield put(
            assignRoleSuccess({
            payload: data,
            resAssignroleData:data
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
            assignRoleFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        assignRoleFailure({
          errors: e.message,
        })
      );
    }
  }

  export function* getUsersWithOutRoleDetail(getChartData?:any) {
      try { 
        const uri = ConfigAPI.getUserswithoutroleURL;
        const {data} = yield call(baseAPI.get, uri);
        if (data.status === true ) {
        //   toast.success(data.message, {position: 'bottom-right'});
          yield put(
            getUsersWithOutRoleSuccess({
              payload: data,
              resGetUsersWithOutrole:data.data
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
            getUsersWithOutRoleFailure({
                errors: data.data,
              })
            );
        }
        
      } catch (e:any) {
        // toast.warning(e.message, {position: 'bottom-right'});
        yield put(
            getUsersWithOutRoleFailure({
            errors: e.message,
          })
        );
      }
    }
    
  export function* getUsersWithRoleDetail(getChartData?:any) {
      const getUserWithOutData:any = getChartData.payload
    try { 
      const uri = ConfigAPI.getuserswithroleURL;
      const {data} = yield call(baseAPI.get, `${uri}?size=${getUserWithOutData.size}&page=${getUserWithOutData.page}&sort=${getUserWithOutData.sort}&Searchkeyword=${getUserWithOutData.searchKeyword}`);
      if (data.status === true ) {
        // toast.success(data.message, {position: 'bottom-right'});
        yield put(
            getUsersWithRoleSuccess({
            payload: data,
            resGetUserWithRole:data.data
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
            getUsersWithRoleFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getUsersWithRoleFailure({
          errors: e.message,
        })
      );
    }
  }
     
  export function* getRoleDetail(getChartData?:any) {
    try { 
      const uri = ConfigAPI.getRolesURL;
      const {data} = yield call(baseAPI.get, uri);
      if (data.status === true ) {
        // toast.success(data.message, {position: 'bottom-right'});
        yield put(
            getRoleSuccess({
            payload: data,
            resGetRole:data.data
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
            getRoleFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getRoleFailure({
          errors: e.message,
        })
      );
    }
  }

  
// This is used to action get Completed mark Details
export function* clearStatusDetail(action?: any) {

} 