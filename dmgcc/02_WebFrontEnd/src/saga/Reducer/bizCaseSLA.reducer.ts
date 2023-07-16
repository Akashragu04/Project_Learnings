import { BizCaseSLATypes } from '../sagas/Types';
import { Reducer } from 'redux'
import { SLAActionTypes } from '../Types/SLA.Types';

// Type-safe initialState!
const defaultObj: any = {}
export const initialState: any = {
    items: [],
    loading: false,
    isLoading: false,
    errors: {},
    response: {},
    bizCaseSLAResponse: [],
    bizCaseSLAGridData: [],
    totalElements: 0,
    totalPages: 10,
    pageSize: 10,
    getCustomerList: [],
    getMaterialList: [],
    resTermsFileUpload: null,
    resAttachmentsFileUpload: null,
    slaBillingCycleList: null,
    getPerinvoiceData: null,
    getProjectSLAData: null,
    OrganizationData: null,
    BillingcycleData: null,
    createSLAResponse: null,
    updateSLAResponse: null,
    updateSLAContractResponse: {},
    setC4DSLAResponse: {},
    C4DSLADetailResponse: null,
    resMaterialDescription:null,
    resCountryList:null,
    resContractOption:null,
    resTariffSheetMaterial:null,    
    resStatusTermsFileUpload: null,
    resStatusAttachmentsFileUpload: null,
    slaApprovalSuccess:null,
    resSLAApproval:null
}

