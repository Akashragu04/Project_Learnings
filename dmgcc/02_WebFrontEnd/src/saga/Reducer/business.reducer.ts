import { Reducer } from 'redux';
import { ActionTypes, AuthState, BizCaseSLATypes } from '../sagas/Types';

// Type-safe initialState!
export const initialState: any = {
    items: [],
    loading: false,
    errors: null,
    isLoading: false,
    getUserDateList: null,
    businessGridData: null,
    leadsResponse: null,
    assignSuccess: null,
    getLeadsEditResponse: null,
    totalElements: 0,
    totalPages: 10,
    pageSize: 10,
    updateStatus: false,
    getLeadsEditResponseState: false,
    assignSuccessStatus: false,
    businessCasedReqResponse: [],
    businessCasedReqData: [],
    addEditLeadsResponse: null,
    approvalBizProcessStatus: false,
    emailApprovalStatus: null,
    leadsConversion: null,
    getDepartmentList: null,
    getStepperData: null,
    getBizCaseSetupChart: null,
    getCustomerandBusiness:null,
    getEmployeeList:null,
    resLeadData:null
}

const reducer: Reducer<AuthState> = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
        case ActionTypes.ADD_LEADS_REQUEST:
        case ActionTypes.GET_USERDETAILS_REQUEST:
        case ActionTypes.ASSIGN_PROJECT_REQUEST:
        case ActionTypes.UPDATE_LEADS_DATA_REQUEST:
        case ActionTypes.GET_BUSINESS_CASE_REQUEST:
        case ActionTypes.BUSINESS_CASE_APPROVEL_REQUEST:
        case ActionTypes.MAIL_BUSINESS_CASE_APPROVEL_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    isLoading: true,
                    updateStatus: false,
                    assignSuccessStatus: false,
                    items: [],
                    addEditLeadsResponse: null,
                    approvalBizProcessStatus: false,
                    emailApprovalStatus: null,
                    leadsConversion: null,
                    errors:null,
                    resLeadData:null
                }
            }

            case ActionTypes.CLEAR_BUSINESS_REQUEST:                
            {
                return {
                    ...state,
                    loading: true,
                    isLoading: true,
                    errors:null
                }
            }

            
            case ActionTypes.GET_CUSTOMER_AND_BUSINESS_REQUEST:              
            {
                return {
                    ...state,
                    loading: true,
                    isLoading: true,
                    errors:null,
                    getCustomerandBusiness:null,
                }
            }

        case ActionTypes.IMAGE_DELETE_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    isLoading: true,
                    errors:null
                }
            }

        case BizCaseSLATypes.GET_BIZCASE_CHART_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    isLoading: true,
                    getBizCaseSetupChart: null,
                    errors:null
                }
            }
        case ActionTypes.LEADS_CONVERSION_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    isLoading: true,
                    errors:null
                }
            }
        case ActionTypes.RESEND_MAIL_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    isLoading: true,
                    errors:null
                }
            }
        case ActionTypes.GET_DEPARTMENT_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    isLoading: true,
                    errors:null,                    
                    getDepartmentList: null,
                }
            }
        case ActionTypes.GET_STEPPER_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    isLoading: true,
                    errors:null
                }
            }
        case ActionTypes.GET_DEPARTMENT_SUCCESS:
            {
                const { payload } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    isLoading: false,
                    getDepartmentList: payload.data,
                    errors:null
                }
            }
        case BizCaseSLATypes.GET_BIZCASE_CHART_SUCCESS:
            {
                const { payload, getBizCaseSetupChart } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload.data,
                    isLoading: false,
                    getBizCaseSetupChart: getBizCaseSetupChart,
                    errors:null
                }
            }
        case ActionTypes.GET_STEPPER_SUCCESS:
            {
                const { payload } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    isLoading: false,
                    getStepperData: payload.data,
                    errors:null
                }
            }
        case ActionTypes.IMAGE_DELETE_SUCCESS:
            {
                const { payload } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    isLoading: false,
                    errors:null
                }
            }
        case ActionTypes.LEADS_CONVERSION_SUCCESS:
            {
                const { payload } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    isLoading: false,
                    leadsConversion: payload.data,
                    errors:null
                }
            }
        case ActionTypes.RESEND_MAIL_SUCCESS:
            {
                const { payload } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    isLoading: false,
                    errors:null
                }
            }
        case ActionTypes.GET_LEADS_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    isLoading: true,
                    updateStatus: false,
                    assignSuccessStatus: false,
                    getLeadsEditResponse: null,
                    errors:null
                }
            }
        case ActionTypes.CLEAR_BUSINESS_SUCCESS:
            {
                return initialState;
            }
        case ActionTypes.GET_LEADS_DATA_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    isLoading: true,
                    updateStatus: false,
                    getLeadsEditResponse: null,
                    getLeadsEditResponseState: false,
                    errors:null
                }
            }
        case ActionTypes.GET_LEADS_SUCCESS:
            {
                const { payload, responseData, tableData } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    isLoading: false,
                    leadsResponse: responseData,
                    businessGridData: tableData,
                    totalElements: responseData.totalElements,
                    totalPages: responseData.totalPages,
                    pageSize: responseData.size,
                    addEditLeadsResponse: null,
                    errors:null
                }
            }
        case ActionTypes.GET_BUSINESS_CASE_SUCCESS:
            {
                const { payload, responseData, tableData } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    isLoading: false,
                    businessCasedReqResponse: responseData,
                    businessCasedReqData: tableData,
                    totalElements: responseData.totalElements,
                    totalPages: responseData.totalPages,
                    pageSize: responseData.size,
                    errors:null
                }
            }
        case ActionTypes.ADD_LEADS_SUCCESS:
            {
                const { payload } = action
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    isLoading: false,
                    leadsResponse: "",
                    resLeadData:payload,
                    addEditLeadsResponse: payload,
                    errors:null
                }
            }
        case ActionTypes.GET_LEADS_DATA_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    isLoading: false,
                    leadsResponse: "",
                    getLeadsEditResponse: payload.data,
                    getLeadsEditResponseState: true,
                    errors:null
                }
            }
        case ActionTypes.BUSINESS_CASE_APPROVEL_SUCCESS:
        case ActionTypes.MAIL_BUSINESS_CASE_APPROVEL_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    isLoading: false,
                    approvalBizProcessStatus: true,
                    emailApprovalStatus: payload,
                    errors:null
                }
            }
        case ActionTypes.ASSIGN_PROJECT_SUCCESS:
            {
                const { payload, assignSuccess } = action.payload
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    isLoading: false,
                    leadsResponse: "",
                    assignSuccess: assignSuccess,
                    assignSuccessStatus: true,
                    errors:null
                }
            }
        case ActionTypes.UPDATE_LEADS_DATA_SUCCESS:
            {
                const { payload } = action.payload
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    isLoading: false,
                    leadsResponse: "",
                    updateStatus: true,
                    addEditLeadsResponse: payload,
                    errors:null
                }
            }
        case ActionTypes.GET_USERDETAILS_SUCCESS:
            {
                const { payload, getUserData } = action.payload
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    isLoading: false,
                    getUserDateList: getUserData,
                    getEmployeeList:payload,
                    errors:null
                }
            }
        case ActionTypes.GET_LEADS_ERROR:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    isLoading: false,
                    errors: payload,
                    items: [],
                    leadsResponse: null,
                    businessGridData: null,
                    totalElements: 0,
                    totalPages: 0,
                    pageSize: 0,
                    getLeadsEditResponse: null,
                    getLeadsEditResponseState: false
                }
            }

            case ActionTypes.GET_CUSTOMER_AND_BUSINESS_SUCCESS:
                {
                    const { getCustomerandBusiness, payload } = action.payload;
                    return {
                        ...state,
                        loading: false,
                        items: payload,
                        isLoading: false,
                        getCustomerandBusiness: getCustomerandBusiness,
                        errors:null
                    }
                }
        case ActionTypes.ADD_LEADS_ERROR:
        case ActionTypes.GET_USERDETAILS_ERROR:
        case ActionTypes.ASSIGN_PROJECT_ERROR:
        case ActionTypes.GET_LEADS_DATA_ERROR:
        case ActionTypes.UPDATE_LEADS_DATA_ERROR:
        case ActionTypes.GET_BUSINESS_CASE_ERROR:
        case ActionTypes.BUSINESS_CASE_APPROVEL_ERROR:
        case ActionTypes.MAIL_BUSINESS_CASE_APPROVEL_ERROR:
        case ActionTypes.IMAGE_DELETE_ERROR:
        case ActionTypes.RESEND_MAIL_ERROR:
        case ActionTypes.LEADS_CONVERSION_ERROR:
        case ActionTypes.GET_DEPARTMENT_ERROR:
        case ActionTypes.GET_STEPPER_ERROR:
        case BizCaseSLATypes.GET_BIZCASE_CHART_FAILURE:
            case ActionTypes.GET_CUSTOMER_AND_BUSINESS_ERROR:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    isLoading: false,
                    errors: payload,
                    items: [],
                    assignSuccessStatus: false,
                    addEditLeadsResponse: null,
                    approvalBizProcessStatus: false,
                    emailApprovalStatus: null,
                    leadsConversion: null,
                    getCustomerandBusiness:null
                }
            }

        default: {
            return state
        }
    }
}

export { reducer as BusinessProcess }