import { takeEvery } from 'redux-saga/effects';
import { clearFinanceStatusDetail } from 'saga/sagas/finance.sagas';
import { FinanceProcessTypes } from '../sagas/Types';

/**
 * Finance Management Actions
 */

export const initFinanceProcessAction = () => ({
    type: FinanceProcessTypes.INIT_FINANCE_RATECARD
})

export const initFinanceAccuralsAction = () => ({
    type: FinanceProcessTypes.INIT_FINANCE_ACCURALS
})

export const initFinanceAccuralFileRequest = () => ({
    type: FinanceProcessTypes.INIT_FINANCE_ACCURALS_FILE_REQUEST
})

export const initFinanceCostCenterYTDAction = () => ({
    type: FinanceProcessTypes.INIT_FINANCE_COST_CENTER_YTD
})

export const initFinanceEntityMasterAction = () => ({
    type: FinanceProcessTypes.INIT_FINANCE_ENTITYMASTER
})

export const initFinanceMaterialMasterAction = () => ({
    type: FinanceProcessTypes.INIT_FINANCE_MATERIALMASTER
})

export const initCreateRateCardResetAction = () => ({
    type: FinanceProcessTypes.INIT_FINANCE_UPDATE_RATECARD_RESET
})

export const initProvisionsResetAction = () => ({
    type: FinanceProcessTypes.INIT_PROVISIONS_ACTION
})

export const initProvisionsUpdateAction = () => ({
    type: FinanceProcessTypes.INIT_PROVISIONS_UPDATE_ACTION
})

export const getAllRateCardDetailsAction = (data: any) => ({
    type: FinanceProcessTypes.GET_ALL_FINANCE_RATECARD_DETAILS,
    data
})

export const getAllRateCardDetailsSuccess = (data: any) => ({
    type: FinanceProcessTypes.GET_ALL_FINANCE_RATECARD_DETAILS_SUCCESS,
    data
})

export const getAllRateCardDetailsFailure = (error: any) => ({
    type: FinanceProcessTypes.GET_ALL_FINANCE_RATECARD_DETAILS_FAILURE,
    error
})

export const getRateCardDetailsAction = (data: any) => ({
    type: FinanceProcessTypes.GET_FINANCE_RATECARD_DETAILS,
    data
})

export const getRateCardDetailsSuccess = (data: any) => ({
    type: FinanceProcessTypes.GET_FINANCE_RATECARD_DETAILS_SUCCESS,
    data
})

export const getRateCardDetailsFailure = (error: any) => ({
    type: FinanceProcessTypes.GET_FINANCE_RATECARD_DETAILS_FAILURE,
    error
})

export const updateRateCardDetailsAction = (data: any) => ({
    type: FinanceProcessTypes.UPDATE_FINANCE_RATECARD_REQUEST,
    data
})

export const updateRateCardDetailsSuccess = (data: any) => ({
    type: FinanceProcessTypes.UPDATE_FINANCE_RATECARD_REQUEST_SUCCESS,
    data
})

export const updateRateCardDetailsFailure = (error: any) => ({
    type: FinanceProcessTypes.UPDATE_FINANCE_RATECARD_REQUEST_FAILURE,
    error
})

export const getAllAccuralsDetailsAction = (data: any) => ({
    type: FinanceProcessTypes.GET_ALL_FINANCE_ACCURALS_DETAILS,
    data
})

export const getAllAccuralsDetailsSuccess = (data: any) => ({
    type: FinanceProcessTypes.GET_ALL_FINANCE_ACCURALS_DETAILS_SUCCESS,
    data
})

export const getAllAccuralsDetailsFailure = (error: any) => ({
    type: FinanceProcessTypes.GET_ALL_FINANCE_ACCURALS_DETAILS_FAILURE,
    error
})

export const getAccuralsDetailsAction = (data: any) => ({
    type: FinanceProcessTypes.GET_FINANCE_ACCURALS_DETAILS_RESPONSE,
    data
})

export const getAccuralsDetailsSuccess = (data: any) => ({
    type: FinanceProcessTypes.GET_FINANCE_ACCURALS_DETAILS_SUCCESS,
    data
})

export const getAccuralsDetailsFailure = (error: any) => ({
    type: FinanceProcessTypes.GET_FINANCE_ACCURALS_DETAILS_FAILURE,
    error
})

export const updateAccuralDetailsAction = (data: any) => ({
    type: FinanceProcessTypes.UPDATE_ACCURALS_DETAILS_REQUEST,
    data
})

export const updateAccuralDetailsSuccess = (data: any) => ({
    type: FinanceProcessTypes.UPDATE_ACCURALS_DETAILS_SUCCESS,
    data
})

