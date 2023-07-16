import { BizJDMappingTypes } from '../sagas/Types';

// Type-safe initialState!
const defaultObj: any = {}
export const initialState: any = {
    fileResponse: {},
    response: {},
    mappingResponse: {},
    projectResponse: {},
    detailResponse: {},
    jdListResponse: {},
    jdListOptions: [],
    items: [],
    loading: false,
    isLoading: false,
    errors: {}
}

export const businessJDMapping: any = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case BizJDMappingTypes.INIT_BIZ_JDMAPPINGS:
            return {
                ...state, loading: false, projectResponse: defaultObj, detailResponse: defaultObj, response: defaultObj,
                fileResponse: defaultObj, mappingResponse: defaultObj, jdListResponse: defaultObj, jdListOptions: []
            }
        case BizJDMappingTypes.GET_JDLIST_DETAILS_ACTION:
            return { ...state, loading: true, jdListResponse: defaultObj, jdListOptions: [] }
        case BizJDMappingTypes.GET_JDLIST_DETAILS_SUCCESS:
            return { ...state, loading: false, jdListResponse: response, jdListOptions: response.data }
        case BizJDMappingTypes.GET_JDLIST_DETAILS_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case BizJDMappingTypes.GET_BIZ_PROJECT_DETAILS:
            return { ...state, isLoading: true, projectResponse: defaultObj }
        case BizJDMappingTypes.GET_BIZ_PROJECT_SUCCESS:
            return { ...state, isLoading: false, projectResponse: response }
        case BizJDMappingTypes.GET_BIZ_PROJECT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case BizJDMappingTypes.CREATE_BIZ_JDMAPPINGS:
            return { ...state, isLoading: true, response: defaultObj }
        case BizJDMappingTypes.CREATE_BIZ_JDMAPPINGS_SUCCESS:
            return { ...state, isLoading: false, response: response }
        case BizJDMappingTypes.CREATE_BIZ_JDMAPPINGS_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case BizJDMappingTypes.GET_BIZ_JDMAPPINGS_DETAILS:
            return { ...state, loading: true, detailResponse: defaultObj }
        case BizJDMappingTypes.GET_BIZ_JDMAPPINGS_SUCCESS:
            return { ...state, loading: false, detailResponse: response }
        case BizJDMappingTypes.GET_BIZ_JDMAPPINGS_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case BizJDMappingTypes.SET_JDFILE_UPLOAD_RESET:
            return { ...state, loading: false, fileResponse: defaultObj, mappingResponse: defaultObj }
        case BizJDMappingTypes.SET_JDFILE_UPLOAD:
            return { ...state, isLoading: true, fileResponse: defaultObj }
        case BizJDMappingTypes.SET_JDFILE_UPLOAD_SUCCESS:
            return { ...state, isLoading: false, fileResponse: response }
        case BizJDMappingTypes.SET_JDFILE_UPLOAD_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case BizJDMappingTypes.CREATE_JDASSIGN_AND_MAPPINGS:
            return { ...state, isLoading: true, mappingResponse: defaultObj }
        case BizJDMappingTypes.CREATE_JDASSIGN_AND_MAPPINGS_SUCCESS:
            return { ...state, isLoading: false, mappingResponse: response }
        case BizJDMappingTypes.CREATE_JDASSIGN_AND_MAPPINGS_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        default: {
            return state
        }
    }
}
