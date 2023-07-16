import { Reducer } from 'redux'
import { AboutUsActionTypes, AboutUsState } from '../Types/aboutus.types';

export const initialState: AboutUsState = {
    loading: false,
    items: [],
    errors: {},
    resAboutViewData: null,
    resServicesData: null,
    resVisionData: null,
    resMissionData: null,
    resTestimonialData: null,
    resTeamMembersData: null,
    resMissionVisionData:null,
    resVisionDetails:null
}


const reducer: Reducer<AboutUsState> = (state = initialState, action) => {

    switch (action.type) {
        case AboutUsActionTypes.GET_ABOUT_US_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    resAboutViewData: null
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

            case AboutUsActionTypes.GET_TESTIMONIAL_REQUEST:
                {
                    return {
                        ...state,
                        loading: true,
                        resTestimonialData: null
                    }
                }
    
            case AboutUsActionTypes.GET_TESTIMONIAL_SUCCESS:
                {
                    const { payload, resTestimonialData } = action.payload
                    return {
                        ...state,
                        items: payload,
                        loading: false,
                        resTestimonialData: resTestimonialData,
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

                case AboutUsActionTypes.GET_TEAM_MEMBERS_REQUEST:
                    {
                        return {
                            ...state,
                            loading: true,
                            resTeamMembersData: null
                        }
                    }
        
                case AboutUsActionTypes.GET_TEAM_MEMBERS_SUCCESS:
                    {
                        const { payload, resTeamMembersData } = action.payload
                        return {
                            ...state,
                            items: payload,
                            loading: false,
                            resTeamMembersData:resTeamMembersData,
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

            case AboutUsActionTypes.GET_MISSION_REQUEST:
                {
                    return {
                        ...state,
                        loading: true,
                        resMissionData: null
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

                case AboutUsActionTypes.GET_MISSION_VISION_REQUEST:
                    {
                        return {
                            ...state,
                            loading: true,
                            resMissionVisionData: null
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

                case AboutUsActionTypes.GET_SERVICES_REQUEST:
                    {
                        return {
                            ...state,
                            loading: true,
                            resServicesData: null
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
        default: {
            return state
        }
    }
}

export { reducer as AboutUsReducer }
