import { BusinessRequirementTypes } from '../sagas/Types';

// Type-safe initialState!
const defaultObj: any = {}
export const initialState: any = {
    moduleResponse: {},
    moduleUpdateResponse: null,
    response: {},
    updateResponse: {},
    detailResponse: {},
    iterationResponse: {},
    items: [],
    loading: false,
    isLoading: false,
    errors: {},
    hrUsersList: {},
    facilityUsersList: {},
    itUsersList: {},
    financeUsersList: [],
    rateCardList: [],
    requirementWithoutBizCase: {},
    rampupResponse: {},
    financeSendMailResponse: {}
}

export const businessRequirement: any = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case BusinessRequirementTypes.INIT_BIZ_REQUIREMENTS:
            return {
                ...state, loading: false, detailResponse: defaultObj, moduleResponse: defaultObj,
                moduleUpdateResponse: null, response: defaultObj, updateResponse: defaultObj,
                iterationResponse: defaultObj, requirementWithoutBizCase: defaultObj, rampupResponse: defaultObj,
                financeSendMailResponse: defaultObj
            }
        case BusinessRequirementTypes.SET_REQUIREMENT_WITHOUT_BIZCASE_REQUEST:
            return { ...state, loading: true, requirementWithoutBizCase: defaultObj }
        case BusinessRequirementTypes.SET_REQUIREMENT_WITHOUT_BIZCASES_SUCCESS:
            return { ...state, loading: false, requirementWithoutBizCase: response }
        case BusinessRequirementTypes.SET_REQUIREMENT_WITHOUT_BIZCASE_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case BusinessRequirementTypes.CREATE_BIZ_REQUIREMENTS:
            return { ...state, loading: true, response: defaultObj, moduleUpdateResponse: null }
        case BusinessRequirementTypes.CREATE_BIZ_REQUIREMENTS_SUCCESS:
            return { ...state, loading: false, response: response }
        case BusinessRequirementTypes.CREATE_BIZ_REQUIREMENTS_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case BusinessRequirementTypes.GET_BIZ_REQUIREMENT_DETAILS:
            return { ...state, isLoading: true, detailResponse: defaultObj }
        case BusinessRequirementTypes.GET_BIZ_REQUIREMENT_SUCCESS:
            return { ...state, isLoading: false, detailResponse: response }
        case BusinessRequirementTypes.GET_BIZ_REQUIREMENT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case BusinessRequirementTypes.GET_BIZ_ITERATION_DETAILS:
            return { ...state, loading: true, iterationResponse: defaultObj }
        case BusinessRequirementTypes.GET_BIZ_ITERATION_DETAILS_SUCCESS:
            return { ...state, loading: false, iterationResponse: response }
        case BusinessRequirementTypes.GET_BIZ_ITERATION_DETAILS_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case BusinessRequirementTypes.SAVEANDNOTIFY_BIZ_REQUIREMENTS_REQUEST:
            return { ...state, loading: true, moduleUpdateResponse: null }
        case BusinessRequirementTypes.SAVEANDNOTIFY_BIZ_REQUIREMENTS_SUCCESS:
            return { ...state, loading: false, moduleUpdateResponse: response }
        case BusinessRequirementTypes.SAVEANDNOTIFY_BIZ_REQUIREMENTS_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case BusinessRequirementTypes.SAVEANDNOTIFYALL_BIZ_REQUIREMENTS_REQUEST:
            return { ...state, loading: true, moduleResponse: defaultObj }
        case BusinessRequirementTypes.SAVEANDNOTIFYALL_BIZ_REQUIREMENTS_SUCCESS:
            return { ...state, loading: false, moduleResponse: response }
        case BusinessRequirementTypes.SAVEANDNOTIFYALL_BIZ_REQUIREMENTS_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case BusinessRequirementTypes.UPDATE_BIZ_REQUIREMENTS_REQUEST:
            return { ...state, loading: true, updateResponse: defaultObj, moduleUpdateResponse: null }
        case BusinessRequirementTypes.UPDATE_BIZ_REQUIREMENTS_SUCCESS:
            return { ...state, loading: false, updateResponse: response }
        case BusinessRequirementTypes.UPDATE_BIZ_REQUIREMENTS_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case BusinessRequirementTypes.GET_HR_USERDETAILS_REQUEST:
            return { ...state, loading: true, hrUsersList: defaultObj }
        case BusinessRequirementTypes.GET_HR_USERDETAILS_SUCCESS:
            return { ...state, loading: false, hrUsersList: response.data }
        case BusinessRequirementTypes.GET_HR_USERDETAILS_ERROR:
            return { ...state, loading: false, hrUsersList: defaultObj, errors: action.error }
        case BusinessRequirementTypes.GET_IT_USERDETAILS_REQUEST:
            return { ...state, loading: true, itUsersList: defaultObj }
        case BusinessRequirementTypes.GET_IT_USERDETAILS_SUCCESS:
            return { ...state, loading: false, itUsersList: response.data }
        case BusinessRequirementTypes.GET_IT_USERDETAILS_ERROR:
            return { ...state, loading: false, itUsersList: defaultObj, errors: action.error }
        case BusinessRequirementTypes.GET_FACILITY_USERDETAILS_REQUEST:
            return { ...state, loading: true, facilityUsersList: defaultObj }
        case BusinessRequirementTypes.GET_FACILITY_USERDETAILS_SUCCESS:
            return { ...state, loading: false, facilityUsersList: response.data }
        case BusinessRequirementTypes.GET_FACILITY_USERDETAILS_ERROR:
            return { ...state, loading: false, facilityUsersList: defaultObj, errors: action.error }
        case BusinessRequirementTypes.GET_EXISTING_RATECARD_LIST_REQUEST:
            return { ...state, loading: true, rateCardList: [] }
        case BusinessRequirementTypes.GET_EXISTING_RATECARD_LIST_SUCCESS:
            return { ...state, loading: false, rateCardList: response.data }
        case BusinessRequirementTypes.GET_EXISTING_RATECARD_LIST_ERROR:
            return { ...state, loading: false, rateCardList: [], errors: action.error }
        case BusinessRequirementTypes.RESET_ACTIVE_RAMPUPDATA_ACTION:
            return { ...state, loading: false, rampupResponse: defaultObj, financeSendMailResponse: defaultObj }
        case BusinessRequirementTypes.SET_ACTIVE_RAMPUPDATA_REQUEST:
            return { ...state, isLoading: true, rampupResponse: defaultObj }
        case BusinessRequirementTypes.SET_ACTIVE_RAMPUPDATA_SUCCESS:
            return { ...state, isLoading: false, rampupResponse: response }
        case BusinessRequirementTypes.SET_ACTIVE_RAMPUPDATA_ERROR:
            return { ...state, isLoading: false, errors: action.error }
        case BusinessRequirementTypes.GET_FINANCE_USERDETAILS_REQUEST:
            return { ...state, loading: true, financeUsersList: [] }
        case BusinessRequirementTypes.GET_FINANCE_USERDETAILS_SUCCESS:
            return { ...state, loading: false, financeUsersList: response.data }
        case BusinessRequirementTypes.GET_FINANCE_USERDETAILS_ERROR:
            return { ...state, loading: false, financeUsersList: [], errors: action.error }
        case BusinessRequirementTypes.SEND_FINANCE_BIZ_EMAIL_REQUEST:
            return { ...state, isLoading: true, financeSendMailResponse: defaultObj }
        case BusinessRequirementTypes.SEND_FINANCE_BIZ_EMAIL_SUCCESS:
            return { ...state, isLoading: false, financeSendMailResponse: response }
        case BusinessRequirementTypes.SEND_FINANCE_BIZ_EMAIL_ERROR:
            return { ...state, isLoading: false, errors: action.error }
        default: {
            return state
        }
    }
}
