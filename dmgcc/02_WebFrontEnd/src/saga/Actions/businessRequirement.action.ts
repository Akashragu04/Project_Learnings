import { BusinessRequirementTypes } from '../sagas/Types';

/**
 * Biz.Case Requirement Actions
 */

export const initBizRequirementAction = () => ({
    type: BusinessRequirementTypes.INIT_BIZ_REQUIREMENTS
})

export const resetActiveRampupIterationAction = () => ({
    type: BusinessRequirementTypes.RESET_ACTIVE_RAMPUPDATA_ACTION
})

export const setActiveRampupIterationDataAction = (data: any) => ({
    type: BusinessRequirementTypes.SET_ACTIVE_RAMPUPDATA_REQUEST,
    data
})

export const setActiveRampupIterationDataSuccess = (data: any) => ({
    type: BusinessRequirementTypes.SET_ACTIVE_RAMPUPDATA_SUCCESS,
    data
})

export const setActiveRampupIterationDataFailure = (error: any) => ({
    type: BusinessRequirementTypes.SET_ACTIVE_RAMPUPDATA_ERROR,
    error
})

export const setRequirementWOBizCaseAction = (data: any) => ({
    type: BusinessRequirementTypes.SET_REQUIREMENT_WITHOUT_BIZCASE_REQUEST,
    data
})

export const setRequirementWOBizCaseSuccess = (data: any) => ({
    type: BusinessRequirementTypes.SET_REQUIREMENT_WITHOUT_BIZCASES_SUCCESS,
    data
})

export const setRequirementWOBizCaseFailure = (error: any) => ({
    type: BusinessRequirementTypes.SET_REQUIREMENT_WITHOUT_BIZCASE_FAILURE,
    error
})

export const createBizRequirementAction = (data: any) => ({
    type: BusinessRequirementTypes.CREATE_BIZ_REQUIREMENTS,
    data
})

export const createBizRequirementSuccess = (data: any) => ({
    type: BusinessRequirementTypes.CREATE_BIZ_REQUIREMENTS_SUCCESS,
    data
})

export const createBizRequirementFailure = (error: any) => ({
    type: BusinessRequirementTypes.CREATE_BIZ_REQUIREMENTS_FAILURE,
    error
})

export const getBizRequirementDetailAction = (data: any) => ({
    type: BusinessRequirementTypes.GET_BIZ_REQUIREMENT_DETAILS,
    data
})

export const getBizRequirementDetailSuccess = (data: any) => ({
    type: BusinessRequirementTypes.GET_BIZ_REQUIREMENT_SUCCESS,
    data
})

export const getBizRequirementDetailFailure = (error: any) => ({
    type: BusinessRequirementTypes.GET_BIZ_REQUIREMENT_FAILURE,
    error
})

export const getBizIterationDetailAction = (data: any) => ({
    type: BusinessRequirementTypes.GET_BIZ_ITERATION_DETAILS,
    data
})

export const getBizIterationDetailSuccess = (data: any) => ({
    type: BusinessRequirementTypes.GET_BIZ_ITERATION_DETAILS_SUCCESS,
    data
})

export const getBizIterationDetailFailure = (error: any) => ({
    type: BusinessRequirementTypes.GET_BIZ_ITERATION_DETAILS_FAILURE,
    error
})

export const saveAndNotifyAllBizRequirementAction = (data: any) => ({
    type: BusinessRequirementTypes.SAVEANDNOTIFYALL_BIZ_REQUIREMENTS_REQUEST,
    data
})

export const saveAndNotifyAllBizRequirementSuccess = (data: any) => ({
    type: BusinessRequirementTypes.SAVEANDNOTIFYALL_BIZ_REQUIREMENTS_SUCCESS,
    data
})

export const saveAndNotifyAllBizRequirementFailure = (error: any) => ({
    type: BusinessRequirementTypes.SAVEANDNOTIFYALL_BIZ_REQUIREMENTS_FAILURE,
    error
})

export const saveAndNotifyBizRequirementAction = (data: any) => ({
    type: BusinessRequirementTypes.SAVEANDNOTIFY_BIZ_REQUIREMENTS_REQUEST,
    data
})

