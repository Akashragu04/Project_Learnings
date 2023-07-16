import { BizCaseSLATypes } from '../sagas/Types';
import { takeEvery } from "redux-saga/effects";
import { SLAActionTypes } from '../Types/SLA.Types';
import {
    createBizCaseSLA, getcustomerList, getCostcenterList, getMaterialList, getSLAEditDetails,
    updateTermsConditionsData, updateAttachmentsConditionsData, getBillingCycleListData,
    getPerinvoiceData, postPerinvoiceData, getProjectSLADetailsData, getOrganizationData, getBillingcycleData, updateBizCaseSLAContact, getMaterialdescriptionData, getContractOptionData, getCountryListData, getRateCardData, getTariffSheetMaterialdescriptionData, sentApprovalSlaData, getApprovalSlaData
} from "../sagas/businessCaseSLA.sagas"
/**
 * Biz.Case Requirement Actions
 */

export const getBizCaseSLA = function* () {
    yield takeEvery(BizCaseSLATypes.CREATE_BIZCASE_SLA, createBizCaseSLA);
}
export const reqBizCaseSLA = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.CREATE_BIZCASE_SLA,
        payload: postValue
    }
}

export const getBizCaseSLASuccess = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.CREATE_BIZCASE_SLA_REQUEST_SUCCESS,
        payload: postValue
    }
}

export const getBizCaseSLAFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: BizCaseSLATypes.CREATE_BIZCASE_SLA_REQUEST_FAILURE,
        payload: errors
    }
}


export const getRateCardList = function* () {
    yield takeEvery(SLAActionTypes.GET_CURRENCY_LIST_REQUEST, getRateCardData);
}
export const reqRateCardList = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_CURRENCY_LIST_REQUEST,
        payload: postValue
    }
}

export const getRateCardSuccess = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_CURRENCY_LIST_SUCCESS,
        payload: postValue
    }
}

export const getRateCardFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: SLAActionTypes.GET_CURRENCY_LIST_ERROR,
        payload: errors
    }
}

export const getCountryList = function* () {
    yield takeEvery(SLAActionTypes.GET_COUNTRY_LIST_REQUEST, getCountryListData);
}
export const reqCountryList = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_COUNTRY_LIST_REQUEST,
        payload: postValue
    }
}

export const getCountryListSuccess = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_COUNTRY_LIST_SUCCESS,
        payload: postValue
    }
}

export const getCountryListFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: SLAActionTypes.GET_COUNTRY_LIST_ERROR,
        payload: errors
    }
}

export const getContractOption = function* () {
    yield takeEvery(SLAActionTypes.GET_CONTRACT_OPITION_REQUEST, getContractOptionData);
}
export const reqContractOption = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_CONTRACT_OPITION_REQUEST,
        payload: postValue
    }
}

export const getContractOptionSuccess = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_CONTRACT_OPITION_SUCCESS,
        payload: postValue
    }
}

export const getContractOptionFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: SLAActionTypes.GET_CONTRACT_OPITION_ERROR,
        payload: errors
    }
}

export const getMaterialdescription = function* () {
    yield takeEvery(SLAActionTypes.GET_MATERIAL_DESCRIPTION_REQUEST, getMaterialdescriptionData);
}
export const reqMaterialdescription = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_MATERIAL_DESCRIPTION_REQUEST,
        payload: postValue
    }
}

export const getMaterialdescriptionSuccess = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_MATERIAL_DESCRIPTION_SUCCESS,
        payload: postValue
    }
}

export const getMaterialdescriptionFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: SLAActionTypes.GET_MATERIAL_DESCRIPTION_ERROR,
        payload: errors
    }
}

export const getTariffSheetMaterialdescription = function* () {
    yield takeEvery(SLAActionTypes.GET_TARIFF_SHEET_MATERIAL_DESCRIPTION_REQUEST, getTariffSheetMaterialdescriptionData);
}
export const reqTariffSheetMaterialdescription = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_TARIFF_SHEET_MATERIAL_DESCRIPTION_REQUEST,
        payload: postValue
    }
}

export const getTariffSheetMaterialdescriptionSuccess = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_TARIFF_SHEET_MATERIAL_DESCRIPTION_SUCCESS,
        payload: postValue
    }
}

export const getTariffSheetMaterialdescriptionFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: SLAActionTypes.GET_TARIFF_SHEET_MATERIAL_DESCRIPTION_ERROR,
        payload: errors
    }
}