export const updateAccuralDetailsFailure = (error: any) => ({
    type: FinanceProcessTypes.UPDATE_ACCURALS_DETAILS_FAILURE,
    error
})

export const setAccuralFileUploadAction = (data: any) => ({
    type: FinanceProcessTypes.SET_ACCURAL_UPLOAD_FILE,
    data
})

export const setAccuralFileUploadSuccess = (data: any) => ({
    type: FinanceProcessTypes.SET_ACCURAL_UPLOAD_FILE_SUCCESS,
    data
})

export const setAccuralFileUploadFailure = (error: any) => ({
    type: FinanceProcessTypes.SET_ACCURAL_UPLOAD_FILE_FAILURE,
    error
})


export const setAccuralFileDownloadAction = (data: any) => ({
    type: FinanceProcessTypes.DOWNLOAD_ACCURAL_DETAILS_REQUEST,
    data
})

export const setAccuralFileDownloadSuccess = (data: any) => ({
    type: FinanceProcessTypes.DOWNLOAD_ACCURAL_DETAILS_REQUEST_SUCCESS,
    data
})

export const setAccuralFileDownloadFailure = (error: any) => ({
    type: FinanceProcessTypes.DOWNLOAD_ACCURAL_DETAILS_REQUEST_FAILURE,
    error
})

export const getAllCostCenterYTDDetailsAction = (data: any) => ({
    type: FinanceProcessTypes.GET_ALL_FINANCE_COST_CENTER_YTD_DETAILS,
    data
})

export const getAllCostCenterYTDDetailsSuccess = (data: any) => ({
    type: FinanceProcessTypes.GET_ALL_FINANCE_COST_CENTER_YTD_SUCCESS,
    data
})

export const getAllCostCenterYTDDetailsFailure = (error: any) => ({
    type: FinanceProcessTypes.GET_ALL_FINANCE_COST_CENTER_YTD_FAILURE,
    error
})

export const getCostCenterYTDDetailsAction = (data: any) => ({
    type: FinanceProcessTypes.GET_FINANCE_COST_CENTER_YTD_DETAILS,
    data
})

export const getCostCenterYTDDetailsSuccess = (data: any) => ({
    type: FinanceProcessTypes.GET_FINANCE_COST_CENTER_YTD_SUCCESS,
    data
})

export const getCostCenterYTDDetailsFailure = (error: any) => ({
    type: FinanceProcessTypes.GET_FINANCE_COST_CENTER_YTD_FAILURE,
    error
})


export const setCostCenterYTDUploadAction = (data: any) => ({
    type: FinanceProcessTypes.SET_COSTCENTER_YTD_UPLOAD_REQUEST,
    data
})

export const setCostCenterYTDUploadSuccess = (data: any) => ({
    type: FinanceProcessTypes.SET_COSTCENTER_YTD_UPLOAD_SUCCESS,
    data
})

export const setCostCenterYTDUploadFailure = (error: any) => ({
    type: FinanceProcessTypes.SET_COSTCENTER_YTD_UPLOAD_FAILURE,
    error
})

export const getAllEntityMasterDetailsAction = (data: any) => ({
    type: FinanceProcessTypes.GET_ALL_FINANCE_ENTITYMASTER_DETAILS,
    data
})

export const getAllEntityMasterDetailsSuccess = (data: any) => ({
    type: FinanceProcessTypes.GET_ALL_FINANCE_ENTITYMASTER_SUCCESS,
    data
})

export const getAllEntityMasterDetailsFailure = (error: any) => ({
    type: FinanceProcessTypes.GET_ALL_FINANCE_ENTITYMASTER_FAILURE,
    error
})

export const createEntityMasterRequestAction = (data: any) => ({
    type: FinanceProcessTypes.CREATE_ENTITY_MASTER_REQUEST,
    data
})

export const createEntityMasterRequestSuccess = (data: any) => ({
    type: FinanceProcessTypes.CREATE_ENTITY_MASTER_REQUEST_SUCCESS,
    data
})

export const createEntityMasterRequestFailure = (error: any) => ({
    type: FinanceProcessTypes.CREATE_ENTITY_MASTER_REQUEST_FAILURE,
    error
})

export const updateEntityMasterRequestAction = (data: any) => ({
    type: FinanceProcessTypes.UPDATE_ENTITY_MASTER_REQUEST,
    data
})

export const updateEntityMasterRequestSuccess = (data: any) => ({
    type: FinanceProcessTypes.UPDATE_ENTITY_MASTER_REQUEST_SUCCESS,
    data
})

