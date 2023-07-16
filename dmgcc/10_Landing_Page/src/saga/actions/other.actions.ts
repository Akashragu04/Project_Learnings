import { takeEvery } from "redux-saga/effects";
import { brochureDetails, brochureDownloadDetails, commonGetBrochureData, commonGetData, contentDetails, contentDownloadDetails, newsletterDetails, newsletterDownloadDetails, newsletterLatestDetails, postAddContentDetails } from "../sagas/others.saga";
import { OtherTypes } from "../Types/other.types";


/**
 * capabilities Requirement Actions
 */

 export const getBrochureDetailsData = function* () {
    yield takeEvery(OtherTypes.GET_BROCHURE_DETAILS_REQUEST, brochureDetails);
}
export const reqBrochureData = (postValue?: any) => {
    return {
        type: OtherTypes.GET_BROCHURE_DETAILS_REQUEST,
        payload: postValue
    }
}

export const getBrochureSuccess = (postValue?: any) => {
    return {
        type: OtherTypes.GET_BROCHURE_DETAILS_SUCCESS,
        payload: postValue
    }
}

export const getBrochureFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: OtherTypes.GET_BROCHURE_DETAILS_ERROR,
        payload: errors
    }
}

/**
 * capabilities Requirement Actions
 */

 export const getBrochureDownloadData = function* () {
    yield takeEvery(OtherTypes.GET_BROCHURE_DOWNLOAD_REQUEST, brochureDownloadDetails);
}
export const reqBrochureDownloadData = (postValue?: any) => {
    return {
        type: OtherTypes.GET_BROCHURE_DOWNLOAD_REQUEST,
        payload: postValue
    }
}

export const getBrochureDownloadSuccess = (postValue?: any) => {
    return {
        type: OtherTypes.GET_BROCHURE_DOWNLOAD_SUCCESS,
        payload: postValue
    }
}

export const getBrochureDownloadFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: OtherTypes.GET_BROCHURE_DOWNLOAD_ERROR,
        payload: errors
    }
}

/**
 * capabilities Requirement Actions
 */

 export const getContentDetailsData = function* () {
    yield takeEvery(OtherTypes.GET_CONTENT_DETAILS_REQUEST, contentDetails);
}
export const reqContentDetailsData = (postValue?: any) => {
    return {
        type: OtherTypes.GET_CONTENT_DETAILS_REQUEST,
        payload: postValue
    }
}

export const getContentDetailsSuccess = (postValue?: any) => {
    return {
        type: OtherTypes.GET_CONTENT_DETAILS_SUCCESS,
        payload: postValue
    }
}

export const getContentDetailsFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: OtherTypes.GET_CONTENT_DETAILS_ERROR,
        payload: errors
    }
}

/**
 * capabilities Requirement Actions
 */

 export const getContentDownloadData = function* () {
    yield takeEvery(OtherTypes.GET_CONTENT_DOWNLOAD_REQUEST, contentDownloadDetails);
}
export const reqContentDownloadData = (postValue?: any) => {
    return {
        type: OtherTypes.GET_CONTENT_DOWNLOAD_REQUEST,
        payload: postValue
    }
}

export const getContentDownloadSuccess = (postValue?: any) => {
    return {
        type: OtherTypes.GET_CONTENT_DOWNLOAD_SUCCESS,
        payload: postValue
    }
}

export const getContentDownloadFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: OtherTypes.GET_CONTENT_DOWNLOAD_ERROR,
        payload: errors
    }
}

/**
 * capabilities Requirement Actions
 */

 export const getNewsletterData = function* () {
    yield takeEvery(OtherTypes.GET_NEWSLETTER_DETAILS_REQUEST, newsletterDetails);
}
export const reqNewsletterData = (postValue?: any) => {
    return {
        type: OtherTypes.GET_NEWSLETTER_DETAILS_REQUEST,
        payload: postValue
    }
}

