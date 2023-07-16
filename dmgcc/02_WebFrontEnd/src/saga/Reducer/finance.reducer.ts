import { FinanceProcessTypes } from '../sagas/Types';

// Type-safe initialState!
// const defaultObj: any = {}
export const initialState: any = {
    items: [],
    loading: false,
    isLoading: false,
    errors: {},
    rateCardListResponse: [],
    rateCardGridData: [],
    accuralsListResponse: [],
    accuralsGridData: [],
    costCenterYTDListResponse: [],
    costCenterYTDGridData: [],
    entityMasterListResponse: [],
    entityMasterGridData: [],
    materialMasterListResponse: [],
    materialMasterGridData: [],
    totalElements: 0,
    totalPages: 10,
    pageSize: 10,
    accuralsResponse: {},
    accuralsUpdateResponse: {},
    accuralsUploadResponse: {},
    accuralsDownloadResponse: {},
    response: {},
    updateResponse: {},
    costCenterResponse: {},
    costCenterYTDUploadResponse: {},
    entityResponse: {},
    entityUpdateResponse: {},
    entityUploadResponse: {},
    materialResponse: {},
    materialUpdateResponse: {},
    materialUploadResponse: {},
    provisionsCostCenter: [],
    provisionsStatus: [],
    provisionsResponse: {},
    provisionsUpdateResponse: {},
    provisionsConditionalAddResponse: {},
    provisionsChartResponse: {},
    provisionsArchieveResponse: {},
    provisionsDownloadResponse: {},
    slaContractsResponse: [],
    slaCountrysResponse: [],
    getRateCard:null
}

export const finance: any = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case FinanceProcessTypes.INIT_FINANCE_RATECARD:
            return {
                ...state, loading: false, isLoading: false, items: [],
                response: {}, updateResponse: {}
            }
        case FinanceProcessTypes.INIT_FINANCE_UPDATE_RATECARD_RESET:
            return {
                ...state, loading: false, isLoading: false, response: {}, updateResponse: {}
            }
        case FinanceProcessTypes.GET_ALL_FINANCE_RATECARD_DETAILS:
            return { ...state, isLoading: true, items: [] }
        case FinanceProcessTypes.GET_ALL_FINANCE_RATECARD_DETAILS_SUCCESS:
            {
                const { payload, responseData, tableData } = action.data;
                return {
                    ...state, loading: false,
                    items: payload,
                    isLoading: false,
                    rateCardListResponse: responseData,
                    rateCardGridData: tableData,
                    totalElements: responseData.totalElements,
                    totalPages: responseData.totalPages,
                    pageSize: responseData.size,
                }
            }
        case FinanceProcessTypes.GET_ALL_FINANCE_RATECARD_DETAILS_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case FinanceProcessTypes.UPDATE_FINANCE_RATECARD_REQUEST:
            return { ...state, isLoading: true, updateResponse: {} }
        case FinanceProcessTypes.UPDATE_FINANCE_RATECARD_REQUEST_SUCCESS:
            return { ...state, isLoading: false, updateResponse: response }
        case FinanceProcessTypes.UPDATE_FINANCE_RATECARD_REQUEST_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case FinanceProcessTypes.GET_FINANCE_RATECARD_DETAILS:
            return { ...state, isLoading: true, getRateCard: null }
        case FinanceProcessTypes.GET_FINANCE_RATECARD_DETAILS_SUCCESS:
            return { ...state, isLoading: false, getRateCard: response }
        case FinanceProcessTypes.GET_FINANCE_RATECARD_DETAILS_FAILURE:
            return { ...state, isLoading: false, errors: action.error, getRateCard:null }
            case FinanceProcessTypes.CLEAR_FINANCE_REQUEST: {
                return {
                    getRateCard: null
                }
            }
        default: {
            return state
        }
    }
}

