import { takeEvery } from "redux-saga/effects";
import { AboutUsDetails, getVisionDetails, missionVisionDetails, ServicesDetails, ServicesSubContentDetails, teamMembersDetails, TestimonialDetails } from "../sagas/aboutus.saga";
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