export const updateEntityMasterRequestFailure = (error: any) => ({
    type: FinanceProcessTypes.UPDATE_ENTITY_MASTER_REQUEST_FAILURE,
    error
})

export const uploadEntityMasterFileAction = (data: any) => ({
    type: FinanceProcessTypes.SET_ENTITYMASTER_UPLOAD_REQUEST,
    data
})

export const uploadEntityMasterFileSuccess = (data: any) => ({
    type: FinanceProcessTypes.SET_ENTITYMASTER_UPLOAD_SUCCESS,
    data
})

export const uploadEntityMasterFileFailure = (error: any) => ({
    type: FinanceProcessTypes.SET_ENTITYMASTER_UPLOAD_FAILURE,
    error
})

export const getAllSLAContractsDetailsAction = (data: any) => ({
    type: FinanceProcessTypes.GET_SLA_CONTRACTS_LIST_DETAILS,
    data
})

export const getAllSLAContractsDetailsSuccess = (data: any) => ({
    type: FinanceProcessTypes.GET_SLA_CONTRACTS_LIST_SUCCESS,
    data
})

export const getAllSLAContractsDetailsFailure = (error: any) => ({
    type: FinanceProcessTypes.GET_SLA_CONTRACTS_LIST_FAILURE,
    error
})


export const getAllSLACountryDetailsAction = (data: any) => ({
    type: FinanceProcessTypes.GET_SLA_COUNTRYS_LIST_DETAILS,
    data
})

export const getAllSLACountryDetailsSuccess = (data: any) => ({
    type: FinanceProcessTypes.GET_SLA_COUNTRYS_LIST_SUCCESS,
    data
})

export const getAllSLACountryDetailssFailure = (error: any) => ({
    type: FinanceProcessTypes.GET_SLA_COUNTRYS_LIST_FAILURE,
    error
})

export const getAllMaterialMasterDetailsAction = (data: any) => ({
    type: FinanceProcessTypes.GET_ALL_FINANCE_MATERIALMASTER_DETAILS,
    data
})

export const getAllMaterialMasterDetailsSuccess = (data: any) => ({
    type: FinanceProcessTypes.GET_ALL_FINANCE_MATERIALMASTER_SUCCESS,
    data
})

export const getAllMaterialMasterDetailsFailure = (error: any) => ({
    type: FinanceProcessTypes.GET_ALL_FINANCE_MATERIALMASTER_FAILURE,
    error
})

export const createMaterialMasterRequestAction = (data: any) => ({
    type: FinanceProcessTypes.CREATE_MATERIAL_MASTER_REQUEST,
    data
})

export const createMaterialMasterRequestSuccess = (data: any) => ({
    type: FinanceProcessTypes.CREATE_MATERIAL_MASTER_REQUEST_SUCCESS,
    data
})

export const createMaterialMasterRequestFailure = (error: any) => ({
    type: FinanceProcessTypes.CREATE_ENTITY_MASTER_REQUEST_FAILURE,
    error
})

export const updateMaterialMasterRequestAction = (data: any) => ({
    type: FinanceProcessTypes.UPDATE_MATERIAL_MASTER_REQUEST,
    data
})

export const updateMaterialMasterRequestSuccess = (data: any) => ({
    type: FinanceProcessTypes.UPDATE_MATERIAL_MASTER_REQUEST_SUCCESS,
    data
})

export const updateMaterialMasterRequestFailure = (error: any) => ({
    type: FinanceProcessTypes.UPDATE_MATERIAL_MASTER_REQUEST_FAILURE,
    error
})

export const uploadMaterialMasterFileAction = (data: any) => ({
    type: FinanceProcessTypes.SET_MATERIALMASTER_UPLOAD_REQUEST,
    data
})

export const uploadMaterialMasterFileSuccess = (data: any) => ({
    type: FinanceProcessTypes.SET_MATERIALMASTER_UPLOAD_SUCCESS,
    data
})

export const uploadMaterialMasterFileFailure = (error: any) => ({
    type: FinanceProcessTypes.SET_MATERIALMASTER_UPLOAD_FAILURE,
    error
})

export const getAllProvisionsCostCenterAction = (data: any) => ({
    type: FinanceProcessTypes.GET_PROVISIONS_COSTCENTER_REQUEST,
    data
})

export const getAllProvisionsCostCenterSuccess = (data: any) => ({
    type: FinanceProcessTypes.GET_PROVISIONS_COSTCENTER_SUCCESS,
    data
})

export const getAllProvisionsCostCenterFailure = (error: any) => ({
    type: FinanceProcessTypes.GET_PROVISIONS_COSTCENTER_FAILURE,
    error
})