export const financeAccurals: any = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case FinanceProcessTypes.INIT_FINANCE_ACCURALS:
            return {
                ...state, loading: false, isLoading: false, items: [], accuralsUpdateResponse: {},
                accuralsResponse: {}, accuralsUploadResponse: {}, accuralsDownloadResponse: {}
            }
        case FinanceProcessTypes.INIT_FINANCE_ACCURALS_FILE_REQUEST:
            return {
                ...state, loading: false, isLoading: false, accuralsUpdateResponse: {},
                accuralsResponse: {}, accuralsUploadResponse: {}, accuralsDownloadResponse: {}
            }
        case FinanceProcessTypes.GET_ALL_FINANCE_ACCURALS_DETAILS:
            return {
                ...state, isLoading: true, items: [], accuralsListResponse: [], accuralsGridData: [],
            }
        case FinanceProcessTypes.GET_ALL_FINANCE_ACCURALS_DETAILS_SUCCESS:
            {
                const { payload, responseData, tableData } = action.data;
                return {
                    ...state, loading: false,
                    items: payload,
                    isLoading: false,
                    accuralsListResponse: responseData,
                    accuralsGridData: tableData,
                    totalElements: responseData.totalElements,
                    totalPages: responseData.totalPages,
                    pageSize: responseData.size,
                }
            }
        case FinanceProcessTypes.GET_ALL_FINANCE_ACCURALS_DETAILS_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case FinanceProcessTypes.GET_FINANCE_ACCURALS_DETAILS_RESPONSE:
            return {
                ...state, isLoading: true, accuralsUpdateResponse: {}, accuralsResponse: {}, accuralsUploadResponse: {},
                accuralsDownloadResponse: {}
            }
        case FinanceProcessTypes.GET_FINANCE_ACCURALS_DETAILS_SUCCESS:
            return { ...state, isLoading: false, accuralsResponse: response, accuralsUpdateResponse: {} }
        case FinanceProcessTypes.GET_FINANCE_ACCURALS_DETAILS_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case FinanceProcessTypes.UPDATE_ACCURALS_DETAILS_REQUEST:
            return { ...state, isLoading: true, accuralsUpdateResponse: {} }
        case FinanceProcessTypes.UPDATE_ACCURALS_DETAILS_SUCCESS:
            return { ...state, isLoading: false, accuralsUpdateResponse: response }
        case FinanceProcessTypes.UPDATE_ACCURALS_DETAILS_FAILURE:
            return { ...state, isLoading: true, errors: action.error, accuralsUpdateResponse: {} }
        case FinanceProcessTypes.SET_ACCURAL_UPLOAD_FILE_SUCCESS:
            return { ...state, isLoading: false, accuralsUploadResponse: response }
        case FinanceProcessTypes.SET_ACCURAL_UPLOAD_FILE_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case FinanceProcessTypes.DOWNLOAD_ACCURAL_DETAILS_REQUEST:
            return { ...state, isLoading: true, accuralsDownloadResponse: {} }
        case FinanceProcessTypes.DOWNLOAD_ACCURAL_DETAILS_REQUEST_SUCCESS:
            return { ...state, isLoading: false, accuralsDownloadResponse: response }
        case FinanceProcessTypes.DOWNLOAD_ACCURAL_DETAILS_REQUEST_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        default: {
            return state
        }
    }
}

