import { Reducer } from 'redux'
import { OtherState, OtherTypes } from '../Types/other.types'

export const initialState: OtherState = {
    loading: false,
    items: [],
    errors: {},
    resBrochureDetails: null,
    resBrochureDownload: null,
    resNewsLetterDetails: null,
    resNewsLetterDownload: null,
    resContentDetails: null,
    resContentDownload: null,
    resAddContentDetails: null,
    resCommonViewData:null,
    resCommonViewBrochureData:null
}

const reducer: Reducer<OtherState> = (state = initialState, action) => {

    switch (action.type) {

        //capabilities
        case OtherTypes.GET_BROCHURE_DETAILS_REQUEST:
            {
                return {
                    ...state, loading: true, resBrochureDetails: null
                }
            }

        case OtherTypes.GET_BROCHURE_DETAILS_SUCCESS:
            {
                const { payload, resBrochureDetails } = action.payload
                return {
                    ...state, items: payload, loading: false, resBrochureDetails: resBrochureDetails,
                };
            }

        case OtherTypes.GET_BROCHURE_DETAILS_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resBrochureDetails: null,
                }
            }

        //capabilities
        case OtherTypes.GET_BROCHURE_DOWNLOAD_REQUEST:
            {
                return {
                    ...state, loading: true, resBrochureDownload: null
                }
            }

        case OtherTypes.GET_BROCHURE_DOWNLOAD_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state, items: payload, loading: false, resBrochureDownload: payload.data,
                };
            }

        case OtherTypes.GET_BROCHURE_DOWNLOAD_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resBrochureDownload: null,
                }
            }

        //resContentDetails
        case OtherTypes.GET_CONTENT_DETAILS_REQUEST:
            {
                return {
                    ...state, loading: true, resContentDetails: null
                }
            }

        case OtherTypes.GET_CONTENT_DETAILS_SUCCESS:
            {
                const { payload, resContentDetails } = action.payload
                return {
                    ...state, items: payload, loading: false, resContentDetails: resContentDetails,
                };
            }

        case OtherTypes.GET_CONTENT_DETAILS_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resContentDetails: null,
                }
            }

        //resContentDownload
        case OtherTypes.GET_CONTENT_DOWNLOAD_REQUEST:
            {
                return {
                    ...state, loading: true, resContentDownload: null
                }
            }

        case OtherTypes.GET_CONTENT_DOWNLOAD_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state, items: payload, loading: false, resContentDownload: payload.data,
                };
            }

        case OtherTypes.GET_CONTENT_DOWNLOAD_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resContentDownload: null,
                }
            }



        //resContentDetails
        case OtherTypes.GET_NEWSLETTER_DETAILS_REQUEST:
            {
                return {
                    ...state, loading: true, resNewsLetterDetails: null
                }
            }

        case OtherTypes.GET_NEWSLETTER_DETAILS_SUCCESS:
            {
                const { payload, resNewsLetterDetails } = action.payload
                return {
                    ...state, items: payload, loading: false, resNewsLetterDetails: resNewsLetterDetails,
                };
            }

        case OtherTypes.GET_NEWSLETTER_DETAILS_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resNewsLetterDetails: null,
                }
            }

        case OtherTypes.GET_LATEST_NEWSLETTER_DETAILS_REQUEST:
            {
                return {
                    ...state, loading: true, resLatestNewsLetterDetails: null
                }
            }

        case OtherTypes.GET_LATEST_NEWSLETTER_DETAILS_SUCCESS:
            {
                const { payload, resLatestNewsLetterDetails } = action.payload
                return {
                    ...state, items: payload, loading: false, resLatestNewsLetterDetails: resLatestNewsLetterDetails,
                };
            }

        case OtherTypes.GET_LATEST_NEWSLETTER_DETAILS_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resLatestNewsLetterDetails: null,
                }
            }

        //resContentDownload
        case OtherTypes.GET_NEWSLETTER_DOWNLOAD_REQUEST:
            {
                return {
                    ...state, loading: true, resNewsLetterDownload: null
                }
            }

        case OtherTypes.GET_NEWSLETTER_DOWNLOAD_SUCCESS:
            {
                const { payload, resNewsLetterDownload } = action.payload
                return {
                    ...state, items: payload, loading: false, resNewsLetterDownload: resNewsLetterDownload,
                };
            }

        case OtherTypes.GET_NEWSLETTER_DOWNLOAD_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resNewsLetterDownload: null,
                }
            }

        //resAddContentDetails
        case OtherTypes.POST_ADD_CONTENT_REQUEST:
            {
                return {
                    ...state, loading: true, resAddContentDetails: null
                }
            }

        case OtherTypes.POST_ADD_CONTENT_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state, items: payload, loading: false, resAddContentDetails: payload.data,
                };
            }

        case OtherTypes.POST_ADD_CONTENT_ERROR:
            {
                return {
                    ...state, loading: false, errors: action.payload, items: [], resAddContentDetails: null,
                }
            }

                //Common Services
                case OtherTypes.COMMON_VIEW_REQUEST:
                    {
                        return {
                            ...state,
                            loading: true,
                            resCommonViewData:null,
                        }
                    }
        
                case OtherTypes.COMMON_VIEW_SUCCESS:
                    {
                        const { payload, resCommonViewData } = action.payload
                        return {
                            ...state,
                            items: payload,
                            loading: false,
                            resCommonViewData: resCommonViewData,
                        };
                    }
        
                    case OtherTypes.COMMON_VIEW_ERROR:
                        {
                            return {
                                ...state,
                                loading: false,
                                errors: action.payload,
                                items: [],
                                resCommonViewData: null,
                            }
                        }
                        
                //Common Services
                case OtherTypes.COMMON_VIEW_BROCHURE_REQUEST:
                    {
                        return {
                            ...state,
                            loading: true,
                            resCommonViewBrochureData:null,
                        }
                    }
        
                case OtherTypes.COMMON_VIEW_BROCHURE_SUCCESS:
                    {
                        const { payload, resCommonViewBrochureData } = action.payload
                        return {
                            ...state,
                            items: payload,
                            loading: false,
                            resCommonViewBrochureData: resCommonViewBrochureData,
                        };
                    }
        
                    case OtherTypes.COMMON_VIEW_BROCHURE_ERROR:
                        {
                            return {
                                ...state,
                                loading: false,
                                errors: action.payload,
                                items: [],
                                resCommonViewBrochureData: null,
                            }
                        }

        default: {
            return state
        }
    }
}

export { reducer as OthersReducer }