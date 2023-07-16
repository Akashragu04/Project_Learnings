import { call, put } from "redux-saga/effects";
import { ConfigAPI } from "../../services/config";
import baseAPI from "../../services/Service";
import { getAboutUsDataFailure, getAboutUsDataSuccess, getMissionVisionFailure, getMissionVisionSuccess, getServicesDataFailure, getServicesDataSubContentFailure, getServicesDataSubContentSuccess, getServicesDataSuccess, getTeamMembersDataFailure, getTeamMembersDataSuccess, getTestimonialDataFailure, getTestimonialDataSuccess, getVisionFailure, getVisionSuccess } from "../actions";

  export function* AboutUsDetails() {
    try { 
      const uri = ConfigAPI.getAboutUsURL;
      const {data} = yield call(baseAPI.get, `${uri}?ModelName=About Us`);
      if (data.status === true ) {
        // toast(data.message, {position: 'bottom-right'});
        yield put(
            getAboutUsDataSuccess({
            payload: data,
            resAboutViewData:data.data
          })
        );
      }else {
        // toast.error(data.message, {position: 'bottom-right'});
        getAboutUsDataFailure({
          errors: data,
        })
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getAboutUsDataFailure({
          errors: e.message,
        })
      );
    }
  }

  
  export function* ServicesDetails() {
    try { 
      const uri = ConfigAPI.getServicesURL;
      const {data} = yield call(baseAPI.get, `${uri}?ModelName=Services`);
      if (data.status === true ) {
        // toast(data.message, {position: 'bottom-right'});
        yield put(
          getServicesDataSuccess({
            payload: data,
            resServicesData:data.data
          })
        );
      }else {
        // toast.error(data.message, {position: 'bottom-right'});
        getServicesDataFailure({
          errors: data,
        })
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getServicesDataFailure({
          errors: e.message,
        })
      );
    }
  }
  
  
  export function* ServicesSubContentDetails() {
    try { 
      const uri = ConfigAPI.getServicesSubContentURL;
      const {data} = yield call(baseAPI.get, `${uri}?ModelName=Services`);
      if (data.status === true ) {
        // toast(data.message, {position: 'bottom-right'});
        yield put(
          getServicesDataSubContentSuccess({
            payload: data,
            resServicesSubContentData:data.data
          })
        );
      }else {
        // toast.error(data.message, {position: 'bottom-right'});
        getServicesDataSubContentFailure({
          errors: data,
        })
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getServicesDataSubContentFailure({
          errors: e.message,
        })
      );
    }
  }

  export function* TestimonialDetails() {
    try { 
      const uri = ConfigAPI.getTestimonialsURL;
      const {data} = yield call(baseAPI.get, `${uri}?ModelName=`);
      if (data.status === true ) {
        // toast(data.message, {position: 'bottom-right'});
        yield put(
          getTestimonialDataSuccess({
            payload: data,
            resTestimonialData:data.data
          })
        );
      }else {
        // toast.error(data.message, {position: 'bottom-right'});
        getTestimonialDataFailure({
          errors: data,
        })
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getTestimonialDataFailure({
          errors: e.message,
        })
      );
    }
  }
  
  export function* teamMembersDetails() {
    try { 
      const uri = ConfigAPI.getContactsURL;
      const {data} = yield call(baseAPI.get, `${uri}?ModelName=`);
      if (data.status === true ) {
        // toast(data.message, {position: 'bottom-right'});
        yield put(
          getTeamMembersDataSuccess({
            payload: data,
            resTeamMembersData:data.data
          })
        );
      }else {
        // toast.error(data.message, {position: 'bottom-right'});
        getTeamMembersDataFailure({
          errors: data,
        })
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getTeamMembersDataFailure({
          errors: e.message,
        })
      );
    }
  }
  
  export function* missionVisionDetails() {
    try { 
      const uri = ConfigAPI.getMissionVisionURL;
      const {data} = yield call(baseAPI.get, `${uri}?ModelName=MISSION`);
      if (data.status === true ) {
        // toast(data.message, {position: 'bottom-right'});
        yield put(
          getMissionVisionSuccess({
            payload: data,
            resMissionVisionData:data.data
            // resTeamMembersData:data.data
          })
        );
      }else {
        // toast.error(data.message, {position: 'bottom-right'});
        getMissionVisionFailure({
          errors: data,
        })
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getMissionVisionFailure({
          errors: e.message,
        })
      );
    }
  }
  
  export function* getVisionDetails() {
    try { 
      const uri = ConfigAPI.getMissionVisionURL;
      const {data} = yield call(baseAPI.get, `${uri}?ModelName=VISION`);
      if (data.status === true ) {
        // toast(data.message, {position: 'bottom-right'});
        yield put(
          getVisionSuccess({
            payload: data,
            resVisionDetails:data.data
            // resTeamMembersData:data.data
          })
        );
      }else {
        // toast.error(data.message, {position: 'bottom-right'});
        getVisionFailure({
          errors: data,
        })
      }
      
    } catch (e:any) {
      // toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getVisionFailure({
          errors: e.message,
        })
      );
    }
  }
  