export const financeCostCenterYTD: any = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case FinanceProcessTypes.INIT_FINANCE_COST_CENTER_YTD:
            return {
                ...state, loading: false, isLoading: false, items: [], costCenterYTDUploadResponse: {},
                costCenterResponse: {}
            }
        case FinanceProcessTypes.GET_ALL_FINANCE_COST_CENTER_YTD_DETAILS:
            return { ...state, isLoading: true, items: [] }
        case FinanceProcessTypes.GET_ALL_FINANCE_COST_CENTER_YTD_SUCCESS:
            {
                const { payload, responseData, tableData } = action.data;
                return {
                    ...state, loading: false,
                    items: payload,
                    isLoading: false,
                    costCenterYTDListResponse: responseData,
                    costCenterYTDGridData: tableData,
                    totalElements: responseData.totalElements,
                    totalPages: responseData.totalPages,
                    pageSize: responseData.size,
                }
            }
        case FinanceProcessTypes.GET_ALL_FINANCE_COST_CENTER_YTD_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case FinanceProcessTypes.GET_FINANCE_COST_CENTER_YTD_DETAILS:
            return { ...state, isLoading: true, costCenterResponse: {} }
        case FinanceProcessTypes.GET_FINANCE_COST_CENTER_YTD_SUCCESS:
            return { ...state, isLoading: false, costCenterResponse: response }
        case FinanceProcessTypes.GET_FINANCE_COST_CENTER_YTD_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case FinanceProcessTypes.SET_COSTCENTER_YTD_UPLOAD_REQUEST:
            return { ...state, loading: true, costCenterYTDUploadResponse: {} }
        case FinanceProcessTypes.SET_COSTCENTER_YTD_UPLOAD_SUCCESS:
            return { ...state, loading: false, costCenterYTDUploadResponse: response }
        case FinanceProcessTypes.SET_COSTCENTER_YTD_UPLOAD_FAILURE:
            return { ...state, loading: false, errors: action.error }
        default: {
            return state
        }
    }
}

export const financeEntityMaster: any = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case FinanceProcessTypes.INIT_FINANCE_ENTITYMASTER:
            return {
                ...state, loading: false, isLoading: false, items: [], entityResponse: {},
                entityUpdateResponse: {}, entityUploadResponse: {}
            }
        case FinanceProcessTypes.GET_ALL_FINANCE_ENTITYMASTER_DETAILS:
            return { ...state, isLoading: true, items: [] }
        case FinanceProcessTypes.GET_ALL_FINANCE_ENTITYMASTER_SUCCESS:
            {
                const { payload, responseData, tableData } = action.data;
                return {
                    ...state, loading: false,
                    items: payload,
                    isLoading: false,
                    entityMasterListResponse: responseData,
                    entityMasterGridData: tableData,
                    totalElements: responseData.totalElements,
                    totalPages: responseData.totalPages,
                    pageSize: responseData.size,
                }
            }
        case FinanceProcessTypes.GET_ALL_FINANCE_ENTITYMASTER_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case FinanceProcessTypes.CREATE_ENTITY_MASTER_REQUEST:
            return { ...state, loading: true, entityResponse: {} }
        case FinanceProcessTypes.CREATE_ENTITY_MASTER_REQUEST_SUCCESS:
            return { ...state, loading: false, entityResponse: response }
        case FinanceProcessTypes.CREATE_ENTITY_MASTER_REQUEST_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case FinanceProcessTypes.UPDATE_ENTITY_MASTER_REQUEST:
            return { ...state, loading: true, entityUpdateResponse: {} }
        case FinanceProcessTypes.UPDATE_ENTITY_MASTER_REQUEST_SUCCESS:
            return { ...state, loading: false, entityUpdateResponse: response }
        case FinanceProcessTypes.UPDATE_ENTITY_MASTER_REQUEST_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case FinanceProcessTypes.SET_ENTITYMASTER_UPLOAD_REQUEST:
            return { ...state, loading: true, entityUploadResponse: {} }
        case FinanceProcessTypes.SET_ENTITYMASTER_UPLOAD_SUCCESS:
            return { ...state, loading: false, entityUploadResponse: response }
        case FinanceProcessTypes.SET_ENTITYMASTER_UPLOAD_FAILURE:
            return { ...state, loading: false, errors: action.error }
        default: {
            return state
        }
    }
}

