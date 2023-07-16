export enum OtherTypes {
    //cost centre master
    GET_BROCHURE_DETAILS_REQUEST = 'GET_BROCHURE_DETAILS_REQUEST',
    GET_BROCHURE_DETAILS_SUCCESS = 'GET_BROCHURE_DETAILS_SUCCESS',
    GET_BROCHURE_DETAILS_ERROR = 'GET_BROCHURE_DETAILS_ERROR',
    GET_BROCHURE_DOWNLOAD_REQUEST = 'GET_BROCHURE_DOWNLOAD_REQUEST',
    GET_BROCHURE_DOWNLOAD_SUCCESS = 'GET_BROCHURE_DOWNLOAD_SUCCESS',
    GET_BROCHURE_DOWNLOAD_ERROR = 'GET_BROCHURE_DOWNLOAD_ERROR',
    GET_NEWSLETTER_DETAILS_REQUEST = 'GET_NEWSLETTER_DETAILS_REQUEST',
    GET_NEWSLETTER_DETAILS_SUCCESS = 'GET_NEWSLETTER_DETAILS_SUCCESS',
    GET_NEWSLETTER_DETAILS_ERROR = 'GET_NEWSLETTER_DETAILS_ERROR',
    GET_LATEST_NEWSLETTER_DETAILS_REQUEST = 'GET_LATEST_NEWSLETTER_DETAILS_REQUEST',
    GET_LATEST_NEWSLETTER_DETAILS_SUCCESS = 'GET_LATEST_NEWSLETTER_DETAILS_SUCCESS',
    GET_LATEST_NEWSLETTER_DETAILS_ERROR = 'GET_LATEST_NEWSLETTER_DETAILS_ERROR',
    GET_NEWSLETTER_DOWNLOAD_REQUEST = 'GET_NEWSLETTER_DOWNLOAD_REQUEST',
    GET_NEWSLETTER_DOWNLOAD_SUCCESS = 'GET_NEWSLETTER_DOWNLOAD_SUCCESS',
    GET_NEWSLETTER_DOWNLOAD_ERROR = 'GET_NEWSLETTER_DOWNLOAD_ERROR',
    GET_CONTENT_DETAILS_REQUEST = 'GET_CONTENT_DETAILS_REQUEST',
    GET_CONTENT_DETAILS_SUCCESS = 'GET_CONTENT_DETAILS_SUCCESS',
    GET_CONTENT_DETAILS_ERROR = 'GET_CONTENT_DETAILS_ERROR',
    GET_CONTENT_DOWNLOAD_REQUEST = 'GET_CONTENT_DOWNLOAD_REQUEST',
    GET_CONTENT_DOWNLOAD_SUCCESS = 'GET_CONTENT_DOWNLOAD_SUCCESS',
    GET_CONTENT_DOWNLOAD_ERROR = 'GET_CONTENT_DOWNLOAD_ERROR',
    POST_ADD_CONTENT_REQUEST = 'POST_ADD_CONTENT_REQUEST',
    POST_ADD_CONTENT_SUCCESS = 'POST_ADD_CONTENT_SUCCESS',
    POST_ADD_CONTENT_ERROR = 'POST_ADD_CONTENT_ERROR',
    COMMON_VIEW_REQUEST = 'COMMON_VIEW_REQUEST',
    COMMON_VIEW_SUCCESS = 'COMMON_VIEW_SUCCESS',
    COMMON_VIEW_ERROR = 'COMMON_VIEW_ERROR',
    COMMON_VIEW_BROCHURE_REQUEST = 'COMMON_VIEW_BROCHURE_REQUEST',
    COMMON_VIEW_BROCHURE_SUCCESS = 'COMMON_VIEW_BROCHURE_SUCCESS',
    COMMON_VIEW_BROCHURE_ERROR = 'COMMON_VIEW_BROCHURE_ERROR',
}

export interface OtherState {
    loading: boolean,
    items: {},
    errors:{},
    resBrochureDetails?:any,
    resBrochureDownload?:any,
    resNewsLetterDetails?:any,
    resLatestNewsLetterDetails?:any,
    resNewsLetterDownload?:any,
    resContentDownload?:any,
    resContentDetails?:any,
    resAddContentDetails?:any,
    resCommonViewData?:any,
    resCommonViewBrochureData?:any
}