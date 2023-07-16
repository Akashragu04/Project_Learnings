import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { getErrorTokenResponseSuccess } from "saga/Actions/auth.actions";
import { appConstants } from "shared/constants/AppConst";
import { ConfigAPI } from "../../services/config";
import baseAPI from "../../services/Service";
import {
  aboutUscommonGetFailure,
  aboutUscommonGetSuccess,
  clearStateSuccess,
  commonDeleteFailure,
  commonDeleteSuccess,
  commonDownloadFailure,
  commonDownloadSuccess,
  commonPostFailure,
  commonPostSuccess,
  commonPutFailure,
  commonPutSuccess,
  commonSubContentDeleteFailure,
  commonSubContentDeleteSuccess,
  commonSubContentGetFailure,
  commonSubContentGetSuccess,
  commonSubContentPostFailure,
  commonSubContentPostSuccess,
  commonSubContentPutFailure,
  commonSubContentPutSuccess,
  commonUploadFailure,
  commonUploadLandingPageFailure,
  commonUploadLandingPageSuccess,
  commonUploadSuccess,
  getAboutUsDataFailure, getAboutUsDataSuccess, getMissionVisionFailure,
  getMissionVisionSuccess, getSendMailFailure, getSendMailSuccess, getServicesDataFailure, getServicesDataSubContentFailure, getServicesDataSubContentSuccess, getServicesDataSuccess, getTeamMembersDataFailure,
  getTeamMembersDataSuccess, getTestimonialDataFailure, getTestimonialDataSuccess, getVisionFailure, getVisionSuccess, postAboutUsDataFailure,
  postAboutUsDataSuccess, postMissionVisionFailure, postMissionVisionSuccess, postServicesDataFailure, postServicesDataSuccess, postTeamMembersDataFailure, postTeamMembersDataSuccess, postTestimonialDataFailure, postTestimonialDataSuccess, putAboutUsDataFailure, putAboutUsDataSuccess, putMissionVisionFailure, putMissionVisionSuccess, putServicesDataFailure, putServicesDataSuccess, putTeamMembersDataFailure, putTeamMembersDataSuccess, putTestimonialDataFailure, putTestimonialDataSuccess
} from "../Actions/aboutus.action";

export function* AboutUsDetails() {
  try {
    const uri = ConfigAPI.getAboutUsURL;
    const { data } = yield call(baseAPI.get, `${uri}?ModelName=About Us`);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getAboutUsDataSuccess({
          payload: data,
          resAboutViewData: data.data
        })
      );
    }else if(data?.status === false && data?.message === appConstants.invalidToken){
        yield put( getErrorTokenResponseSuccess({
         payload:data,
         resTokenError:true
       }));
     }else {
      // toast.error(data.message, {position: 'bottom-right'});
      getAboutUsDataFailure({
        errors: data,
        resAboutViewData: data
      })
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getAboutUsDataFailure({
        errors: e.message,
      })
    );
  }
}