export const initBizCaseSLAAction = () => ({
    type: BizCaseSLATypes.INIT_BIZCASE_SLA
})

export const getAllBizCaseSLADetailsAction = (data: any) => ({
    type: BizCaseSLATypes.GET_ALL_BIZCASE_SLA_DETAILS,
    data
})

export const getAllBizCaseSLADetailsSuccess = (data: any) => ({
    type: BizCaseSLATypes.GET_ALL_BIZCASE_SLA_DETAILS_SUCCESS,
    data
})

export const getAllBizCaseSLADetailsFailure = (error: any) => ({
    type: BizCaseSLATypes.GET_ALL_BIZCASE_SLA_DETAILS_FAILURE,
    error
})

export const updateBizSLAContractDetailsAction = (data: any) => ({
    type: BizCaseSLATypes.UPDATE_BIZCASE_SLA_CONTRACT_DETAILS,
    data
})

export const updateBizSLAContractDetailsSuccess = (data: any) => ({
    type: BizCaseSLATypes.UPDATE_BIZCASE_SLA_CONTRACT_SUCCESS,
    data
})

export const updateBizSLAContractDetailsFailure = (error: any) => ({
    type: BizCaseSLATypes.UPDATE_BIZCASE_SLA_CONTRACT_FAILURE,
    error
})

export const getBizCaseC4DSLADetailsAction = (data: any) => ({
    type: BizCaseSLATypes.GET_BIZCASE_C4DSLA_DETAILS,
    data
})

export const getBizCaseC4DSLADetailsSuccess = (data: any) => ({
    type: BizCaseSLATypes.GET_BIZCASE_C4DSLA_DETAILS_SUCCESS,
    data
})

export const getBizCaseC4DSLADetailsFailure = (error: any) => ({
    type: BizCaseSLATypes.GET_BIZCASE_C4DSLA_DETAILS_FAILURE,
    error
})

export const setBizCaseC4DSLAAction = (data: any) => ({
    type: BizCaseSLATypes.SET_BIZCASE_C4DSLA_REQUEST,
    data
})

export const setBizCaseC4DSLARequestSuccess = (data: any) => ({
    type: BizCaseSLATypes.SET_BIZCASE_C4DSLA_REQUEST_SUCCESS,
    data
})

export const setBizCaseC4DSLARequestFailure = (error: any) => ({
    type: BizCaseSLATypes.SET_BIZCASE_C4DSLA_REQUEST_FAILURE,
    error
})
// This is function is used to SLA Customer Details
export const getBizCaseSLACustomerDetails = function* () {
    yield takeEvery(BizCaseSLATypes.GET_BIZCASE_SLA_CUSTOMER_DETAILS, getcustomerList);
}
export const getCustomerBizCaseSLA = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.GET_BIZCASE_SLA_CUSTOMER_DETAILS,
        payload: postValue
    }
}
export const getBizCaseSLACustomerSuccess = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.GET_BIZCASE_SLA_CUSTOMER_DETAILS_SUCCESS,
        payload: postValue
    }
}

export const getBizCaseSLACustomerFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: BizCaseSLATypes.GET_BIZCASE_SLA_CUSTOMER_DETAILS_FAILURE,
        payload: errors
    }
}
// This is function is used to SLA Cost Centre code Details
export const getBizCaseSLACostcenterDetails = function* () {
    yield takeEvery(BizCaseSLATypes.GET_BIZCASE_SLA_COSTCENTER_DETAILS, getCostcenterList);
}
export const getCostcenterBizCaseSLA = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.GET_BIZCASE_SLA_COSTCENTER_DETAILS,
        payload: postValue
    }
}
export const getBizCaseSLACostcenterSuccess = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.GET_BIZCASE_SLA_COSTCENTER_DETAILS_SUCCESS,
        payload: postValue
    }
}

export const getBizCaseSLACostcenterFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: BizCaseSLATypes.GET_BIZCASE_SLA_COSTCENTER_DETAILS_FAILURE,
        payload: errors
    }
}
// This is function is used to SLA Material Desc Details
export const getBizCaseSLAMaterialDescDetails = function* () {
    yield takeEvery(BizCaseSLATypes.GET_BIZCASE_SLA_MATERIAL_DESC_DETAILS, getMaterialList);
}
export const getMaterialDescBizCaseSLA = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.GET_BIZCASE_SLA_MATERIAL_DESC_DETAILS,
        payload: postValue
    }
}
export const getBizCaseSLAMaterialDescSuccess = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.GET_BIZCASE_SLA_MATERIAL_DESC_DETAILS_SUCCESS,
        payload: postValue
    }
}

export const getBizCaseSLAMaterialDescFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: BizCaseSLATypes.GET_BIZCASE_SLA_MATERIAL_DESC_DETAILS_FAILURE,
        payload: errors
    }
}
// This is function is used to SLA Material Desc Details
export const getBizCaseSLAEditDetails = function* () {
    yield takeEvery(BizCaseSLATypes.GET_BIZCASE_SLA_EDIT_DETAILS, getSLAEditDetails);
}
export const getEditBizCaseSLA = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.GET_BIZCASE_SLA_EDIT_DETAILS,
        payload: postValue
    }
}
export const getBizCaseSLAEditSuccess = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.GET_BIZCASE_SLA_EDIT_DETAILS_SUCCESS,
        payload: postValue
    }
}

export const getBizCaseSLAEditFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: BizCaseSLATypes.GET_BIZCASE_SLA_EDIT_DETAILS_FAILURE,
        payload: errors
    }
}
// This is function is used to SLA Update Details
export const updateBizCaseSLADetails = function* () {
    yield takeEvery(BizCaseSLATypes.UPDATE_BIZCASE_SLA_DETAILS, updateBizCaseSLAContact);
}
export const updateBizCaseSLA = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.UPDATE_BIZCASE_SLA_DETAILS,
        payload: postValue
    }
}
export const updateBizCaseSLASuccess = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.UPDATE_BIZCASE_SLA_DETAILS_SUCCESS,
        payload: postValue
    }
}

export const updateBizCaseSLAFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: BizCaseSLATypes.UPDATE_BIZCASE_SLA_DETAILS_FAILURE,
        payload: errors
    }
}

// This is function is used to SLA Update Details
export const updateTermsConditions = function* () {
    yield takeEvery(SLAActionTypes.TERMS_CONDITION_UPLOAD_REQUEST, updateTermsConditionsData);
}
export const reqUpdateTermsConditions = (postValue?: any) => {
    return {
        type: SLAActionTypes.TERMS_CONDITION_UPLOAD_REQUEST,
        payload: postValue
    }
}
export const updateTermsConditionsSuccess = (postValue?: any) => {
    return {
        type: SLAActionTypes.TERMS_CONDITION_UPLOAD_SUCCESS,
        payload: postValue
    }
}

export const updateTermsConditionsFailure = (error?: any) => {
   
    return {
        type: SLAActionTypes.TERMS_CONDITION_UPLOAD_ERROR,
        payload: error
    }
}

// This is function is used to SLA Update Details
export const updateAttachmentsConditions = function* () {
    yield takeEvery(SLAActionTypes.SLA_UPLOAD_REQUEST, updateAttachmentsConditionsData);
}
export const reqUpdateAttachmentsConditionss = (postValue?: any) => {
    return {
        type: SLAActionTypes.SLA_UPLOAD_REQUEST,
        payload: postValue
    }
}
export const updateAttachmentsConditionsSuccess = (postValue?: any) => {
    return {
        type: SLAActionTypes.SLA_UPLOAD_SUCCESS,
        payload: postValue
    }
}

export const updateAttachmentsConditionsFailure = (error?: any) => {
   
    return {
        type: SLAActionTypes.SLA_UPLOAD_ERROR,
        payload: error
    }
}

// This is function is used to SLA Update Details
export const getBillingCycleList = function* () {
    yield takeEvery(SLAActionTypes.BILLING_CYCLE_DROPDOWN_REQUEST, getBillingCycleListData);
}
export const reqBillingCycleList = (postValue?: any) => {
    return {
        type: SLAActionTypes.BILLING_CYCLE_DROPDOWN_REQUEST,
        payload: postValue
    }
}
export const getBillingCycleListSuccess = (postValue?: any) => {
    return {
        type: SLAActionTypes.BILLING_CYCLE_DROPDOWN_SUCCESS,
        payload: postValue
    }
}

export const getBillingCycleListFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: SLAActionTypes.BILLING_CYCLE_DROPDOWN_ERROR,
        payload: errors
    }
}