export const financeMaterialMaster: any = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case FinanceProcessTypes.INIT_FINANCE_MATERIALMASTER:
            return {
                ...state, loading: false, isLoading: false, items: [], materialResponse: {},
                materialUpdateResponse: {}, materialUploadResponse: {}, slaContractsResponse: []
            }
        case FinanceProcessTypes.GET_ALL_FINANCE_MATERIALMASTER_DETAILS:
            return { ...state, isLoading: true, items: [] }
        case FinanceProcessTypes.GET_ALL_FINANCE_MATERIALMASTER_SUCCESS:
            {
                const { payload, responseData, tableData } = action.data;
                return {
                    ...state, loading: false,
                    items: payload,
                    isLoading: false,
                    materialMasterListResponse: responseData,
                    materialMasterGridData: tableData,
                    totalElements: responseData.totalElements,
                    totalPages: responseData.totalPages,
                    pageSize: responseData.size,
                }
            }
        case FinanceProcessTypes.GET_ALL_FINANCE_MATERIALMASTER_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case FinanceProcessTypes.CREATE_MATERIAL_MASTER_REQUEST:
            return { ...state, loading: true, materialResponse: {} }
        case FinanceProcessTypes.CREATE_MATERIAL_MASTER_REQUEST_SUCCESS:
            return { ...state, loading: false, materialResponse: response }
        case FinanceProcessTypes.CREATE_MATERIAL_MASTER_REQUEST_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case FinanceProcessTypes.UPDATE_MATERIAL_MASTER_REQUEST:
            return { ...state, loading: true, materialUpdateResponse: {} }
        case FinanceProcessTypes.UPDATE_MATERIAL_MASTER_REQUEST_SUCCESS:
            return { ...state, loading: false, materialUpdateResponse: response }
        case FinanceProcessTypes.UPDATE_MATERIAL_MASTER_REQUEST_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case FinanceProcessTypes.SET_MATERIALMASTER_UPLOAD_REQUEST:
            return { ...state, loading: true, materialUploadResponse: {} }
        case FinanceProcessTypes.SET_MATERIALMASTER_UPLOAD_SUCCESS:
            return { ...state, loading: false, materialUploadResponse: response }
        case FinanceProcessTypes.SET_MATERIALMASTER_UPLOAD_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case FinanceProcessTypes.GET_SLA_CONTRACTS_LIST_DETAILS:
            return { ...state, loading: true, slaContractsResponse: [] }
        case FinanceProcessTypes.GET_SLA_CONTRACTS_LIST_SUCCESS:
            return { ...state, loading: false, slaContractsResponse: response.data }
        case FinanceProcessTypes.GET_SLA_CONTRACTS_LIST_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case FinanceProcessTypes.GET_SLA_COUNTRYS_LIST_DETAILS:
            return { ...state, loading: true, slaCountrysResponse: [] }
        case FinanceProcessTypes.GET_SLA_COUNTRYS_LIST_SUCCESS:
            return { ...state, loading: false, slaCountrysResponse: response.data }
        case FinanceProcessTypes.GET_SLA_COUNTRYS_LIST_FAILURE:
            return { ...state, loading: false, errors: action.error }
        default: {
            return state
        }
    }
}

