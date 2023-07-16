import { takeEvery } from "redux-saga/effects";
import { aboutUscommonGetData, AboutUsDetails, clearStateData, commonDeleteData, commonDownloadData, commonPostData, commonPutData, commonSubContentDeleteData, commonSubContentGetData, commonSubContentPostData, commonSubContentPutData, commonUploadData, commonUploadLandingPageData, getVisionDetails, missionVisionDetails, postAboutUsDetails, postMissionVisionDetails, postServicesDetails, postTeamMembersDetails, postTestimonialDetails, putAboutUsDetails, putMissionVisionDetails, putServicesDetails, putTeamMembersDetails, putTestimonialDetails, SendMailDetails, ServicesDetails, ServicesSubContentDetails, teamMembersDetails, TestimonialDetails } from "../sagas/aboutus.saga";
import { AboutUsActionTypes } from '../Types/aboutus.types';

/**
 * About Us Requirement Actions
 */

export const getAboutUsData = function* () {
    yield takeEvery(AboutUsActionTypes.GET_ABOUT_US_REQUEST, AboutUsDetails);
}
export const reqAboutUsData = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.GET_ABOUT_US_REQUEST,
        payload: postValue
    }
}

export const getAboutUsDataSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.GET_ABOUT_US_SUCCESS,
        payload: postValue
    }
}

export const getAboutUsDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.GET_ABOUT_US_ERROR,
        payload: errors
    }
}

/**
 * About Us Requirement Actions
 */

export const postAboutUsData = function* () {
    yield takeEvery(AboutUsActionTypes.POST_ABOUT_US_REQUEST, postAboutUsDetails);
}
export const reqPostAboutUsData = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.POST_ABOUT_US_REQUEST,
        payload: postValue
    }
}

export const postAboutUsDataSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.POST_ABOUT_US_SUCCESS,
        payload: postValue
    }
}

export const postAboutUsDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.POST_ABOUT_US_ERROR,
        payload: errors
    }
}

/**
 * About Us Requirement Actions
 */

export const putAboutUsData = function* () {
    yield takeEvery(AboutUsActionTypes.PUT_ABOUT_US_REQUEST, putAboutUsDetails);
}
export const reqPutAboutUsData = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.PUT_ABOUT_US_REQUEST,
        payload: postValue
    }
}

export const putAboutUsDataSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.PUT_ABOUT_US_SUCCESS,
        payload: postValue
    }
}

export const putAboutUsDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.PUT_ABOUT_US_ERROR,
        payload: errors
    }
}

/**
 * Services Requirement Actions
 */

export const getServicesData = function* () {
    yield takeEvery(AboutUsActionTypes.GET_SERVICES_REQUEST, ServicesDetails);
}
export const reqServicesData = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.GET_SERVICES_REQUEST,
        payload: postValue
    }
}

export const getServicesDataSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.GET_SERVICES_SUCCESS,
        payload: postValue
    }
}

export const getServicesDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.GET_SERVICES_ERROR,
        payload: errors
    }
}

export const postServicesData = function* () {
    yield takeEvery(AboutUsActionTypes.POST_SERVICES_REQUEST, postServicesDetails);
}
export const reqPostServicesData = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.POST_SERVICES_REQUEST,
        payload: postValue
    }
}

export const postServicesDataSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.POST_SERVICES_SUCCESS,
        payload: postValue
    }
}

export const postServicesDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.POST_SERVICES_ERROR,
        payload: errors
    }
}

export const putServicesData = function* () {
    yield takeEvery(AboutUsActionTypes.PUT_SERVICES_REQUEST, putServicesDetails);
}
export const reqPutServicesData = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.PUT_SERVICES_REQUEST,
        payload: postValue
    }
}

export const putServicesDataSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.PUT_SERVICES_SUCCESS,
        payload: postValue
    }
}

export const putServicesDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.PUT_SERVICES_ERROR,
        payload: errors
    }
}

/**
 * About Us Requirement Actions
 */

export const getTestimonialData = function* () {
    yield takeEvery(AboutUsActionTypes.GET_TESTIMONIAL_REQUEST, TestimonialDetails);
}
export const reqTestimonialData = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.GET_TESTIMONIAL_REQUEST,
        payload: postValue
    }
}

export const getTestimonialDataSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.GET_TESTIMONIAL_SUCCESS,
        payload: postValue
    }
}

