import { call, put } from "redux-saga/effects";
import { baseAPI } from '../../services/Service';
import { ConfigAPI } from '../../services/config';
// import { toast } from 'react-toastify';
import { clearStatusDashboardSuccess, getBusinessDashboardFailure, getBusinessDashboardSuccess, getDashboardDetailsFailure, getDashboardDetailsSuccess } from "saga/Actions/dashboard.action";
import { getErrorTokenResponseSuccess } from "saga/Actions/auth.actions";
import { appConstants } from "shared/constants/AppConst";


export function* reqDashboardData(getCostCenterId?:any) {
    try { 
      const uri = ConfigAPI.dashboardDetails;
      const {data} = yield call(baseAPI.get, `${uri}?costcenter=${getCostCenterId.payload}`);
      if (data.status === true && data.statuscode === 200) {
        yield put(
          getDashboardDetailsSuccess({
            payload: data,
            getResponseDashboard:data.data
          })
        );
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     } else {
        // toast.warning(data.message, {position: 'bottom-right'});
        yield put(
          getDashboardDetailsFailure({
              errors: data,
            })
          );
      }
      
    } catch (e:any) {
      yield put(
        getDashboardDetailsFailure({
          errors: e.message,
        })
      );
    }
  }

  export function* reqBusinessDashboard(getCostCenterId?:any) {
      try { 
        const uri = ConfigAPI.getBusinessCaseReport;
        const {data} = yield call(baseAPI.get, `${uri}${getCostCenterId.payload.projectId}?reportType=${getCostCenterId.payload.reportType}`);
        if (data.status === true && data.statuscode === 200) {
          yield put(
            getBusinessDashboardSuccess({
              payload: data,
              getResponseBusinessCaseDashboard:data.data
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
            getBusinessDashboardFailure({
                errors: data.data,
              })
            );
        }
        
      } catch (e:any) {
        yield put(
          getBusinessDashboardFailure({
            errors: e.message,
          })
        );
      }
    }

    export function* clearStatusDashboardDetail() {
      try {
        yield put(
          clearStatusDashboardSuccess({            
          })
        );
       }catch(e:any){

      }
    }