const reducer: Reducer<any> = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case BizCaseSLATypes.INIT_BIZCASE_SLA:
            return {
                ...state, loading: false, isLoading: false, items: [], response: defaultObj, createSLAResponse: null,
                updateSLAResponse: null, updateSLAContractResponse: {}, setC4DSLAResponse: {}, C4DSLADetailResponse: null
            }

            case BizCaseSLATypes.CLEAR_BIZ_SLA_REQUEST:
                return initialState;
                
        case BizCaseSLATypes.GET_ALL_BIZCASE_SLA_DETAILS:
        case SLAActionTypes.POST_PER_INVOICE_REQUEST:
            return { ...state, isLoading: true, items: [] }
        case SLAActionTypes.TERMS_CONDITION_UPLOAD_REQUEST:
            return { ...state, isLoading: true, items: [], resTermsFileUpload: null, resStatusTermsFileUpload:null }

        case SLAActionTypes.GET_ORGANIZATION_REQUEST:
            return { ...state, isLoading: true, items: [], OrganizationData: null }

        case SLAActionTypes.GET_BILLING_CYCLE_REQUEST:
            return { ...state, isLoading: true, items: [], BillingcycleData: null }

        case SLAActionTypes.GET_PROJECT_SLA_DETAILS_REQUEST:
            return { ...state, isLoading: true, items: [], getProjectSLAData: null, resMaterialDescription:null }

        case SLAActionTypes.SLA_UPLOAD_REQUEST:
            return { ...state, isLoading: true, items: [], resAttachmentsFileUpload: null, resStatusAttachmentsFileUpload:null }

        case SLAActionTypes.GET_PER_INVOICE_REQUEST:
            return { ...state, isLoading: true, items: [], getPerinvoiceData: null }

            
        case SLAActionTypes.GET_MATERIAL_DESCRIPTION_REQUEST:
            return { ...state, isLoading: true, items: [], resMaterialDescription: null }

            
        case SLAActionTypes.GET_MATERIAL_DESCRIPTION_SUCCESS:
            {
                const { payload } = action.payload;
                return {
                    ...state, loading: false,
                    items: payload,
                    isLoading: false,
                    resMaterialDescription: payload.data,
                 
                }
            }

                      
        case SLAActionTypes.GET_TARIFF_SHEET_MATERIAL_DESCRIPTION_REQUEST:
            return { ...state, isLoading: true, items: [], resTariffSheetMaterial: null }

            
        case SLAActionTypes.GET_TARIFF_SHEET_MATERIAL_DESCRIPTION_SUCCESS:
            {
                const { payload } = action.payload;
                return {
                    ...state, loading: false,
                    items: payload,
                    isLoading: false,
                    resTariffSheetMaterial: payload.data,
                 
                }
            }

            case SLAActionTypes.GET_TARIFF_SHEET_MATERIAL_DESCRIPTION_ERROR:
                {
                    const { payload } = action;
                    return {
                        ...state,
                        loading: false,
                        errors: payload,
                        resTariffSheetMaterial: null,
                        items: [],
                    }
                }

            case SLAActionTypes.GET_COUNTRY_LIST_REQUEST:
                return { ...state, isLoading: true, items: [], resCountryList: null }
    
                
            case SLAActionTypes.GET_COUNTRY_LIST_SUCCESS:
                {
                    const { payload } = action.payload;
                    return {
                        ...state, loading: false,
                        items: payload,
                        isLoading: false,
                        resCountryList: payload.data,
                     
                    }
                }
                
                case SLAActionTypes.GET_CONTRACT_OPITION_ERROR:
                    {
                        const { payload } = action;
                        return {
                            ...state,
                            loading: false,
                            errors: payload,
                            resCountryList: null,
                            items: [],
                        }
                    }

                    case BizCaseSLATypes.SLA_APPROVAL_STATUS_REQUEST:
                        return { ...state, isLoading: true, items: [], resSLAApproval: null }
            
                        
                    case BizCaseSLATypes.SLA_APPROVAL_STATUS_SUCCESS:
                        {
                            const { payload, resSLAApproval } = action.payload;
                            return {
                                ...state, loading: false,
                                items: payload,
                                isLoading: false,
                                resSLAApproval: resSLAApproval,
                             
                            }
                        }
                        
                        case BizCaseSLATypes.SLA_APPROVAL_STATUS_ERROR:
                            {
                                const { payload } = action;
                                return {
                                    ...state,
                                    loading: false,
                                    errors: payload,
                                    resSLAApproval: null,
                                    items: [],
                                }
                            }

        case SLAActionTypes.GET_CONTRACT_OPITION_REQUEST:
            return { ...state, isLoading: true, items: [], resContractOption: null }

            
        case SLAActionTypes.GET_CONTRACT_OPITION_SUCCESS:
            {
                const { payload } = action.payload;
                return {
                    ...state, loading: false,
                    items: payload,
                    isLoading: false,
                    resContractOption: payload.data,
                 
                }
            }
                
            case SLAActionTypes.GET_COUNTRY_LIST_ERROR:
                {
                    const { payload } = action;
                    return {
                        ...state,
                        loading: false,
                        errors: payload,
                        resContractOption: null,
                        items: [],
                    }
                }

                case SLAActionTypes.GET_CURRENCY_LIST_REQUEST:
                    return { ...state, isLoading: true, items: [], resCurrencyList: null }
        
                    
                case SLAActionTypes.GET_CURRENCY_LIST_SUCCESS:
                    {
                        const { payload } = action.payload;
                        return {
                            ...state, loading: false,
                            items: payload,
                            isLoading: false,
                            resCurrencyList: payload.data,
                         
                        }
                    }
                        
                    case SLAActionTypes.GET_CURRENCY_LIST_ERROR:
                        {
                            const { payload } = action;
                            return {
                                ...state,
                                loading: false,
                                errors: payload,
                                resCurrencyList: null,
                                items: [],
                            }
                        }

        case SLAActionTypes.BILLING_CYCLE_DROPDOWN_REQUEST:
            return { ...state, isLoading: true, items: [], slaBillingCycleList: null }

        case BizCaseSLATypes.GET_ALL_BIZCASE_SLA_DETAILS_SUCCESS:
            {
                const { payload, responseData, tableData } = action.data;
                return {
                    ...state, loading: false,
                    items: payload,
                    isLoading: false,
                    bizCaseSLAResponse: responseData,
                    bizCaseSLAGridData: tableData,
                    totalElements: responseData.totalElements,
                    totalPages: responseData.totalPages,
                    pageSize: responseData.size,
                }
            }
        case BizCaseSLATypes.GET_ALL_BIZCASE_SLA_DETAILS_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case BizCaseSLATypes.CREATE_BIZCASE_SLA:
            return { ...state, loading: true, createSLAResponse: null }
        case BizCaseSLATypes.CREATE_BIZCASE_SLA_REQUEST_SUCCESS:
            {
                const { payload } = action.payload
                return { ...state, loading: false, createSLAResponse: payload }
            }
        case BizCaseSLATypes.CREATE_BIZCASE_SLA_REQUEST_FAILURE:{
            return { ...state, loading: false, errors: action.payload, createSLAResponse:action.payload}}
        case BizCaseSLATypes.UPDATE_BIZCASE_SLA_DETAILS:
            return { ...state, loading: true, updateSLAResponse: null }
        case BizCaseSLATypes.UPDATE_BIZCASE_SLA_DETAILS_SUCCESS:
            {
                const { payload } = action.payload
                return { ...state, loading: false, updateSLAResponse: payload }
            }
        case BizCaseSLATypes.UPDATE_BIZCASE_SLA_DETAILS_FAILURE:{
            return { ...state, loading: false, errors: action.payload, updateSLAResponse:action.payload }}

        case BizCaseSLATypes.GET_BIZCASE_C4DSLA_DETAILS:
            return { ...state, loading: true, C4DSLADetailResponse: {} }
        case BizCaseSLATypes.GET_BIZCASE_C4DSLA_DETAILS_SUCCESS:
            return { ...state, loading: false, C4DSLADetailResponse: response }
        case BizCaseSLATypes.GET_BIZCASE_C4DSLA_DETAILS_FAILURE:
            return { ...state, loading: false, errors: action.error, C4DSLADetailResponse: action.error }
        case BizCaseSLATypes.SET_BIZCASE_C4DSLA_REQUEST:
            return { ...state, loading: true, setC4DSLAResponse: {} }
        case BizCaseSLATypes.SET_BIZCASE_C4DSLA_REQUEST_SUCCESS:
            return { ...state, loading: false, setC4DSLAResponse: response }
        case BizCaseSLATypes.SET_BIZCASE_C4DSLA_REQUEST_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case BizCaseSLATypes.UPDATE_BIZCASE_SLA_CONTRACT_DETAILS:
            return { ...state, loading: true, updateSLAContractResponse: {} }
        case BizCaseSLATypes.UPDATE_BIZCASE_SLA_CONTRACT_SUCCESS:
            {
                const { payload } = action.data
                return { ...state, loading: false, updateSLAContractResponse: payload }
            }
        case BizCaseSLATypes.UPDATE_BIZCASE_SLA_CONTRACT_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case BizCaseSLATypes.GET_BIZCASE_SLA_CUSTOMER_DETAILS:
            return { ...state, loading: true, response: defaultObj }
        case BizCaseSLATypes.GET_BIZCASE_SLA_CUSTOMER_DETAILS_SUCCESS:
            {
                const { payload } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    getCustomerList: payload.data
                }
            }

        case SLAActionTypes.TERMS_CONDITION_UPLOAD_SUCCESS:
            {
                const { payload, resTermsFileUpload } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    resTermsFileUpload: resTermsFileUpload,
                    resStatusTermsFileUpload:null
                }
            }

        case SLAActionTypes.SLA_UPLOAD_SUCCESS:
            {
                const { payload, resAttachmentsFileUpload } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    resAttachmentsFileUpload: resAttachmentsFileUpload,
                    resStatusAttachmentsFileUpload:null
                }
            }

        case SLAActionTypes.BILLING_CYCLE_DROPDOWN_SUCCESS:
            {
                const { payload, slaBillingCycleList } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    slaBillingCycleList: slaBillingCycleList
                }
            }

        case SLAActionTypes.GET_PER_INVOICE_SUCCESS:
            {
                const { payload, getSlaInfo } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    getPerinvoiceData: getSlaInfo
                }
            }

        case SLAActionTypes.GET_PROJECT_SLA_DETAILS_SUCCESS:
            {
                const { payload, getProjectSLAData } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    getProjectSLAData: getProjectSLAData
                }
            }


        case SLAActionTypes.GET_BILLING_CYCLE_SUCCESS:
            {
                const { payload, BillingcycleData } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    BillingcycleData: BillingcycleData
                }
            }

        case SLAActionTypes.GET_ORGANIZATION_SUCCESS:
            {
                const { payload, OrganizationData } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    OrganizationData: OrganizationData
                }
            }
        case BizCaseSLATypes.GET_BIZCASE_SLA_CUSTOMER_DETAILS_FAILURE:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    getCustomerList: [],
                    items: []
                }
            }
        case BizCaseSLATypes.GET_BIZCASE_SLA_COSTCENTER_DETAILS:
            return { ...state, loading: true, response: defaultObj }
        case BizCaseSLATypes.GET_BIZCASE_SLA_COSTCENTER_DETAILS_SUCCESS:
            {
                const { payload } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    getCostcenterList: payload.data
                }
            }
        case BizCaseSLATypes.GET_BIZCASE_SLA_COSTCENTER_DETAILS_FAILURE:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    getCostcenterList: [],
                    items: []
                }
            }
        case BizCaseSLATypes.GET_BIZCASE_SLA_MATERIAL_DESC_DETAILS:
            return { ...state, loading: true, response: defaultObj }
        case BizCaseSLATypes.GET_BIZCASE_SLA_MATERIAL_DESC_DETAILS_SUCCESS:
            {
                const { payload } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    getMaterialList: payload.data
                }
            }
        case BizCaseSLATypes.GET_BIZCASE_SLA_MATERIAL_DESC_DETAILS_FAILURE:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    getMaterialList: [],
                    items: []
                }
            }
        case BizCaseSLATypes.GET_BIZCASE_SLA_EDIT_DETAILS: {
            return { ...state, loading: true, getSLAEditDetails: null, resTermsFileUpload:null, 
                resAttachmentsFileUpload: null, resStatusAttachmentsFileUpload:null, resStatusTermsFileUpload:null }
        }
        case BizCaseSLATypes.GET_BIZCASE_SLA_EDIT_DETAILS_SUCCESS:
            {
                const { payload, getSlaEditData } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    getSLAEditDetails: getSlaEditData
                }
            }
            
        case SLAActionTypes.SLA_UPLOAD_ERROR:
            {
                const { payload } = action;
                return{
                    ...state,
                    loading: false,
                    errors: payload,
                    resStatusAttachmentsFileUpload:payload.payload,
                }
            }
            case SLAActionTypes.TERMS_CONDITION_UPLOAD_ERROR:
                {
                    const { payload } = action;
                    return{
                        loading: false,
                        errors: payload,
                        resStatusTermsFileUpload:payload.payload,
                    }
                }
        case BizCaseSLATypes.GET_BIZCASE_SLA_EDIT_DETAILS_FAILURE:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    getSLAEditDetails: null,
                    items: []
                }
                }

        case SLAActionTypes.GET_PER_INVOICE_ERROR:
            case SLAActionTypes.GET_MATERIAL_DESCRIPTION_ERROR:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    getSLAEditDetails: null,
                    items: [],
                    resTermsFileUpload: null,
                    resAttachmentsFileUpload: null,
                    slaBillingCycleList: null,
                    getPerinvoiceData: null,
                    resMaterialDescription: null
                }
            }
            case SLAActionTypes.SENT_MAIL_SLA_REQUEST:
                return { ...state, isLoading: true, items: [], slaApprovalSuccess: null, errors:null }
            
        case SLAActionTypes.SENT_MAIL_SLA_SUCCESS:
            {
                const { payload, slaApprovalSuccess } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    slaApprovalSuccess: slaApprovalSuccess
                }
            }

        case SLAActionTypes.SENT_MAIL_SLA_ERROR:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    items: null,
                    slaApprovalSuccess: null,
                    errors: payload,
                }
            }


        default: {
            return state
        }
    }
}

export { reducer as businessCaseSLA }