export function* postAboutUsDetails(getAboutValues?: any) {
  try {
    const uri = ConfigAPI.getAboutUsURL;
    const { data } = yield call(baseAPI.post, uri, getAboutValues.payload);
    if (data.status === true) {
      toast.success(data.message, {position: 'bottom-right'});
      yield put(
        postAboutUsDataSuccess({
          payload: data,
          resPostAboutViewData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      postAboutUsDataFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      postAboutUsDataFailure({
        errors: e.message,
      })
    );
  }
}

export function* putAboutUsDetails(getAboutValues?: any) {
  try {
    const uri = ConfigAPI.getAboutUsURL;
    const { data } = yield call(baseAPI.put, `${uri}`, getAboutValues.payload);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        putAboutUsDataSuccess({
          payload: data,
          resPostAboutViewData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      putAboutUsDataFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      putAboutUsDataFailure({
        errors: e.message,
      })
    );
  }
}

//Services
export function* ServicesDetails() {
  try {
    const uri = ConfigAPI.getServicesURL;
    const { data } = yield call(baseAPI.get, `${uri}?ModelName=Services`);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getServicesDataSuccess({
          payload: data,
          resServicesData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      // toast.error(data.message, {position: 'bottom-right'});
      getServicesDataFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getServicesDataFailure({
        errors: e.message,
      })
    );
  }
}

export function* postServicesDetails(getAboutValues?: any) {
  try {
    const uri = ConfigAPI.getAboutUsURL;
    const { data } = yield call(baseAPI.post, uri, getAboutValues.payload);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        postServicesDataSuccess({
          payload: data,
          resPosttAboutViewData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      postServicesDataFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      postServicesDataFailure({
        errors: e.message,
      })
    );
  }
}

export function* putServicesDetails(getAboutValues?: any) {
  try {
    const uri = ConfigAPI.getAboutUsURL;
    const { data } = yield call(baseAPI.put, uri, getAboutValues.payload);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        putServicesDataSuccess({
          payload: data,
          resPutAboutViewData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      putServicesDataFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      putServicesDataFailure({
        errors: e.message,
      })
    );
  }
}

export function* TestimonialDetails() {
  try {
    const uri = ConfigAPI.getTestimonialsURL;
    const { data } = yield call(baseAPI.get, `${uri}?ModelName=`);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getTestimonialDataSuccess({
          payload: data,
          resTestimonialData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      // toast.error(data.message, {position: 'bottom-right'});
      getTestimonialDataFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getTestimonialDataFailure({
        errors: e.message,
      })
    );
  }
}

export function* postTestimonialDetails(getAboutValues?: any) {
  try {
    const uri = ConfigAPI.getAboutUsURL;
    const { data } = yield call(baseAPI.post, uri, getAboutValues.payload);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        postTestimonialDataSuccess({
          payload: data,
          resPostTestimonialData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      postTestimonialDataFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      postTestimonialDataFailure({
        errors: e.message,
      })
    );
  }
}

export function* putTestimonialDetails(getAboutValues?: any) {
  try {
    const uri = ConfigAPI.getAboutUsURL;
    const { data } = yield call(baseAPI.put, uri, getAboutValues.payload);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        putTestimonialDataSuccess({
          payload: data,
          resPutTestimonialData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      putTestimonialDataFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      putTestimonialDataFailure({
        errors: e.message,
      })
    );
  }
}

export function* teamMembersDetails() {
  try {
    const uri = ConfigAPI.getContactsURL;
    const { data } = yield call(baseAPI.get, `${uri}?ModelName=`);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getTeamMembersDataSuccess({
          payload: data,
          resTeamMembersData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      // toast.error(data.message, {position: 'bottom-right'});
      getTeamMembersDataFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getTeamMembersDataFailure({
        errors: e.message,
      })
    );
  }
}

export function* postTeamMembersDetails(getAboutValues?: any) {
  try {
    const uri = ConfigAPI.getAboutUsURL;
    const { data } = yield call(baseAPI.post, uri, getAboutValues.payload);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        postTeamMembersDataSuccess({
          payload: data,
          resPutTestimonialData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      postTeamMembersDataFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      postTeamMembersDataFailure({
        errors: e.message,
      })
    );
  }
}

export function* putTeamMembersDetails(getAboutValues?: any) {
  try {
    const uri = ConfigAPI.getAboutUsURL;
    const { data } = yield call(baseAPI.put, uri, getAboutValues.payload);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        putTeamMembersDataSuccess({
          payload: data,
          resPutTestimonialData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      putTeamMembersDataFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      putTeamMembersDataFailure({
        errors: e.message,
      })
    );
  }
}

export function* missionVisionDetails(getPayload:any) {
  try {
    const uri = ConfigAPI.getMissionVisionURL;
    const { data } = yield call(baseAPI.get, `${uri}?ModelName=${getPayload.payload}`);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        getMissionVisionSuccess({
          payload: data,
          resMissionVisionData:data.data
          // resTeamMembersData:data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      // toast.error(data.message, {position: 'bottom-right'});
      getMissionVisionFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      getMissionVisionFailure({
        errors: e.message,
      })
    );
  }
}

export function* postMissionVisionDetails(getAboutValues?: any) {
  try {
    const uri = ConfigAPI.getVisionMission;
    const { data } = yield call(baseAPI.post, uri, getAboutValues.payload);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        postMissionVisionSuccess({
          payload: data,
          resPostMissionVisionData: data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      postMissionVisionFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      postMissionVisionFailure({
        errors: e.message,
      })
    );
  }
}

export function* putMissionVisionDetails(getAboutValues?: any) {
  try {
    const uri = ConfigAPI.getAboutUsURL;
    const { data } = yield call(baseAPI.put, uri, getAboutValues.payload);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        putMissionVisionSuccess({
          payload: data,
          resPutTestimonialData: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      putMissionVisionFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      putMissionVisionFailure({
        errors: e.message,
      })
    );
  }
}

export function* commonUploadData(getAboutValues?: any) {
  try {
    const { data } = yield call(baseAPI.post, getAboutValues.payload.url, getAboutValues.payload.files);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        commonUploadSuccess({
          payload: data,
          resCommonUpload: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      commonUploadFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      commonUploadFailure({
        errors: e.message,
      })
    );
  }
}

export function* commonUploadLandingPageData(getAboutValues?: any) {
  try {
    const { data } = yield call(baseAPI.post, getAboutValues.payload.url, getAboutValues.payload.files);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        commonUploadLandingPageSuccess({
          payload: data,
          resCommonUploadLandingPage: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      commonUploadLandingPageFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      commonUploadLandingPageFailure({
        errors: e.message,
      })
    );
  }
}

export function* commonPostData(getCommonValues?: any) {
  try {
    const { data } = yield call(baseAPI.post, getCommonValues.payload.url, getCommonValues.payload.data);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        commonPostSuccess({
          payload: data,
          resCommonPost: data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      commonPostFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      commonPostFailure({
        errors: e.message,
      })
    );
  }
}

export function* commonPutData(getCommonValues?: any) {
  try {
    const { data } = yield call(baseAPI.put, getCommonValues.payload.url, getCommonValues.payload.data);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        commonPutSuccess({
          payload: data,
          resCommonPut: data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      commonPutFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      commonPutFailure({
        errors: e.message,
      })
    );
  }
}

export function* aboutUscommonGetData(getCommonValues?: any) {
  try {
    const { data } = yield call(baseAPI.get, getCommonValues.payload);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        aboutUscommonGetSuccess({
          payload: data,
          restCommonGet: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      aboutUscommonGetFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      aboutUscommonGetFailure({
        errors: e.message,
      })
    );
  }
}

export function* commonDeleteData(getCommonValues?: any) {
  try {
    const { data } = yield call(baseAPI.delete, getCommonValues.payload);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        commonDeleteSuccess({
          payload: data,
          resCommonDelete: data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      commonDeleteFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      commonDeleteFailure({
        errors: e.message,
      })
    );
  }
}

export function* commonSubContentPostData(getCommonValues?: any) {
  try {
    const { data } = yield call(baseAPI.post, getCommonValues.payload.url, getCommonValues.payload.files);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        commonSubContentPostSuccess({
          payload: data,
          resCommonSubContentPost: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      commonSubContentPostFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      commonSubContentPostFailure({
        errors: e.message,
      })
    );
  }
}

export function* commonSubContentPutData(getCommonValues?: any) {
  try {
    const { data } = yield call(baseAPI.put, getCommonValues.payload.url, getCommonValues.payload.files);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        commonSubContentPutSuccess({
          payload: data,
          resCommonSubContentPut: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      commonSubContentPutFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      commonSubContentPutFailure({
        errors: e.message,
      })
    );
  }
}

export function* commonSubContentGetData(getCommonValues?: any) {
  try {
    const { data } = yield call(baseAPI.get, getCommonValues.payload);
    if (data.status === true) {
      // toast(data.message, {position: 'bottom-right'});
      yield put(
        commonSubContentGetSuccess({
          payload: data,
          restCommonSubContentGet: data.data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      // toast.error(data.message, {position: 'bottom-right'});
      commonSubContentGetFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      commonSubContentGetFailure({
        errors: e.message,
      })
    );
  }
}

export function* commonSubContentDeleteData(getCommonValues?: any) {
  try {
    const { data } = yield call(baseAPI.delete, getCommonValues.payload.url);
    if (data.status === true) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        commonSubContentDeleteSuccess({
          payload: data,
          resCommonSubContentDelete: data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      toast.error(data.message, {position: 'bottom-right'});
      commonSubContentDeleteFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      commonSubContentDeleteFailure({
        errors: e.message,
      })
    );
  }
}

export function* commonDownloadData(getCommonValues?: any) {
  try {
    const { data } = yield call(baseAPI.get, getCommonValues.payload);
    if (data) {
      toast(data.message, {position: 'bottom-right'});
      yield put(
        commonDownloadSuccess({
          payload: data,
          resCommonDownload: data
        })
      );
    }else if(data.status === false && data?.message === appConstants.invalidToken){
       yield put( getErrorTokenResponseSuccess({
        payload:data,
        resTokenError:true
      }));
    } else {
      // toast.error(data.message, {position: 'bottom-right'});
      commonDownloadFailure({
        errors: data,
      })
    }

  } catch (e: any) {
    // toast.warning(e.message, {position: 'bottom-right'});
    yield put(
      commonDownloadFailure({
        errors: e.message,
      })
    );
  }
}

  // This is a function used to clear business Data list
  export function* clearStateData() {
    try {
      yield put(
        clearStateSuccess({})
            );
     }
    catch (e:any) {
      yield put(
        clearStateSuccess({})
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
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        getErrorTokenResponseSuccess({
          payload:data,
          resTokenError:true
        })
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
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        getErrorTokenResponseSuccess({
          payload:data,
          resTokenError:true
        })
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

    
  
  export function* SendMailDetails() {
    try { 
      const uri = ConfigAPI.sendMailToled;
      const {data} = yield call(baseAPI.get, uri);
      if (data.status === true ) {
        toast(data.message, {position: 'bottom-right'});
        yield put(
          getSendMailSuccess({
            payload: data,
          })
        );
      }else if(data.status === false && data?.message === appConstants.invalidToken){
        getErrorTokenResponseSuccess({
          payload:data,
          resTokenError:true
        })
      }else {
        toast.error(data.message, {position: 'bottom-right'});
        getSendMailFailure({
          errors: data,
        })
      }
      
    } catch (e:any) {
      toast.warning(e.message, {position: 'bottom-right'});
      yield put(
        getSendMailFailure({
          errors: e.message,
        })
      );
    }
  }