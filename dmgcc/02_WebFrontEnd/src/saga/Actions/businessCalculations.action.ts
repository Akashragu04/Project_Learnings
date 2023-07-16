import { BusinessCalculationTypes } from '../sagas/Types';

/**
 * Biz.Case Requirement Actions
 */

export const initBizProfitLossCalculationAction = () => ({
    type: BusinessCalculationTypes.INIT_BIZ_PROFITLOSS_CALCULATION
})

export const initBizProfitLossIterationDetailnAction = () => ({
    type: BusinessCalculationTypes.INIT_BIZ_PROFITLOSS_ITERATION_DETAIL
})

export const updateBizProfitLossCalculationRequest = (data: any) => ({
    type: BusinessCalculationTypes.UPDATE_BIZ_PROFITLOSS_CALCULATION_REQUEST,
    data
})

export const updateBizProfitLossCalculationSuccess = (data: any) => ({
    type: BusinessCalculationTypes.UPDATE_BIZ_PROFITLOSS_CALCULATION_SUCCESS,
    data
})

export const updateBizProfitLossCalculationFailure = (error: any) => ({
    type: BusinessCalculationTypes.UPDATE_BIZ_PROFITLOSS_CALCULATION_FAILURE,
    error
})

export const updateFinalBizProfitLossRequest = (data: any) => ({
    type: BusinessCalculationTypes.UPDATE_FINAL_BIZ_PROFITLOSS_REQUEST,
    data
})

export const updateFinalBizProfitLossSuccess = (data: any) => ({
    type: BusinessCalculationTypes.UPDATE_FINAL_BIZ_PROFITLOSS_SUCCESS,
    data
})

export const updateFinalBizProfitLossFailure = (error: any) => ({
    type: BusinessCalculationTypes.UPDATE_FINAL_BIZ_PROFITLOSS_FAILURE,
    error
})

export const getBizProfitLossCalculationDetailRequst = (data: any) => ({
    type: BusinessCalculationTypes.GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_REQUEST,
    data
})

export const getBizProfitLossCalculationDetailSuccess = (data: any) => ({
    type: BusinessCalculationTypes.GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_SUCCESS,
    data
})

export const getBizProfitLossCalculationDetailFailure = (error: any) => ({
    type: BusinessCalculationTypes.GET_BIZ_PROFITLOSS_CALCULATION_DETAILS_FAILURE,
    error
})

export const getBizProfitLossCalculationListAction = (data: any) => ({
    type: BusinessCalculationTypes.GET_BIZ_PROFITLOSS_CALCULATION_LIST_REQUEST,
    data
})

export const getBizProfitLossCalculationListSuccess = (data: any) => ({
    type: BusinessCalculationTypes.GET_BIZ_PROFITLOSS_CALCULATION_LIST_SUCCESS,
    data
})

export const getBizProfitLossCalculationListFailure = (error: any) => ({
    type: BusinessCalculationTypes.GET_BIZ_PROFITLOSS_CALCULATION_LIST_FAILURE,
    error
})

export const getBizProfitLossIterationDetailsAction = (data: any) => ({
    type: BusinessCalculationTypes.GET_BIZ_PROFITLOSS_ITERATION_DETAIL_REQUEST,
    data
})

export const getBizProfitLossIterationDetailsSuccess = (data: any) => ({
    type: BusinessCalculationTypes.GET_BIZ_PROFITLOSS_ITERATION_DETAIL_SUCCESS,
    data
})

export const getBizProfitLossIterationDetailsFailure = (error: any) => ({
    type: BusinessCalculationTypes.GET_BIZ_PROFITLOSS_ITERATION_DETAIL_FAILURE,
    error
})
