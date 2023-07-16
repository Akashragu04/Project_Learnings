import { Reducer } from 'redux'
import { FinanceActionTypes, FinanceState } from '../Types/Finance.Types'


// Type-safe initialState!
export const initialState: FinanceState = {
    items: [],
    loading: false,
    errors: {},
    getCostCentreData: [],
    getForoxRateData: null,
    getRateCardData: null,
    getIOMappingData: null,
    getvendorData: null,
    getIODumpData: null,
    resFileObject: null,
    resIoCcChartData: null,
    resCostCentreData: null,
    resCostCenterBlock: null,
    resIONumber: null
}

const reducer: Reducer<FinanceState> = (state = initialState, action) => {
    switch (action.type) {
        case FinanceActionTypes.ADD_COST_CENTRE_REQUEST:
        case FinanceActionTypes.DOWNLOAD_COST_CENTRE_REQUEST:
        case FinanceActionTypes.EDIT_COST_CENTRE_REQUEST:
        case FinanceActionTypes.UPLOAD_FILE_COST_CENTRE_REQUEST:
        case FinanceActionTypes.DOWNLOAD_IO_MAPPING_REQUEST:
        case FinanceActionTypes.UPLOAD_FILE_IO_MAPPING_REQUEST:
        case FinanceActionTypes.ADD_FOREX_RATES_REQUEST:
        case FinanceActionTypes.DOWNLOAD_FOREX_RATES_REQUEST:
        case FinanceActionTypes.EDIT_FOREX_RATES_REQUEST:
        case FinanceActionTypes.UPLOAD_FILE_FOREX_RATES_REQUEST:
        case FinanceActionTypes.ADD_VENDOR_REQUEST:
        case FinanceActionTypes.EDIT_VENDOR_REQUEST:
        case FinanceActionTypes.UPLOAD_VENDOR_REQUEST:
        case FinanceActionTypes.ADD_IODUMP_REQUEST:
        case FinanceActionTypes.EDIT_IODUMP_REQUEST:
        case FinanceActionTypes.UPDATE_IODUMP_REQUEST:
        case FinanceActionTypes.ADD_RATE_CARD_REQUEST:
        case FinanceActionTypes.EDIT_RATE_CARD_REQUEST:
            {
                return { ...state, loading: true }
            }
            
        case FinanceActionTypes.ADD_IO_MAPPING_REQUEST:
            {
                return { ...state, loading: true, resIONumber:null }
            }

        case FinanceActionTypes.GET_COST_CENTRE_REQUEST:
            {
                return { ...state, loading: true, getCostCentreData: [], resCostCentreData: null }
            }
        case FinanceActionTypes.GET_IO_MAPPING_REQUEST:
            {
                return { ...state, loading: true, getIOMappingData: [], resIOMappingData: null }
            }
        case FinanceActionTypes.GET_FOREX_RATES_REQUEST:
            {
                return { ...state, loading: true, getForoxRateData: [], resForoxRateData: null }
            }
        case FinanceActionTypes.GET_RATE_CARD_REQUEST:
            {
                return { ...state, loading: true, getRateCardMasterData: [], resRateCardMasterData: null }
            }
        case FinanceActionTypes.GET_VENDOR_REQUEST:
            {
                return { ...state, loading: true, getvendorData: [], resVendorData: null }
            }
        case FinanceActionTypes.GET_IODUMP_REQUEST:
            {
                return { ...state, loading: true, getIODumpData: [], resIODumpData: null }
            }

        case FinanceActionTypes.GET_MARKET_DATA_REQUEST:
            {
                return { ...state, loading: true, resMarketData: null }
            }

        case FinanceActionTypes.PUT_MARKET_DATA_REQUEST:
            {
                return { ...state, loading: true, putResMarketData: null }
            }
        case FinanceActionTypes.COST_CENTRE_BLOCK_REQUEST:
            {
                return { ...state, loading: true, resCostCenterBlock: null }
            }

        case FinanceActionTypes.COST_CENTRE_BLOCK_SUCCESS:
            {
                const { payload, resCostCenterBlock } = action.payload;
                return { ...state, loading: false, items: payload, resCostCenterBlock: resCostCenterBlock }
            }
        case FinanceActionTypes.COST_CENTRE_BLOCK_ERROR:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    items: [],
                    resCostCenterBlock: null
                }
            }

        case FinanceActionTypes.ADD_COST_CENTRE_SUCCESS:
        case FinanceActionTypes.DOWNLOAD_RATE_CARD_SUCCESS:
        case FinanceActionTypes.EDIT_COST_CENTRE_SUCCESS:
        case FinanceActionTypes.UPLOAD_FILE_COST_CENTRE_SUCCESS:
        case FinanceActionTypes.DOWNLOAD_IO_MAPPING_SUCCESS:
        case FinanceActionTypes.UPLOAD_FILE_IO_MAPPING_SUCCESS:
        case FinanceActionTypes.ADD_FOREX_RATES_SUCCESS:
        case FinanceActionTypes.DOWNLOAD_FOREX_RATES_SUCCESS:
        case FinanceActionTypes.EDIT_FOREX_RATES_SUCCESS:
        case FinanceActionTypes.UPLOAD_FILE_FOREX_RATES_SUCCESS:
        case FinanceActionTypes.ADD_VENDOR_SUCCESS:
        case FinanceActionTypes.EDIT_VENDOR_SUCCESS:
        case FinanceActionTypes.UPLOAD_VENDOR_SUCCESS:
        case FinanceActionTypes.ADD_RATE_CARD_SUCCESS:
        case FinanceActionTypes.EDIT_RATE_CARD_SUCCESS:
            {
                const { payload, } = action.payload;
                return { ...state, loading: false, items: payload }
            }

            case FinanceActionTypes.ADD_IO_MAPPING_SUCCESS:
                {
                    const { payload, } = action.payload;
                    return { ...state, loading: false, resIONumber: payload }
                }   

        case FinanceActionTypes.GET_COST_CENTRE_SUCCESS:
            {
                const { payload, getCostCentreData } = action.payload;
                return { ...state, loading: false, getCostCentreData: getCostCentreData.content, resCostCentreData: getCostCentreData, items: payload }
            }


        case FinanceActionTypes.GET_IO_MAPPING_SUCCESS:
            {
                const { payload, getIOMappingData } = action.payload;
                return { ...state, loading: false, getIOMappingData: getIOMappingData.content, resIOMappingData: getIOMappingData, items: payload }
            }


        case FinanceActionTypes.GET_FOREX_RATES_SUCCESS:
            {
                const { payload, getForoxRateCard } = action.payload;
                return { ...state, loading: false, getForoxRateData: getForoxRateCard.content, resForoxRateData: getForoxRateCard, items: payload }
            }


        case FinanceActionTypes.GET_RATE_CARD_SUCCESS:
            {
                const { payload, getRateCardMasterData } = action.payload;
                return { ...state, loading: false, getRateCardMasterData: getRateCardMasterData.content, resRateCardMasterData: getRateCardMasterData, items: payload }
            }

        case FinanceActionTypes.GET_VENDOR_SUCCESS:
            {
                const { payload, getVendorData } = action.payload;
                return { ...state, loading: false, getvendorData: getVendorData.content, resVendorData: getVendorData, items: payload }
            }

        case FinanceActionTypes.GET_IODUMP_SUCCESS:
            {
                const { payload, getIODumpData } = action.payload;
                return { ...state, loading: false, getIODumpData: getIODumpData.content, resIODumpData: getIODumpData, items: payload }
            }

        case FinanceActionTypes.GET_MARKET_DATA_SUCCESS:
            {
                const { payload, resMarketData } = action.payload;
                return { ...state, loading: false, resMarketData: resMarketData, items: payload }
            }

        case FinanceActionTypes.PUT_MARKET_DATA_SUCCESS:
            {
                const { payload, putResMarketData } = action.payload;
                return { ...state, loading: false, putResMarketData: putResMarketData, items: payload }
            }

        case FinanceActionTypes.ADD_COST_CENTRE_ERROR:
        case FinanceActionTypes.DOWNLOAD_COST_CENTRE_ERROR:
        case FinanceActionTypes.EDIT_COST_CENTRE_ERROR:
        case FinanceActionTypes.GET_COST_CENTRE_ERROR:
        case FinanceActionTypes.UPLOAD_FILE_COST_CENTRE_ERROR:
        case FinanceActionTypes.DOWNLOAD_IO_MAPPING_ERROR:
        case FinanceActionTypes.UPLOAD_FILE_IO_MAPPING_ERROR:
        case FinanceActionTypes.ADD_FOREX_RATES_ERROR:
        case FinanceActionTypes.DOWNLOAD_FOREX_RATES_ERROR:
        case FinanceActionTypes.DOWNLOAD_RATE_CARD_ERROR:
        case FinanceActionTypes.UPLOAD_FILE_FOREX_RATES_ERROR:
        case FinanceActionTypes.GET_FOREX_RATES_ERROR:
        case FinanceActionTypes.ADD_VENDOR_ERROR:
        case FinanceActionTypes.UPLOAD_VENDOR_ERROR:
        case FinanceActionTypes.EDIT_VENDOR_ERROR:
        case FinanceActionTypes.GET_VENDOR_ERROR:
        case FinanceActionTypes.ADD_IODUMP_ERROR:
        case FinanceActionTypes.EDIT_IODUMP_ERROR:
        case FinanceActionTypes.GET_IODUMP_ERROR:
        case FinanceActionTypes.UPDATE_IODUMP_ERROR:
        case FinanceActionTypes.ADD_RATE_CARD_ERROR:
        case FinanceActionTypes.EDIT_RATE_CARD_ERROR:
        case FinanceActionTypes.GET_RATE_CARD_ERROR:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    items: []
                }
            }

            case FinanceActionTypes.ADD_IO_MAPPING_ERROR:
   {
                const { payload, errors } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    items: [],
                    resIONumber:errors
                }
            }

        case FinanceActionTypes.CLEAR_STATUS_REQUEST: {
            return initialState;
        }

        case FinanceActionTypes.FILE_DOWNLOAD_COMMON_REQUEST:
            {
                return { ...state, loading: true, resFileObject: null }
            }

        case FinanceActionTypes.FILE_DOWNLOAD_COMMON_SUCCESS:
            {
                const { payload, resFileObject } = action.payload;
                return { ...state, loading: false, resFileObject: resFileObject, items: payload }
            }

        case FinanceActionTypes.FILE_DOWNLOAD_COMMON_ERROR:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    items: []
                }
            }

        case FinanceActionTypes.GET_IO_CC_CHART_REQUEST:
            {
                return { ...state, loading: true, resIoCcChartData: null }
            }

        case FinanceActionTypes.GET_MARKET_DATA_ERROR:
            {
                return { ...state, loading: true, resMarketData: null }
            }

        case FinanceActionTypes.PUT_MARKET_DATA_ERROR:
            {
                return { ...state, loading: true, putResMarketData: null }
            }

        case FinanceActionTypes.GET_IO_CC_CHART_SUCCESS:
            {
                const { payload, resIoCcChartData } = action.payload;
                return { ...state, loading: false, resIoCcChartData: resIoCcChartData, items: payload }
            }

        case FinanceActionTypes.GET_IO_CC_CHART_ERROR:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    items: [],
                    resIoCcChartData: null
                }
            }
        default: {
            return state
        }
    }
}

export { reducer as FinanceMaster }