export const financeProvisions: any = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case FinanceProcessTypes.INIT_PROVISIONS_ACTION:
            return {
                ...state, loading: false, isLoading: false, items: [], provisionsCostCenter: [],
                provisionsStatus: [], provisionsResponse: {}, provisionsUpdateResponse: {}, provisionsConditionalAddResponse: {},
                provisionsChartResponse: {}, provisionsArchieveResponse: {}, provisionsDownloadResponse: {}
            }
        case FinanceProcessTypes.INIT_PROVISIONS_UPDATE_ACTION:
            return {
                ...state, loading: false, isLoading: false, items: [], provisionsResponse: {}, provisionsUpdateResponse: {},
                provisionsConditionalAddResponse: {}, provisionsArchieveResponse: {}, provisionsDownloadResponse: {}
            }
        case FinanceProcessTypes.GET_PROVISIONS_COSTCENTER_REQUEST:
            return { ...state, loading: true, provisionsCostCenter: [] }
        case FinanceProcessTypes.GET_PROVISIONS_COSTCENTER_SUCCESS:
            return { ...state, loading: false, provisionsCostCenter: response.data }
        case FinanceProcessTypes.GET_PROVISIONS_COSTCENTER_FAILURE:
            return { ...state, loading: false, errors: action.error, provisionsCostCenter: [] }
        case FinanceProcessTypes.GET_PROVISIONS_STATUS_REQUEST:
            return { ...state, loading: true, provisionsStatus: [] }
        case FinanceProcessTypes.GET_PROVISIONS_STATUS_SUCCESS:
            return { ...state, loading: false, provisionsStatus: response.data }
        case FinanceProcessTypes.GET_PROVISIONS_STATUS_FAILURE:
            return { ...state, loading: false, errors: action.error, provisionsStatus: [] }
        case FinanceProcessTypes.GET_PROVISIONS_FILTER_REQUEST:
            return { ...state, loading: true, provisionsResponse: {} }
        case FinanceProcessTypes.GET_PROVISIONS_FILTER_SUCCESS:
            return { ...state, loading: false, provisionsResponse: response }
        case FinanceProcessTypes.GET_PROVISIONS_FILTER_FAILURE:
            return { ...state, loading: false, errors: action.error, provisionsResponse: {} }
        case FinanceProcessTypes.UPDATE_PROVISIONS_DATA_REQUEST:
            return { ...state, isLoading: true, provisionsUpdateResponse: {} }
        case FinanceProcessTypes.UPDATE_PROVISIONS_DATA_SUCCESS:
            return { ...state, isLoading: false, provisionsUpdateResponse: response }
        case FinanceProcessTypes.UPDATE_PROVISIONS_DATA_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case FinanceProcessTypes.CHECK_ADD_PROVISIONS_DETAILS_REQUEST:
            return { ...state, loading: true, provisionsConditionalAddResponse: {} }
        case FinanceProcessTypes.CHECK_ADD_PROVISIONS_DETAILS_SUCCESS:
            return { ...state, loading: false, provisionsConditionalAddResponse: response.data }
        case FinanceProcessTypes.CHECK_ADD_PROVISIONS_DETAILS_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case FinanceProcessTypes.GET_PROVISIONS_OVERALL_METRICS_REQUEST:
            return { ...state, loading: true, provisionsChartResponse: {} }
        case FinanceProcessTypes.GET_PROVISIONS_OVERALL_METRICS_SUCCESS:
            {
                return { ...state, loading: false, provisionsChartResponse: response.data }
            }
        case FinanceProcessTypes.GET_PROVISIONS_OVERALL_METRICS_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case FinanceProcessTypes.DOWNLOAD_PROVISIONS_ARCHIEVE_REQUEST:
            return { ...state, loading: true, provisionsArchieveResponse: {} }
        case FinanceProcessTypes.DOWNLOAD_PROVISIONS_ARCHIEVE_SUCCESS:
            return { ...state, loading: false, provisionsArchieveResponse: response }
        case FinanceProcessTypes.DOWNLOAD_PROVISIONS_ARCHIEVE_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case FinanceProcessTypes.DOWNLOAD_PROVISIONS_OVERALL_DETAILS_REQUEST:
            return { ...state, loading: true, provisionsDownloadResponse: {} }
        case FinanceProcessTypes.DOWNLOAD_PROVISIONS_OVERALL_DETAILS_SUCCESS:
            return { ...state, loading: false, provisionsDownloadResponse: response }
        case FinanceProcessTypes.DOWNLOAD_PROVISIONS_OVERALL_DETAILS_FAILURE:
            return { ...state, loading: false, errors: action.error }
        default: {
            return state
        }
    }
}