export const getAllProvisionsStatusAction = (data: any) => ({
    type: FinanceProcessTypes.GET_PROVISIONS_STATUS_REQUEST,
    data
})

export const getAllProvisionsStatusSuccess = (data: any) => ({
    type: FinanceProcessTypes.GET_PROVISIONS_STATUS_SUCCESS,
    data
})

export const getAllProvisionsStatusFailure = (error: any) => ({
    type: FinanceProcessTypes.GET_PROVISIONS_STATUS_FAILURE,
    error
})

export const getProvisionsFilterDetailsAction = (data: any) => ({
    type: FinanceProcessTypes.GET_PROVISIONS_FILTER_REQUEST,
    data
})

export const getProvisionsFilterDetailsSuccess = (data: any) => ({
    type: FinanceProcessTypes.GET_PROVISIONS_FILTER_SUCCESS,
    data
})

export const getProvisionsFilterDetailsFailure = (error: any) => ({
    type: FinanceProcessTypes.GET_PROVISIONS_FILTER_FAILURE,
    error
})

export const updateProvisionsDetailsAction = (data: any) => ({
    type: FinanceProcessTypes.UPDATE_PROVISIONS_DATA_REQUEST,
    data
})

export const updateProvisionsDetailsSuccess = (data: any) => ({
    type: FinanceProcessTypes.UPDATE_PROVISIONS_DATA_SUCCESS,
    data
})

export const updateProvisionsDetailsFailure = (error: any) => ({
    type: FinanceProcessTypes.UPDATE_PROVISIONS_DATA_FAILURE,
    error
})

export const getProvisionsOverallMetricsAction = (data: any) => ({
    type: FinanceProcessTypes.GET_PROVISIONS_OVERALL_METRICS_REQUEST,
    data
})

export const getProvisionsOverallMetricsSuccess = (data: any) => ({
    type: FinanceProcessTypes.GET_PROVISIONS_OVERALL_METRICS_SUCCESS,
    data
})

export const getProvisionsOverallMetricsFailure = (error: any) => ({
    type: FinanceProcessTypes.GET_PROVISIONS_OVERALL_METRICS_FAILURE,
    error
})

export const checkAddProvisionDetailAction = (data: any) => ({
    type: FinanceProcessTypes.CHECK_ADD_PROVISIONS_DETAILS_REQUEST,
    data
})

export const checkAddProvisionDetailSuccess = (data: any) => ({
    type: FinanceProcessTypes.CHECK_ADD_PROVISIONS_DETAILS_SUCCESS,
    data
})

export const checkAddProvisionDetailFailure = (error: any) => ({
    type: FinanceProcessTypes.CHECK_ADD_PROVISIONS_DETAILS_FAILURE,
    error
})

export const setProvisionsArchieveDownloadAction = (data: any) => ({
    type: FinanceProcessTypes.DOWNLOAD_PROVISIONS_ARCHIEVE_REQUEST,
    data
})

export const setProvisionsArchieveDownloadSuccess = (data: any) => ({
    type: FinanceProcessTypes.DOWNLOAD_PROVISIONS_ARCHIEVE_SUCCESS,
    data
})

export const setProvisionsArchieveDownloadFailure = (error: any) => ({
    type: FinanceProcessTypes.DOWNLOAD_PROVISIONS_ARCHIEVE_FAILURE,
    error
})

export const downloadProvisionsOverallDetailsAction = (data: any) => ({
    type: FinanceProcessTypes.DOWNLOAD_PROVISIONS_OVERALL_DETAILS_REQUEST,
    data
})

export const downloadProvisionsOverallDetailsSuccess = (data: any) => ({
    type: FinanceProcessTypes.DOWNLOAD_PROVISIONS_OVERALL_DETAILS_SUCCESS,
    data
})

export const downloadProvisionsOverallDetailsFailure = (error: any) => ({
    type: FinanceProcessTypes.DOWNLOAD_PROVISIONS_OVERALL_DETAILS_FAILURE,
    error
})


// This is function is used to put program name
export const clearFinanceStatus = function* () {
    yield takeEvery(FinanceProcessTypes.CLEAR_FINANCE_REQUEST, clearFinanceStatusDetail);
}

export const reqClearFinanceStatus = (postValue?: any) => {
    return {
        type: FinanceProcessTypes.CLEAR_FINANCE_REQUEST,
        payload: postValue
    }
}

export const clearFinanceStatusSuccess = (postValue?: any) => {
    return {
        type: FinanceProcessTypes.CLEAR_FINANCE_SUCCESS,
        payload: postValue
    }
}