export const getTestimonialDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.GET_TESTIMONIAL_ERROR,
        payload: errors
    }
}

export const postTestimonialData = function* () {
    yield takeEvery(AboutUsActionTypes.POST_TESTIMONIAL_REQUEST, postTestimonialDetails);
}
export const reqPostTestimonialData = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.POST_TESTIMONIAL_REQUEST,
        payload: postValue
    }
}

export const postTestimonialDataSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.POST_TEAM_MEMBERS_SUCCESS,
        payload: postValue
    }
}

export const postTestimonialDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.POST_TESTIMONIAL_ERROR,
        payload: errors
    }
}

export const putTestimonialData = function* () {
    yield takeEvery(AboutUsActionTypes.PUT_TESTIMONIAL_REQUEST, putTestimonialDetails);
}
export const reqPutTestimonialData = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.PUT_TESTIMONIAL_REQUEST,
        payload: postValue
    }
}

export const putTestimonialDataSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.PUT_TEAM_MEMBERS_SUCCESS,
        payload: postValue
    }
}

export const putTestimonialDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.PUT_TESTIMONIAL_ERROR,
        payload: errors
    }
}

/**
 * About Us Requirement Actions
 */

export const getTeamMembersData = function* () {
    yield takeEvery(AboutUsActionTypes.GET_TEAM_MEMBERS_REQUEST, teamMembersDetails);
}
export const reqTeamMembersData = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.GET_TEAM_MEMBERS_REQUEST,
        payload: postValue
    }
}

export const getTeamMembersDataSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.GET_TEAM_MEMBERS_SUCCESS,
        payload: postValue
    }
}

export const getTeamMembersDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.GET_TEAM_MEMBERS_ERROR,
        payload: errors
    }
}

export const postTeamMembersData = function* () {
    yield takeEvery(AboutUsActionTypes.POST_TEAM_MEMBERS_REQUEST, postTeamMembersDetails);
}
export const reqPostTeamMembersData = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.POST_TEAM_MEMBERS_REQUEST,
        payload: postValue
    }
}

export const postTeamMembersDataSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.POST_TEAM_MEMBERS_SUCCESS,
        payload: postValue
    }
}

export const postTeamMembersDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.POST_TEAM_MEMBERS_ERROR,
        payload: errors
    }
}

export const putTeamMembersData = function* () {
    yield takeEvery(AboutUsActionTypes.PUT_TEAM_MEMBERS_REQUEST, putTeamMembersDetails);
}
export const reqPutTeamMembersData = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.PUT_TEAM_MEMBERS_REQUEST,
        payload: postValue
    }
}

export const putTeamMembersDataSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.PUT_TEAM_MEMBERS_SUCCESS,
        payload: postValue
    }
}

export const putTeamMembersDataFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.PUT_TEAM_MEMBERS_ERROR,
        payload: errors
    }
}

/**
 * About Us Requirement Actions
 */

export const getMissionVisionData = function* () {
    yield takeEvery(AboutUsActionTypes.GET_MISSION_VISION_REQUEST, missionVisionDetails);
}
export const reqMissionVisionData = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.GET_MISSION_VISION_REQUEST,
        payload: postValue
    }
}

export const getMissionVisionSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.GET_MISSION_VISION_SUCCESS,
        payload: postValue
    }
}

export const getMissionVisionFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.GET_MISSION_VISION_ERROR,
        payload: errors
    }
}

export const postMissionVisionData = function* () {
    yield takeEvery(AboutUsActionTypes.POST_MISSION_VISION_REQUEST, postMissionVisionDetails);
}
export const reqPostMissionVisionData = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.POST_MISSION_VISION_REQUEST,
        payload: postValue
    }
}

export const postMissionVisionSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.POST_MISSION_VISION_SUCCESS,
        payload: postValue
    }
}

export const postMissionVisionFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.POST_MISSION_VISION_ERROR,
        payload: errors
    }
}


export const putMissionVisionData = function* () {
    yield takeEvery(AboutUsActionTypes.PUT_MISSION_VISION_REQUEST, putMissionVisionDetails);
}
export const reqPutMissionVisionData = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.PUT_MISSION_VISION_REQUEST,
        payload: postValue
    }
}

export const putMissionVisionSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.PUT_MISSION_VISION_SUCCESS,
        payload: postValue
    }
}

