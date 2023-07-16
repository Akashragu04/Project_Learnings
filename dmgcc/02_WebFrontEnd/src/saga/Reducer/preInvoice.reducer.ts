import { PreInvoiceTypes } from '../sagas/Types';

// Type-safe initialState!
export const initialState: any = {
    items: [],
    loading: false,
    isLoading: false,
    errors: {},
    preInvoiceResponse: [],
    preInvoiceGridData: [],
    invoiceGridData: [],
    invoiceResponse: [],
    totalElements: 0,
    totalPages: 10,
    pageSize: 10,
    createPreInvoiceResponse: {},
    preInvoiceResponseData: {},
    provisionSLAList:null,
    provisionProjectList:null
}

export const preInvoice: any = (state = initialState, action) => {
    switch (action.type) {
        case PreInvoiceTypes.INIT_PREINVOICE:
            return {
                ...state, loading: false, isLoading: false, items: [], createPreInvoiceResponse: {}
            }
            case PreInvoiceTypes.DELETE_PREINVOICE_REQUEST:
                return {
                    ...state, loading: false, isLoading: false, items: []
                }

                case PreInvoiceTypes.DELETE_PREINVOICE_SUCCESS:
                    {
                        const { payload } = action.data;
                        return {
                            ...state, loading: false,
                            items: payload,
                            isLoading: false,
                        }
                    }

                    
        case PreInvoiceTypes.DELETE_PREINVOICE_FAILURE:
            return { ...state, isLoading: false, errors: action.error }

        case PreInvoiceTypes.GET_ALL_PREINVOICE_DETAILS:
            return { ...state, isLoading: true, items: [] }
        case PreInvoiceTypes.GET_ALL_PREINVOICE_DETAILS_SUCCESS:
            {
                const { payload, responseData, tableData } = action.data;
                return {
                    ...state, loading: false,
                    items: payload,
                    isLoading: false,
                    preInvoiceResponse: responseData,
                    preInvoiceGridData: tableData,
                    totalElements: responseData.totalElements,
                    totalPages: responseData.totalPages,
                    pageSize: responseData.size,
                }
            }
        case PreInvoiceTypes.GET_ALL_PREINVOICE_DETAILS_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case PreInvoiceTypes.GET_ALL_INVOICE_DETAILS:
            return { ...state, isLoading: true, items: [] }
        case PreInvoiceTypes.GET_ALL_INVOICE_DETAILS_SUCCESS:
            {
                const { payload, responseData, tableData } = action.data;
                return {
                    ...state, loading: false,
                    items: payload,
                    isLoading: false,
                    invoiceResponse: responseData,
                    invoiceGridData: tableData,
                    totalElements: responseData.totalElements,
                    totalPages: responseData.totalPages,
                    pageSize: responseData.size,
                }
            }
        case PreInvoiceTypes.GET_ALL_INVOICE_DETAILS_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case PreInvoiceTypes.CREATE_PREINVOICE_REQUEST:
            return { ...state, loading: true, createPreInvoiceResponse: {} }
        case PreInvoiceTypes.CREATE_PREINVOICE_REQUEST_SUCCESS:
            {
                const { payload } = action.payload;
                return { ...state, loading: false, createPreInvoiceResponse: payload }
            }
        case PreInvoiceTypes.CREATE_PREINVOICE_REQUEST_FAILURE:
            return { ...state, loading: false, errors: action.error }

        case PreInvoiceTypes.GET_PREINVOICE_DETAIL_REQUEST:
            return { ...state, loading: true, preInvoiceResponseData: {} }
        case PreInvoiceTypes.GET_PREINVOICE_DETAIL_SUCCESS:
            {
                const { payload } = action.data;
                return { ...state, loading: false, preInvoiceResponseData: payload }
            }
        case PreInvoiceTypes.GET_PREINVOICE_DETAIL_FAILURE:
            return { ...state, loading: false, errors: action.error }

            
        case PreInvoiceTypes.PROJECT_PREINVOICE_REQUEST:
            return { ...state, loading: true, provisionProjectList: null }
        case PreInvoiceTypes.PROJECT_PREINVOICE_SUCCESS:
            {
                const {  provisionProjectList } = action.payload;
                return { ...state, loading: false, provisionProjectList: provisionProjectList }
            }
        case PreInvoiceTypes.PROJECT_PREINVOICE_FAILURE:
            return { ...state, loading: false, errors: action.error }

            
        case PreInvoiceTypes.SLA_PREINVOICE_REQUEST:
            return { ...state, loading: true, provisionSLAList: null }
        case PreInvoiceTypes.SLA_PREINVOICE_SUCCESS:
            {
                const { provisionSLAList } = action.payload;
                return { ...state, loading: false, provisionSLAList: provisionSLAList }
            }
        case PreInvoiceTypes.SLA_PREINVOICE_FAILURE:
            return { ...state, loading: false, errors: action.error }
        default: {
            return state
        }
    }
}