export const saveAndNotifyBizRequirementSuccess = (data: any) => ({
    type: BusinessRequirementTypes.SAVEANDNOTIFY_BIZ_REQUIREMENTS_SUCCESS,
    data
})

export const saveAndNotifyBizRequirementFailure = (error: any) => ({
    type: BusinessRequirementTypes.SAVEANDNOTIFY_BIZ_REQUIREMENTS_FAILURE,
    error
})

export const updateBizRequirementAction = (data: any) => ({
    type: BusinessRequirementTypes.UPDATE_BIZ_REQUIREMENTS_REQUEST,
    data
})

export const updateBizRequirementSuccess = (data: any) => ({
    type: BusinessRequirementTypes.UPDATE_BIZ_REQUIREMENTS_SUCCESS,
    data
})

export const updateBizRequirementFailure = (error: any) => ({
    type: BusinessRequirementTypes.UPDATE_BIZ_REQUIREMENTS_FAILURE,
    error
})

export const getHRUserDetailRequestAction = (data: any) => ({
    type: BusinessRequirementTypes.GET_HR_USERDETAILS_REQUEST,
    data
})

export const getHRUserDetailSuccess = (data: any) => ({
    type: BusinessRequirementTypes.GET_HR_USERDETAILS_SUCCESS,
    data
})

export const getHRUserDetailFailure = (error: any) => ({
    type: BusinessRequirementTypes.GET_HR_USERDETAILS_ERROR,
    error
})

export const getITUserDetailRequestAction = (data: any) => ({
    type: BusinessRequirementTypes.GET_IT_USERDETAILS_REQUEST,
    data
})

export const getITUserDetailSuccess = (data: any) => ({
    type: BusinessRequirementTypes.GET_IT_USERDETAILS_SUCCESS,
    data
})

export const getITUserDetailFailure = (error: any) => ({
    type: BusinessRequirementTypes.GET_IT_USERDETAILS_ERROR,
    error
})

export const getFacilityUserDetailRequestAction = (data: any) => ({
    type: BusinessRequirementTypes.GET_FACILITY_USERDETAILS_REQUEST,
    data
})

export const getFacilityUserDetailSuccess = (data: any) => ({
    type: BusinessRequirementTypes.GET_FACILITY_USERDETAILS_SUCCESS,
    data
})

export const getFacilityUserDetailFailure = (error: any) => ({
    type: BusinessRequirementTypes.GET_FACILITY_USERDETAILS_ERROR,
    error
})

export const getExistingRateCardListAction = (data: any) => ({
    type: BusinessRequirementTypes.GET_EXISTING_RATECARD_LIST_REQUEST,
    data
})

export const getExistingRateCardListSuccess = (data: any) => ({
    type: BusinessRequirementTypes.GET_EXISTING_RATECARD_LIST_SUCCESS,
    data
})

export const getExistingRateCardListFailure = (error: any) => ({
    type: BusinessRequirementTypes.GET_EXISTING_RATECARD_LIST_ERROR,
    error
})

export const getFinanceUserDetailRequestAction = (data: any) => ({
    type: BusinessRequirementTypes.GET_FINANCE_USERDETAILS_REQUEST,
    data
})

export const getFinanceUserDetailSuccess = (data: any) => ({
    type: BusinessRequirementTypes.GET_FINANCE_USERDETAILS_SUCCESS,
    data
})

export const getFinanceUserDetailFailure = (error: any) => ({
    type: BusinessRequirementTypes.GET_FINANCE_USERDETAILS_ERROR,
    error
})

export const sendFinanceBizEmailAction = (data: any) => ({
    type: BusinessRequirementTypes.SEND_FINANCE_BIZ_EMAIL_REQUEST,
    data
})

export const sendFinanceBizEmailSuccess = (data: any) => ({
    type: BusinessRequirementTypes.SEND_FINANCE_BIZ_EMAIL_SUCCESS,
    data
})

export const sendFinanceBizEmailFailure = (error: any) => ({
    type: BusinessRequirementTypes.SEND_FINANCE_BIZ_EMAIL_ERROR,
    error
})
