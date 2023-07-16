import { Reducer } from 'redux'
import { ResourceState, ResourcesActionTypes } from '../Types/Resources.Types'

// Type-safe initialState!
export const initialState: ResourceState = {
    items: [],
    loading: false,
    errors: {},
    getCostCentreList: null,
    getCostCentreResourceData: null,
    getResourceRecordList: null,
    getUtilizationList: null,
    getEmployeeList: null,
    getThirdPartResource: null,
    getResourceDetails: null,
    getResourceSkill: null,
    getJDMappingDetails: null,
    getJDMappingInternal:null,
    postResJDMapping:null,
    resAddThirdpartData:null,
    resEditThirdpartData:null
}

const reducer: Reducer<ResourceState> = (state = initialState, action) => {
    switch (action.type) {
        case ResourcesActionTypes.COST_CENTRE_REQUEST:
        case ResourcesActionTypes.COST_CENTRE_RESOURCE_REQUEST:
        case ResourcesActionTypes.GET_RESOURCE_RECORD_REQUEST:
            {
                return { ...state, loading: true, getCostCentreResourceData: null, getUtilizationList: null, 
                    errors: {} }
            }
        //This is section used Thirdpart resource
        case ResourcesActionTypes.ADD_THIRDPART_RESOURCE_REQUEST:
            {
                return { ...state, loading: true, getThirdPartResource: null, resAddThirdpartData:null }
            }

            
        case ResourcesActionTypes.GET_THIRDPART_RESOURCE_REQUEST:
            {
                return { ...state, loading: true, getThirdPartResource: null }
            }

        case ResourcesActionTypes.GET_EMPLOYEE_LIST_REQUEST:
        case ResourcesActionTypes.POST_JD_DETAIL_REQUEST:
            {
                return { ...state, loading: true, getUtilizationList: null, getJDMappingInternal:null,
                    errors: {} }
            }
            case ResourcesActionTypes.PUT_JD_DETAIL_REQUEST:
                {
                    return { ...state, loading: true, postResJDMapping: null,
                        errors: {} }
                }
                case ResourcesActionTypes.PUT_JD_DETAIL_SUCCESS:
                    {
                        const { payload, postResJDMapping } = action.payload;
                        return { ...state, loading: false, items: payload, postResJDMapping: postResJDMapping }
                    }
        case ResourcesActionTypes.GET_JD_DETAIL_REQUEST:
            {
                return { ...state, loading: true, getJDMappingDetails: null }
            }
        case ResourcesActionTypes.GET_UTILIZATION_DATA_REQUEST:
        case ResourcesActionTypes.GET_RESOURCE_DETAIL_REQUEST:
            {
                return { ...state, loading: true, getUtilizationList: null, getResourceDetails: null, getResourceSkill: null }
            }
        case ResourcesActionTypes.UPDATE_RESOURCE_RECORD_REQUEST:
        case ResourcesActionTypes.UPDATE_THIRDPART_RESOURCE_REQUEST:
        case ResourcesActionTypes.DELETE_THIRDPART_RESOURCE_REQUEST:
            {
                return { ...state, loading: true }
            }
        case ResourcesActionTypes.ADD_THIRDPART_RESOURCE_SUCCESS:
            {
                const { payload } = action.payload;
                return { ...state, loading: false, items: payload, resAddThirdpartData:payload  }
            }
            
        case ResourcesActionTypes.UPDATE_THIRDPART_RESOURCE_SUCCESS:
                {
                    const { payload } = action.payload;
                    return { ...state, loading: false, items: payload, resEditThirdpartData:payload  }
                }

                
            case ResourcesActionTypes.DELETE_THIRDPART_RESOURCE_SUCCESS:
                {
                    const { payload } = action.payload;
                    return { ...state, loading: false, items: payload }
                }
        case ResourcesActionTypes.POST_JD_DETAIL_SUCCESS:
            {
                const { payload, getJDMappingInternal } = action.payload;
                return { ...state, loading: false, items: payload, getJDMappingInternal:getJDMappingInternal  }
            }

        case ResourcesActionTypes.GET_THIRDPART_RESOURCE_SUCCESS:
            {
                const { payload, getThirdPartResource } = action.payload;
                return { ...state, loading: false, items: payload, getThirdPartResource: getThirdPartResource }
            }
        case ResourcesActionTypes.GET_JD_DETAIL_SUCCESS:
            {
                const { payload, getJDDetails } = action.payload;
                return { ...state, loading: false, items: payload, getJDMappingDetails: getJDDetails }
            }
        case ResourcesActionTypes.COST_CENTRE_SUCCESS:
            {
                const { payload, getCostCentreList } = action.payload;
                return { ...state, loading: false, items: payload, getCostCentreList: getCostCentreList }
            }
        case ResourcesActionTypes.GET_EMPLOYEE_LIST_SUCCESS:
            {
                const { payload, getEmpList } = action.payload;
                return { ...state, loading: false, items: payload, getEmployeeList: getEmpList }
            }
        case ResourcesActionTypes.GET_UTILIZATION_DATA_SUCCESS:
            {
                const { payload, getUtilizationList } = action.payload;
                return { ...state, loading: false, items: payload, getUtilizationList: getUtilizationList }
            }
        case ResourcesActionTypes.UPDATE_RESOURCE_RECORD_SUCCESS:
            {
                const { payload } = action.payload;
                return { ...state, loading: false, items: payload }
            }
        case ResourcesActionTypes.GET_RESOURCE_DETAIL_SUCCESS:
            {
                const { payload, getResourceDetails, getResourceSkill } = action.payload;
                return { ...state, loading: false, items: payload, getResourceDetails: getResourceDetails, getResourceSkill: getResourceSkill }
            }
        case ResourcesActionTypes.GET_RESOURCE_RECORD_SUCCESS:
            {
                const { payload, getResourceRecordList } = action.payload;
                return { ...state, loading: false, items: payload, getResourceRecordList: getResourceRecordList }
            }
        case ResourcesActionTypes.COST_CENTRE_RESOURCE_SUCCESS:
            {
                const { payload, getCostCentreResourceData } = action.payload;
                return { ...state, loading: false, items: payload, getCostCentreResourceData: getCostCentreResourceData }
            }
        case ResourcesActionTypes.COST_CENTRE_ERROR:
        case ResourcesActionTypes.COST_CENTRE_RESOURCE_ERROR:
        case ResourcesActionTypes.UPDATE_RESOURCE_RECORD_ERROR:
        case ResourcesActionTypes.GET_RESOURCE_RECORD_ERROR:
        case ResourcesActionTypes.GET_UTILIZATION_DATA_ERROR:
        case ResourcesActionTypes.GET_EMPLOYEE_LIST_ERROR:
        case ResourcesActionTypes.DELETE_THIRDPART_RESOURCE_ERROR:
        case ResourcesActionTypes.GET_RESOURCE_DETAIL_ERROR:
        case ResourcesActionTypes.POST_JD_DETAIL_ERROR:
        case ResourcesActionTypes.GET_JD_DETAIL_ERROR:
            case ResourcesActionTypes.PUT_JD_DETAIL_ERROR:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    items: [],
                    getResourceDetails: null,
                    getJDMappingInternal:null,
                    postResJDMapping:null
                }
            }
            case ResourcesActionTypes.CLEAR_RESOURCES_REQUEST:
                {
                    return initialState
                }
        default: {
            return state
        }
    }
}


export { reducer as ResourceProcess }