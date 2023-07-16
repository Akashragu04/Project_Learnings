import { call, put } from "redux-saga/effects";
import { toast } from 'react-toastify';
import {baseAPI} from '../../services/Service';
import {ConfigAPI} from '../../services/config';
import {getBusinessSetupSuccess, getBusinessSetupFailure, postBusinessSetupSuccess, 
    postBusinessSetupFailure, putBusinessSetupSuccess, putBusinessSetupFailure} from '../Actions/BusinessSetup.actions';
import { getErrorTokenResponseSuccess } from "saga/Actions";
import { appConstants } from "shared/constants/AppConst";

export function* getBusinessSetupData(getBizId?:any) {
    try { 
      const uri = ConfigAPI.getBizCaseSetup;
      const {data} = yield call(baseAPI.get, `${uri}${getBizId.payload}`);
      if (data.status === true ) {
        // toast(data.message, {position: 'bottom-right'});
        yield put(
            getBusinessSetupSuccess({
            payload: data,
            getBizData:data.data
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
            getBusinessSetupFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getBusinessSetupFailure({
          errors: e.message,
        })
      );
    }
  }
  
  
export function* postBusinessSetupData(getBizData?:any) {
    try { 
      const uri = ConfigAPI.getBizCaseSetupData;
      const {data} = yield call(baseAPI.post, `${uri}${getBizData.payload.bizId.id}`, getBizData.payload.bizSetupDetails);
      if (data.status === true ) {
        toast.success(data.message, {position: 'bottom-right'});
        yield put(
            postBusinessSetupSuccess({
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
            postBusinessSetupFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        postBusinessSetupFailure({
          errors: e.message,
        })
      );
    }
  }

  
  
export function* putBusinessSetupData(getBizData?:any) {
    try { 
      const uri = ConfigAPI.getBizCaseSetupData;
      const {data} = yield call(baseAPI.put, `${uri}${getBizData.payload.bizId.id}`, getBizData.payload.bizSetupDetails);
      if (data.status === true ) {
        toast.success(data.message, {position: 'bottom-right'});
        yield put(
            putBusinessSetupSuccess({
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
            putBusinessSetupFailure({
              errors: data.data,
            })
          );
      }
      
    } catch (e:any) {
      toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        putBusinessSetupFailure({
          errors: e.message,
        })
      );
    }
  }