// This is function is used to SLA Update Details
export const getPerinvoice = function* () {
    yield takeEvery(SLAActionTypes.GET_PER_INVOICE_REQUEST, getPerinvoiceData);
}
export const reqPerinvoice = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_PER_INVOICE_REQUEST,
        payload: postValue
    }
}
export const getPerinvoiceSuccess = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_PER_INVOICE_SUCCESS,
        payload: postValue
    }
}

export const getPerinvoiceFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: SLAActionTypes.GET_PER_INVOICE_ERROR,
        payload: errors
    }
}

// This is function is used to SLA Update Details
export const postPerinvoice = function* () {
    yield takeEvery(SLAActionTypes.POST_PER_INVOICE_REQUEST, postPerinvoiceData);
}
export const reqPerinvoiceData = (postValue?: any) => {
    return {
        type: SLAActionTypes.POST_PER_INVOICE_REQUEST,
        payload: postValue
    }
}
export const postPerinvoiceSuccess = (postValue?: any) => {
    return {
        type: SLAActionTypes.POST_PER_INVOICE_SUCCESS,
        payload: postValue
    }
}

export const postPerinvoiceFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: SLAActionTypes.POST_PER_INVOICE_ERROR,
        payload: errors
    }
}

// This is function is used to SLA Update Details
export const getProjectSLADetails = function* () {
    yield takeEvery(SLAActionTypes.GET_PROJECT_SLA_DETAILS_REQUEST, getProjectSLADetailsData);
}
export const reqProjectSLADetails = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_PROJECT_SLA_DETAILS_REQUEST,
        payload: postValue
    }
}
export const getProjectSLADetailsSuccess = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_PROJECT_SLA_DETAILS_SUCCESS,
        payload: postValue
    }
}

export const getProjectSLADetailsFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: SLAActionTypes.GET_PROJECT_SLA_DETAILS_ERROR,
        payload: errors
    }
}


// This is function is used to SLA Update Details
export const getOrganization = function* () {
    yield takeEvery(SLAActionTypes.GET_ORGANIZATION_REQUEST, getOrganizationData);
}
export const reqOrganization = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_ORGANIZATION_REQUEST,
        payload: postValue
    }
}
export const getOrganizationSuccess = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_ORGANIZATION_SUCCESS,
        payload: postValue
    }
}

export const getOrganizationFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: SLAActionTypes.GET_ORGANIZATION_ERROR,
        payload: errors
    }
}


// This is function is used to SLA Update Details
export const getBillingcycle = function* () {
    yield takeEvery(SLAActionTypes.GET_BILLING_CYCLE_REQUEST, getBillingcycleData);
}
export const reqBillingcycle = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_BILLING_CYCLE_REQUEST,
        payload: postValue
    }
}
export const getBillingcycleSuccess = (postValue?: any) => {
    return {
        type: SLAActionTypes.GET_BILLING_CYCLE_SUCCESS,
        payload: postValue
    }
}

export const getBillingcycleFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: SLAActionTypes.GET_BILLING_CYCLE_ERROR,
        payload: errors
    }
}


// This is function is used to SLA Update Details
export const sentApprovalSla = function* () {
    yield takeEvery(SLAActionTypes.SENT_MAIL_SLA_REQUEST, sentApprovalSlaData);
}
export const reqSentApprovalSla = (postValue?: any) => {
    return {
        type: SLAActionTypes.SENT_MAIL_SLA_REQUEST,
        payload: postValue
    }
}
export const sentApprovalSlaSuccess = (postValue?: any) => {
    return {
        type: SLAActionTypes.SENT_MAIL_SLA_SUCCESS,
        payload: postValue
    }
}

export const sentApprovalSlaFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: SLAActionTypes.SENT_MAIL_SLA_ERROR,
        payload: errors
    }
}


// This is function is used to SLA Update Details
export const getApprovalSla = function* () {
    yield takeEvery(BizCaseSLATypes.SLA_APPROVAL_STATUS_REQUEST, getApprovalSlaData);
}
export const reqGetApprovalSla = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.SLA_APPROVAL_STATUS_REQUEST,
        payload: postValue
    }
}
export const getApprovalSlaSuccess = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.SLA_APPROVAL_STATUS_SUCCESS,
        payload: postValue
    }
}

export const getApprovalSlaFailure = (error?: any) => {
    const { errors } = error;
    return {
        type: BizCaseSLATypes.SLA_APPROVAL_STATUS_ERROR,
        payload: errors
    }
}


  export const  reqClearBizSLADetails = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.CLEAR_BIZ_SLA_REQUEST,
        payload: postValue
    }
  }