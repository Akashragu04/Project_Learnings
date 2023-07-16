import { BusinessCalculationTypes } from '../sagas/Types';

// Type-safe initialState!
const defaultObj: any = {}
export const initialState: any = {
    items: [],
    loading: false,
    isLoading: false,
    errors: {},
    businessProfitIterationList: [],
    bizCalculationResponse: {},
    bizCalculationIterationResponse: {},
    response: {},
    bizSubmitResponse: {}
}

export const businessCalculations: any = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case BusinessCalculationTypes.INIT_BIZ_PROFITLOSS_CALCULATION:
            return {
                ...state, loading: false, isLoading: false, errors: defaultObj, response: defaultObj, businessProfitIterationList: [],
                bizCalculationResponse: defaultObj, bizCalculationIterationResponse: defaultObj, bizSubmitResponse: defaultObj
            }
        case BusinessCalculationTypes.INIT_BIZ_PROFITLOSS_ITERATION_DETAIL:
            return {
                ...state, loading: false, isLoading: false, errors: defaultObj,
                bizCalculationResponse: defaultObj, bizCalculationIterationResponse: defaultObj
            }
        case BusinessCalculationTypes.GET_BIZ_PROFITLOSS_CALCULATION_LIST_REQUEST:
            return { ...state, loading: true, businessProfitIterationList: [] }
        case BusinessCalculationTypes.GET_BIZ_PROFITLOSS_CALCULATION_LIST_SUCCESS:
            return { ...state, loading: false, businessProfitIterationList: response.data }
        case BusinessCalculationTypes.GET_BIZ_PROFITLOSS_CALCULATION_LIST_FAILURE:
            return { ...state, loading: false, businessProfitIterationList: [], errors: action.error }
        case BusinessCalculationTypes.GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_REQUEST:
            return { ...state, isLoading: true, bizCalculationResponse: defaultObj }
        case BusinessCalculationTypes.GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_SUCCESS:
            return { ...state, isLoading: false, bizCalculationResponse: response }
        case BusinessCalculationTypes.GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case BusinessCalculationTypes.GET_BIZ_PROFITLOSS_ITERATION_DETAIL_REQUEST:
            return { ...state, isLoading: true, bizCalculationIterationResponse: defaultObj }
        case BusinessCalculationTypes.GET_BIZ_PROFITLOSS_ITERATION_DETAIL_SUCCESS:
            return { ...state, isLoading: false, bizCalculationIterationResponse: response }
        case BusinessCalculationTypes.GET_BIZ_PROFITLOSS_ITERATION_DETAIL_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case BusinessCalculationTypes.UPDATE_BIZ_PROFITLOSS_CALCULATION_REQUEST:
            return { ...state, loading: true, response: defaultObj }
        case BusinessCalculationTypes.UPDATE_BIZ_PROFITLOSS_CALCULATION_SUCCESS:
            return { ...state, loading: false, response: response }
        case BusinessCalculationTypes.UPDATE_BIZ_PROFITLOSS_CALCULATION_FAILURE:
            return { ...state, loading: false, errors: action.error }
        case BusinessCalculationTypes.UPDATE_FINAL_BIZ_PROFITLOSS_REQUEST:
            return { ...state, loading: true, bizSubmitResponse: defaultObj }
        case BusinessCalculationTypes.UPDATE_FINAL_BIZ_PROFITLOSS_SUCCESS:
            return { ...state, loading: false, bizSubmitResponse: response }
        case BusinessCalculationTypes.UPDATE_FINAL_BIZ_PROFITLOSS_FAILURE:
            return { ...state, loading: false, errors: action.error }
        default: {
            return state
        }
    }
}