export const getNewsletterSuccess = (postValue?: any) => {
    return {
        type: OtherTypes.GET_NEWSLETTER_DETAILS_SUCCESS,
        payload: postValue
    }
}

export const getNewsletterFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: OtherTypes.GET_NEWSLETTER_DETAILS_ERROR,
        payload: errors
    }
}

export const getLatestNewsletterData = function* () {
   yield takeEvery(OtherTypes.GET_LATEST_NEWSLETTER_DETAILS_REQUEST, newsletterLatestDetails);
}
export const reqLatestNewsletterData = (postValue?: any) => {
   return {
       type: OtherTypes.GET_LATEST_NEWSLETTER_DETAILS_REQUEST,
       payload: postValue
   }
}

export const getLatestNewsletterSuccess = (postValue?: any) => {
   return {
       type: OtherTypes.GET_LATEST_NEWSLETTER_DETAILS_SUCCESS,
       payload: postValue
   }
}

export const getLatestNewsletterFailure = (error?: any) => {
   const { errors } = error;
   return {
       type: OtherTypes.GET_LATEST_NEWSLETTER_DETAILS_ERROR,
       payload: errors
   }
}

/**
 * capabilities Requirement Actions
 */

 export const getNewsletterDownloadData = function* () {
    yield takeEvery(OtherTypes.GET_NEWSLETTER_DOWNLOAD_REQUEST, newsletterDownloadDetails);
}
export const reqNewsletterDownloadData = (postValue?: any) => {
    return {
        type: OtherTypes.GET_NEWSLETTER_DOWNLOAD_REQUEST,
        payload: postValue
    }
}

export const getNewsletterDownloadSuccess = (postValue?: any) => {
    return {
        type: OtherTypes.GET_NEWSLETTER_DOWNLOAD_SUCCESS,
        payload: postValue
    }
}

export const getNewsletterDownloadFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: OtherTypes.GET_NEWSLETTER_DOWNLOAD_ERROR,
        payload: errors
    }
}

/**
 * capabilities Requirement Actions
 */

 export const postAddContentData = function* () {
    yield takeEvery(OtherTypes.POST_ADD_CONTENT_REQUEST, postAddContentDetails);
}
export const reqAddContentData = (postValue?: any) => {
    return {
        type: OtherTypes.POST_ADD_CONTENT_REQUEST,
        payload: postValue
    }
}

export const getAddContentSuccess = (postValue?: any) => {
    return {
        type: OtherTypes.POST_ADD_CONTENT_SUCCESS,
        payload: postValue
    }
}

export const getAddContentFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: OtherTypes.POST_ADD_CONTENT_ERROR,
        payload: errors
    }
}


export const commonGet = function* () {
    yield takeEvery(OtherTypes.COMMON_VIEW_REQUEST, commonGetData);
}
export const  reqCommonGet = (postValue?: any) => {
    return {
        type: OtherTypes.COMMON_VIEW_REQUEST,
        payload: postValue
    }
}

export const  commonGetSuccess = (postValue?: any) => {
    return {
        type: OtherTypes.COMMON_VIEW_SUCCESS,
        payload: postValue
    }
}

export const  commonGetFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OtherTypes.COMMON_VIEW_ERROR,
        payload: errors
    }
}


export const commonGetBrochure = function* () {
    yield takeEvery(OtherTypes.COMMON_VIEW_BROCHURE_REQUEST, commonGetBrochureData);
}
export const  reqCommonGetBrochure = (postValue?: any) => {
    return {
        type: OtherTypes.COMMON_VIEW_BROCHURE_REQUEST,
        payload: postValue
    }
}

export const  commonGetBrochureSuccess = (postValue?: any) => {
    return {
        type: OtherTypes.COMMON_VIEW_BROCHURE_SUCCESS,
        payload: postValue
    }
}

export const  commonGeBrochuretFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OtherTypes.COMMON_VIEW_BROCHURE_ERROR,
        payload: errors
    }
}