export const putMissionVisionFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.PUT_MISSION_VISION_ERROR,
        payload: errors
    }
}


// This is function is used to Operation
export const commonUpload = function* () {
    yield takeEvery(AboutUsActionTypes.POST_COMMON_UPLOAD_REQUEST, commonUploadData);
}
export const  reqCommonUpload = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.POST_COMMON_UPLOAD_REQUEST,
        payload: postValue
    }
}

export const  commonUploadSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.POST_COMMON_UPLOAD_SUCCESS,
        payload: postValue
    }
}

export const  commonUploadFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AboutUsActionTypes.POST_COMMON_UPLOAD_ERROR,
        payload: errors
    }
}


// This is function is used to Operation
export const commonUploadLandingPage = function* () {
    yield takeEvery(AboutUsActionTypes.COMMON_UPLOAD_LANDING_PAGE_REQUEST, commonUploadLandingPageData);
}
export const  reqCommonUploadLandingPage = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_UPLOAD_LANDING_PAGE_REQUEST,
        payload: postValue
    }
}

export const  commonUploadLandingPageSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_UPLOAD_LANDING_PAGE_SUCCESS,
        payload: postValue
    }
}

export const  commonUploadLandingPageFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AboutUsActionTypes.COMMON_UPLOAD_LANDING_PAGE_ERROR,
        payload: errors
    }
}


// This is function is used to Operation
export const clearState = function* () {
    yield takeEvery(AboutUsActionTypes.CLEAR_STATE_REQUEST, clearStateData);
}
export const  reqClearState = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.CLEAR_STATE_REQUEST,
        payload: postValue
    }
}

export const  clearStateSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.CLEAR_STATE_SUCCESS,
        payload: postValue
    }
}

export const  clearStateFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AboutUsActionTypes.CLEAR_STATE_ERROR,
        payload: errors
    }
}

// This is function is Common Functions
export const commonPost = function* () {
    yield takeEvery(AboutUsActionTypes.COMMON_POST_REQUEST, commonPostData);
}
export const  reqCommonPost = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_POST_REQUEST,
        payload: postValue
    }
}

export const  commonPostSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_POST_SUCCESS,
        payload: postValue
    }
}

export const  commonPostFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AboutUsActionTypes.COMMON_POST_ERROR,
        payload: errors
    }
}


export const commonPut = function* () {
    yield takeEvery(AboutUsActionTypes.COMMON_PUT_REQUEST, commonPutData);
}
export const  reqCommonPut = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_PUT_REQUEST,
        payload: postValue
    }
}

export const  commonPutSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_PUT_SUCCESS,
        payload: postValue
    }
}

export const  commonPutFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AboutUsActionTypes.COMMON_PUT_ERROR,
        payload: errors
    }
}


export const aboutUsCommonGet = function* () {
    yield takeEvery(AboutUsActionTypes.COMMON_ABOUT_US_GET_REQUEST, aboutUscommonGetData);
}
export const  reqAboutUsCommonGet = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_ABOUT_US_GET_REQUEST,
        payload: postValue
    }
}

export const  aboutUscommonGetSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_ABOUT_US_GET_SUCCESS,
        payload: postValue
    }
}

export const  aboutUscommonGetFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AboutUsActionTypes.COMMON_ABOUT_US_GET_ERROR,
        payload: errors
    }
}


export const commonDelete = function* () {
    yield takeEvery(AboutUsActionTypes.COMMON_DELETE_REQUEST, commonDeleteData);
}
export const  reqCommonDelete = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_DELETE_REQUEST,
        payload: postValue
    }
}

export const  commonDeleteSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_DELETE_SUCCESS,
        payload: postValue
    }
}

export const  commonDeleteFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AboutUsActionTypes.COMMON_DELETE_ERROR,
        payload: errors
    }
}

// This is function is Common Functions
export const commonSubContentPost = function* () {
    yield takeEvery(AboutUsActionTypes.COMMON_POST_SUB_CONTENT_REQUEST, commonSubContentPostData);
}
export const  reqCommonSubContentPost = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_POST_SUB_CONTENT_REQUEST,
        payload: postValue
    }
}

export const  commonSubContentPostSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_POST_SUB_CONTENT_SUCCESS,
        payload: postValue
    }
}

