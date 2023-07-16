import { Reducer } from 'redux'
import { AboutUsActionTypes, AboutUsState } from '../Types/aboutus.types';

export const initialState: AboutUsState = {
    loading: false,
    items: [],
    errors: null,
    resAboutViewData: null,
    resPostAboutViewData: null,
    resPutAboutViewData: null,
    resServicesData: null,
    resPostServicesData: null,
    resPutServicesData: null,
    resVisionData: null,
    resPostVisionData: null,
    resPutVisionData: null,
    resMissionData: null,
    resPostMissionData: null,
    resPutMissionData: null,
    resTestimonialData: null,
    resPostTestimonialData: null,
    resPutTestimonialData: null,
    resTeamMembersData: null,
    resPostTeamMembersData: null,
    resPutTeamMembersData: null,
    resMissionVisionData: null,
    resPostMissionVisionData: null,
    resPutMissionVisionData: null,
    resCommonUpload: null,
    restCommonGet: null,
    resCommonPost: null,
    resCommonPut: null,
    resCommonDelete: null,
    resCommonDownload: null,
    resVisionDetails: null,
    resServicesSubContentData: null
}


const reducer: Reducer<AboutUsState> = (state = initialState, action) => {

    switch (action.type) {
        //About us
        case AboutUsActionTypes.GET_ABOUT_US_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resAboutViewData: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.GET_ABOUT_US_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resAboutViewData: payload.data,
                    errors: null
                };
            }

        case AboutUsActionTypes.GET_ABOUT_US_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resAboutViewData: null,
                }
            }

        case AboutUsActionTypes.POST_ABOUT_US_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resPostAboutViewData: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.POST_ABOUT_US_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resPostAboutViewData: payload,
                    errors: null
                };
            }

        case AboutUsActionTypes.POST_ABOUT_US_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resPostAboutViewData: null,
                }
            }

        case AboutUsActionTypes.PUT_ABOUT_US_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resPutAboutViewData: null,
                    errors: null
                }
            }


        case AboutUsActionTypes.POST_SEND_EMAIL_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    errors: null
                }
            }

        case AboutUsActionTypes.POST_SEND_EMAIL_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    errors: null
                };
            }

        case AboutUsActionTypes.POST_SEND_EMAIL_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                }
            }

        case AboutUsActionTypes.PUT_ABOUT_US_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resPutAboutViewData: payload.data,
                    errors: null
                };
            }

        case AboutUsActionTypes.PUT_ABOUT_US_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resPutAboutViewData: null,
                }
            }

        //Testimonial

        case AboutUsActionTypes.GET_TESTIMONIAL_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resTestimonialData: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.GET_TESTIMONIAL_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resTestimonialData: payload.data,
                    errors: null
                };
            }

        case AboutUsActionTypes.GET_TESTIMONIAL_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resTestimonialData: null,
                }
            }

        case AboutUsActionTypes.POST_TESTIMONIAL_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resPostTestimonialData: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.POST_TESTIMONIAL_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resPostTestimonialData: payload.data,
                    errors: null
                };
            }

        case AboutUsActionTypes.POST_TESTIMONIAL_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resPostTestimonialData: null,
                }
            }

        case AboutUsActionTypes.PUT_TESTIMONIAL_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resPutTestimonialData: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.PUT_TESTIMONIAL_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resPutTestimonialData: payload.data,
                    errors: null
                };
            }

        case AboutUsActionTypes.PUT_TESTIMONIAL_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resPutTestimonialData: null,
                }
            }
        //Team Member
        case AboutUsActionTypes.GET_TEAM_MEMBERS_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resTeamMembersData: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.GET_TEAM_MEMBERS_SUCCESS:
            {
                const { payload, resTeamMembersData } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resTeamMembersData: resTeamMembersData,
                    errors: null
                };
            }

        case AboutUsActionTypes.GET_TEAM_MEMBERS_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resTeamMembersData: null,
                }
            }

        case AboutUsActionTypes.POST_TEAM_MEMBERS_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resPostTeamMembersData: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.POST_TEAM_MEMBERS_SUCCESS:
            {
                const { payload, resTeamMembersData } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resPostTeamMembersData: resTeamMembersData,
                    errors: null
                };
            }

        case AboutUsActionTypes.POST_TEAM_MEMBERS_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resPostTeamMembersData: null,
                }
            }

        case AboutUsActionTypes.PUT_TEAM_MEMBERS_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resPutTeamMembersData: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.PUT_TEAM_MEMBERS_SUCCESS:
            {
                const { payload, resTeamMembersData } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resPutTeamMembersData: resTeamMembersData,
                    errors: null
                };
            }

        case AboutUsActionTypes.PUT_TEAM_MEMBERS_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resPutTeamMembersData: null,
                }
            }
        //Mission
        case AboutUsActionTypes.GET_MISSION_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resMissionData: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.GET_MISSION_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resMissionData: payload.data,
                    errors: null
                };
            }

        case AboutUsActionTypes.GET_MISSION_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resMissionData: null,
                }
            }

        //Mission and vision

        case AboutUsActionTypes.GET_MISSION_VISION_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resMissionVisionData: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.GET_MISSION_VISION_SUCCESS:
            {
                const { payload, resMissionVisionData } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resMissionVisionData: resMissionVisionData,
                    errors: null
                };
            }

        case AboutUsActionTypes.GET_MISSION_VISION_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resMissionVisionData: null,
                }
            }

        case AboutUsActionTypes.POST_MISSION_VISION_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resPostMissionVisionData: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.POST_MISSION_VISION_SUCCESS:
            {
                const { payload, resPostMissionVisionData } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resPostMissionVisionData: resPostMissionVisionData,
                    errors: null
                };
            }

        case AboutUsActionTypes.POST_MISSION_VISION_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resPostMissionVisionData: null,
                }
            }

        case AboutUsActionTypes.PUT_MISSION_VISION_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resPutMissionVisionData: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.PUT_MISSION_VISION_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resPutMissionVisionData: payload.data,
                    errors: null
                };
            }

        case AboutUsActionTypes.PUT_MISSION_VISION_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resPutMissionVisionData: null,
                }
            }
        //Services
        case AboutUsActionTypes.GET_SERVICES_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resServicesData: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.GET_SERVICES_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resServicesData: payload.data,
                    errors: null
                };
            }

        case AboutUsActionTypes.GET_SERVICES_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resServicesData: null,
                }
            }

        case AboutUsActionTypes.POST_SERVICES_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resPostServicesData: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.POST_SERVICES_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resPostServicesData: payload.data,
                    errors: null
                };
            }

        case AboutUsActionTypes.POST_SERVICES_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resPostServicesData: null,
                }
            }

        case AboutUsActionTypes.PUT_SERVICES_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resPutServicesData: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.PUT_SERVICES_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resPutServicesData: payload.data,
                    errors: null
                };
            }

        case AboutUsActionTypes.PUT_SERVICES_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resPutServicesData: null,
                }
            }

        //Vision
        case AboutUsActionTypes.POST_COMMON_UPLOAD_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resCommonUpload: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.POST_COMMON_UPLOAD_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resCommonUpload: payload.data,
                    errors: null
                };
            }

        case AboutUsActionTypes.POST_COMMON_UPLOAD_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resCommonUpload: null,
                }
            }

        case AboutUsActionTypes.COMMON_UPLOAD_LANDING_PAGE_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resCommonUploadLandingPage: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.COMMON_UPLOAD_LANDING_PAGE_SUCCESS:
            {
                const { payload, resCommonUploadLandingPage } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resCommonUploadLandingPage: resCommonUploadLandingPage,
                    errors: null
                };
            }

        case AboutUsActionTypes.COMMON_UPLOAD_LANDING_PAGE_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resCommonUploadLandingPage: null,
                }
            }


        case AboutUsActionTypes.CLEAR_STATE_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                }
            }

        case AboutUsActionTypes.CLEAR_STATE_SUCCESS:
            {
                return {
                    ...state,
                    loading: false,
                    resPostAboutViewData: null,
                    resPutAboutViewData: null,
                    resPostServicesData: null,
                    resPutServicesData: null,
                    resPostMissionData: null,
                    resPutMissionData: null,
                    resPostTestimonialData: null,
                    resPutTestimonialData: null,
                    resPostTeamMembersData: null,
                    resPutTeamMembersData: null,
                    resPostMissionVisionData: null,
                    resPutMissionVisionData: null,
                    resCommonUpload: null,
                    resCommonPost: null,
                    resCommonPut: null,
                    resCommonDownload: null,
                    errors: null,
                    resCommonDelete: null
                }
            }
        //Common Services
        case AboutUsActionTypes.COMMON_ABOUT_US_GET_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    restCommonGet: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.COMMON_ABOUT_US_GET_SUCCESS:
            {
                const { payload, restCommonGet } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    restCommonGet: restCommonGet,
                    errors: null
                };
            }

        case AboutUsActionTypes.COMMON_POST_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resCommonPost: null,
                }
            }

        case AboutUsActionTypes.COMMON_PUT_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resCommonPut: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.COMMON_PUT_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resCommonPut: payload,
                    errors: null
                };
            }

        case AboutUsActionTypes.COMMON_PUT_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resCommonPut: null,
                }
            }
        case AboutUsActionTypes.COMMON_DELETE_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resCommonDelete: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.COMMON_DELETE_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resCommonDelete: payload,
                    errors: null
                };
            }

        case AboutUsActionTypes.COMMON_DELETE_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resCommonDelete: null,
                }
            }
        case AboutUsActionTypes.COMMON_POST_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resCommonPost: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.COMMON_POST_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resCommonPost: payload,
                    errors: null
                };
            }

        case AboutUsActionTypes.COMMON_ABOUT_US_GET_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    restCommonGet: action.errors,
                }
            }

        //Common Services
        case AboutUsActionTypes.COMMON_GET_SUB_CONTENT_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    restCommonSubContentGet: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.COMMON_GET_SUB_CONTENT_SUCCESS:
            {
                const { payload, restCommonSubContentGet } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    restCommonSubContentGet: restCommonSubContentGet,
                    errors: null
                };
            }

        case AboutUsActionTypes.COMMON_GET_SUB_CONTENT_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    restCommonSubContentGet: null,
                }
            }

        case AboutUsActionTypes.COMMON_PUT_SUB_CONTENT_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resCommonSubContentPut: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.COMMON_PUT_SUB_CONTENT_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resCommonSubContentPut: payload.data,
                    errors: null
                };
            }

        case AboutUsActionTypes.COMMON_PUT_SUB_CONTENT_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resCommonSubContentPut: null,
                }
            }
        case AboutUsActionTypes.COMMON_DELETE_SUB_CONTENT_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resCommonSubContentDelete: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.COMMON_DELETE_SUB_CONTENT_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resCommonSubContentDelete: payload.data,
                    errors: null
                };
            }

        case AboutUsActionTypes.COMMON_DELETE_SUB_CONTENT_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resCommonSubContentDelete: null,
                }
            }
        case AboutUsActionTypes.COMMON_POST_SUB_CONTENT_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resCommonSubContentPost: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.COMMON_POST_SUB_CONTENT_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resCommonSubContentPost: payload.data,
                    errors: null
                };
            }

        case AboutUsActionTypes.COMMON_POST_SUB_CONTENT_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resCommonSubContentPost: null,
                }
            }
        case AboutUsActionTypes.COMMON_DOWNLOAD_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resCommonDownload: null,
                    errors: null
                }
            }

        case AboutUsActionTypes.COMMON_DOWNLOAD_SUCCESS:
            {
                const { payload, resCommonDownload } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resCommonDownload: resCommonDownload,
                    errors: null
                };
            }

        case AboutUsActionTypes.COMMON_DOWNLOAD_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resCommonDownload: null,
                }
            }


        case AboutUsActionTypes.GET_VISION_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resVisionDetails: null
                }
            }

        case AboutUsActionTypes.GET_VISION_SUCCESS:
            {
                const { payload, resVisionDetails } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resVisionDetails: resVisionDetails,
                };
            }

        case AboutUsActionTypes.GET_VISION_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resVisionDetails: null,
                }
            }


        case AboutUsActionTypes.GET_SERVICES_SUB_CONTENT_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resServicesSubContentData: null
                }
            }

        case AboutUsActionTypes.GET_SERVICES_SUB_CONTENT_SUCCESS:
            {
                const { payload, resServicesSubContentData } = action.payload
                return {
                    ...state,
                    items: payload,
                    loading: false,
                    resServicesSubContentData: resServicesSubContentData,
                };
            }

        case AboutUsActionTypes.GET_SERVICES_SUB_CONTENT_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    errors: action.payload,
                    items: [],
                    resServicesSubContentData: null,
                }
            }

        default: {
            return state
        }
    }
}

export { reducer as AboutUsReducer }