export const  commonSubContentPostFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AboutUsActionTypes.COMMON_POST_SUB_CONTENT_ERROR,
        payload: errors
    }
}


export const commonSubContentPut = function* () {
    yield takeEvery(AboutUsActionTypes.COMMON_PUT_SUB_CONTENT_REQUEST, commonSubContentPutData);
}
export const  reqCommonSubContentPut = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_PUT_SUB_CONTENT_REQUEST,
        payload: postValue
    }
}

export const  commonSubContentPutSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_PUT_SUB_CONTENT_SUCCESS,
        payload: postValue
    }
}

export const  commonSubContentPutFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AboutUsActionTypes.COMMON_PUT_SUB_CONTENT_ERROR,
        payload: errors
    }
}


export const commonSubContentGet = function* () {
    yield takeEvery(AboutUsActionTypes.COMMON_GET_SUB_CONTENT_REQUEST, commonSubContentGetData);
}
export const  reqCommonSubContentGet = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_GET_SUB_CONTENT_REQUEST,
        payload: postValue
    }
}

export const  commonSubContentGetSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_GET_SUB_CONTENT_SUCCESS,
        payload: postValue
    }
}

export const  commonSubContentGetFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AboutUsActionTypes.COMMON_GET_SUB_CONTENT_ERROR,
        payload: errors
    }
}


export const commonSubContentDelete = function* () {
    yield takeEvery(AboutUsActionTypes.COMMON_DELETE_SUB_CONTENT_REQUEST, commonSubContentDeleteData);
}
export const  reqCommonSubContentDelete = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_DELETE_SUB_CONTENT_REQUEST,
        payload: postValue
    }
}

export const  commonSubContentDeleteSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_DELETE_SUB_CONTENT_SUCCESS,
        payload: postValue
    }
}

export const  commonSubContentDeleteFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AboutUsActionTypes.COMMON_DELETE_SUB_CONTENT_ERROR,
        payload: errors
    }
}

export const commonDownload = function* () {
    yield takeEvery(AboutUsActionTypes.COMMON_DOWNLOAD_REQUEST, commonDownloadData);
}
export const  reqCommonDownload = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_DOWNLOAD_REQUEST,
        payload: postValue
    }
}

export const  commonDownloadSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.COMMON_DOWNLOAD_SUCCESS,
        payload: postValue
    }
}

export const  commonDownloadFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AboutUsActionTypes.COMMON_DOWNLOAD_ERROR,
        payload: errors
    }
}


/**
 * About Us Requirement Actions
 */

export const getVisionData = function* () {
    yield takeEvery(AboutUsActionTypes.GET_VISION_REQUEST, getVisionDetails);
}
export const reqVisionData = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.GET_VISION_REQUEST,
        payload: postValue
    }
}

export const getVisionSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.GET_VISION_SUCCESS,
        payload: postValue
    }
}

export const getVisionFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.GET_VISION_ERROR,
        payload: errors
    }
}

export const getServiceSubContentData = function* () {
   yield takeEvery(AboutUsActionTypes.GET_SERVICES_SUB_CONTENT_REQUEST, ServicesSubContentDetails);
}
export const reqServicesSubContentData = (postValue?: any) => {
   return {
       type: AboutUsActionTypes.GET_SERVICES_SUB_CONTENT_REQUEST,
       payload: postValue
   }
}

export const getServicesDataSubContentSuccess = (postValue?: any) => {
   return {
       type: AboutUsActionTypes.GET_SERVICES_SUB_CONTENT_SUCCESS,
       payload: postValue
   }
}

export const getServicesDataSubContentFailure = (error?: any) => {
   const { errors } = error;
   return {
       type: AboutUsActionTypes.GET_SERVICES_SUB_CONTENT_ERROR,
       payload: errors
   }
}

export const getSendMail = function* () {
    yield takeEvery(AboutUsActionTypes.POST_SEND_EMAIL_REQUEST, SendMailDetails);
 }
 export const reqSendMail = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.POST_SEND_EMAIL_REQUEST,
        payload: postValue
    }
 }
 
 export const getSendMailSuccess = (postValue?: any) => {
    return {
        type: AboutUsActionTypes.POST_SEND_EMAIL_SUCCESS,
        payload: postValue
    }
 }
 
 export const getSendMailFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: AboutUsActionTypes.POST_SEND_EMAIL_ERROR,
        payload: errors
    }
 }