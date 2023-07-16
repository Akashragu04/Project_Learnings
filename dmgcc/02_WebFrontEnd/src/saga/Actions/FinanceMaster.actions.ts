import { takeEvery } from "redux-saga/effects";
import {FinanceActionTypes} from '../Types/Finance.Types';
import {reqFinanceCostCentreData, editFinanceCostCentreData, getFinanceCostCentreData, 
    downloadFinanceCostCentreData, uploadFinanceCostCentreData, reqAddFinanceIOMappingData, getFinanceIOMappingData, 
    downloadFinanceIOMappingData, uploadFinanceIOMappingData, reqAddFinanceForoxRateeData, 
    editFinanceForoxRateData, getFinanceForoxRateData, downloadFinanceForoxRateData, uploadFinanceForoxRateData, 
    uploadFinanceVendorData, reqAddFinanceVendoreData, editFinanceVendorData, getFinanceVendorData, 
    uploadFinanceIODumpData, reqAddFinanceIODumpeData, editFinanceIODumpData, getFinanceIODumpData, 
    getFinanceRateCardData, uploadFinanceRateCardData, editFinanceRateCardData, addFinanceRateCardData, downloadFileObjectCommonData, clearStatusDetail, getIoCcChartData, getMarketDataDetail, putMarketDataDetail, onChangeCostCenterStatusDetail} from '../sagas/FinanceMaster.sagas';

// This is function is used to Operation
export const AddFinanceCostCentre = function* () {
    yield takeEvery(FinanceActionTypes.ADD_COST_CENTRE_REQUEST, reqFinanceCostCentreData);
}
export const  reqFinanceAddCostCentre = (postValue?: any) => {
    return {
        type: FinanceActionTypes.ADD_COST_CENTRE_REQUEST,
        payload: postValue
    }
}

export const  addFinanceCostCentreSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.ADD_COST_CENTRE_SUCCESS,
        payload: postValue
    }
}

export const  addFinanceCostCentreFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.ADD_COST_CENTRE_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const editFinanceCostCentre = function* () {
    yield takeEvery(FinanceActionTypes.EDIT_COST_CENTRE_REQUEST, editFinanceCostCentreData);
}
export const  reqEditFinanceCostCentre = (postValue?: any) => {
    return {
        type: FinanceActionTypes.EDIT_COST_CENTRE_REQUEST,
        payload: postValue
    }
}

export const  editFinanceCostCentreSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.EDIT_COST_CENTRE_SUCCESS,
        payload: postValue
    }
}

export const  editFinanceCostCentreFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.EDIT_COST_CENTRE_ERROR,
        payload: errors
    }
}


// This is function is used to Operation
export const getIoCcChart = function* () {
    yield takeEvery(FinanceActionTypes.GET_IO_CC_CHART_REQUEST, getIoCcChartData);
}
export const  reqIoCcChart = (postValue?: any) => {
    return {
        type: FinanceActionTypes.GET_IO_CC_CHART_REQUEST,
        payload: postValue
    }
}

export const  getIoCcChartSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.GET_IO_CC_CHART_SUCCESS,
        payload: postValue
    }
}

export const   getIoCcChartFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.GET_IO_CC_CHART_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const getFinanceCostCentre = function* () {
    yield takeEvery(FinanceActionTypes.GET_COST_CENTRE_REQUEST, getFinanceCostCentreData);
}
export const  reqGetFinanceCostCentre = (postValue?: any) => {
    return {
        type: FinanceActionTypes.GET_COST_CENTRE_REQUEST,
        payload: postValue
    }
}

export const  getFinanceCostCentreSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.GET_COST_CENTRE_SUCCESS,
        payload: postValue
    }
}

export const  getFinanceCostCentreFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.GET_COST_CENTRE_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const downloadFinanceCostCentre = function* () {
    yield takeEvery(FinanceActionTypes.DOWNLOAD_COST_CENTRE_REQUEST, downloadFinanceCostCentreData);
}
export const  reqDownloadFinanceCostCentre = (postValue?: any) => {
    return {
        type: FinanceActionTypes.DOWNLOAD_COST_CENTRE_REQUEST,
        payload: postValue
    }
}

export const  downloadFinanceCostCentreSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.DOWNLOAD_COST_CENTRE_SUCCESS,
        payload: postValue
    }
}

export const  downloadFinanceCostCentreFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.DOWNLOAD_COST_CENTRE_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const uploadFinanceCostCentre = function* () {
    yield takeEvery(FinanceActionTypes.UPLOAD_FILE_COST_CENTRE_REQUEST, uploadFinanceCostCentreData);
}
export const  reqUploadFinanceCostCentre = (postValue?: any) => {
    return {
        type: FinanceActionTypes.UPLOAD_FILE_COST_CENTRE_REQUEST,
        payload: postValue
    }
}

export const  uploadFinanceCostCentreSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.UPLOAD_FILE_COST_CENTRE_SUCCESS,
        payload: postValue
    }
}

export const  uploadFinanceCostCentreFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.UPLOAD_FILE_COST_CENTRE_ERROR,
        payload: errors
    }
}

// This is function is used to IO Mapping
export const AddFinanceIOMapping = function* () {
    yield takeEvery(FinanceActionTypes.ADD_IO_MAPPING_REQUEST, reqAddFinanceIOMappingData);
}
export const  reqAddFinanceIOMapping = (postValue?: any) => {
    return {
        type: FinanceActionTypes.ADD_IO_MAPPING_REQUEST,
        payload: postValue
    }
}

export const  addFinanceIOMappingSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.ADD_IO_MAPPING_SUCCESS,
        payload: postValue
    }
}

export const  addFinanceIOMappingFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.ADD_IO_MAPPING_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const getFinanceIOMapping = function* () {
    yield takeEvery(FinanceActionTypes.GET_IO_MAPPING_REQUEST, getFinanceIOMappingData);
}
export const  reqGetFinanceIOMapping = (postValue?: any) => {
    return {
        type: FinanceActionTypes.GET_IO_MAPPING_REQUEST,
        payload: postValue
    }
}

export const  getFinanceIOMappingSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.GET_IO_MAPPING_SUCCESS,
        payload: postValue
    }
}

export const  getFinanceIOMappingFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.GET_IO_MAPPING_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const downloadFinanceIOMapping = function* () {
    yield takeEvery(FinanceActionTypes.DOWNLOAD_IO_MAPPING_REQUEST, downloadFinanceIOMappingData);
}
export const  reqDownloadFinanceIOMapping = (postValue?: any) => {
    return {
        type: FinanceActionTypes.DOWNLOAD_IO_MAPPING_REQUEST,
        payload: postValue
    }
}

export const  downloadFinanceIOMappingSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.DOWNLOAD_IO_MAPPING_SUCCESS,
        payload: postValue
    }
}

export const  downloadFinanceIOMappingFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.DOWNLOAD_IO_MAPPING_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const uploadFinanceIOMapping = function* () {
    yield takeEvery(FinanceActionTypes.UPLOAD_FILE_IO_MAPPING_REQUEST, uploadFinanceIOMappingData);
}
export const  reqUploadFinanceIOMapping = (postValue?: any) => {
    return {
        type: FinanceActionTypes.UPLOAD_FILE_IO_MAPPING_REQUEST,
        payload: postValue
    }
}

export const  uploadFinanceIOMappingSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.UPLOAD_FILE_IO_MAPPING_SUCCESS,
        payload: postValue
    }
}

export const  uploadFinanceIOMappingFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.UPLOAD_FILE_IO_MAPPING_ERROR,
        payload: errors
    }
}


// This is function is used to Operation
export const AddFinanceForoxRate = function* () {
    yield takeEvery(FinanceActionTypes.ADD_FOREX_RATES_REQUEST, reqAddFinanceForoxRateeData);
}
export const  reqFinanceAddForoxRate = (postValue?: any) => {
    return {
        type: FinanceActionTypes.ADD_FOREX_RATES_REQUEST,
        payload: postValue
    }
}

export const  addFinanceForoxRateSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.ADD_FOREX_RATES_SUCCESS,
        payload: postValue
    }
}

export const  addFinanceForoxRateFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.ADD_FOREX_RATES_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const editFinanceForoxRate = function* () {
    yield takeEvery(FinanceActionTypes.EDIT_FOREX_RATES_REQUEST, editFinanceForoxRateData);
}
export const  reqEditFinanceForoxRate = (postValue?: any) => {
    return {
        type: FinanceActionTypes.EDIT_FOREX_RATES_REQUEST,
        payload: postValue
    }
}

export const  editFinanceForoxRateSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.EDIT_FOREX_RATES_SUCCESS,
        payload: postValue
    }
}

export const  editFinanceForoxRateFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.EDIT_FOREX_RATES_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const getFinanceForoxRate = function* () {
    yield takeEvery(FinanceActionTypes.GET_FOREX_RATES_REQUEST, getFinanceForoxRateData);
}
export const  reqGetFinanceForoxRate = (postValue?: any) => {
    return {
        type: FinanceActionTypes.GET_FOREX_RATES_REQUEST,
        payload: postValue
    }
}

export const  getFinanceForoxRateSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.GET_FOREX_RATES_SUCCESS,
        payload: postValue
    }
}

export const  getFinanceForoxRateFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.GET_FOREX_RATES_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const downloadFinanceForoxRate = function* () {
    yield takeEvery(FinanceActionTypes.DOWNLOAD_FOREX_RATES_REQUEST, downloadFinanceForoxRateData);
}
export const  reqDownloadFinanceForoxRate = (postValue?: any) => {
    return {
        type: FinanceActionTypes.DOWNLOAD_FOREX_RATES_REQUEST,
        payload: postValue
    }
}

export const  downloadFinanceForoxRateSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.DOWNLOAD_FOREX_RATES_SUCCESS,
        payload: postValue
    }
}

export const  downloadFinanceForoxRateFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.DOWNLOAD_FOREX_RATES_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const uploadFinanceForoxRate = function* () {
    yield takeEvery(FinanceActionTypes.UPLOAD_FILE_FOREX_RATES_REQUEST, uploadFinanceForoxRateData);
}
export const  reqUploadFinanceForoxRate = (postValue?: any) => {
    return {
        type: FinanceActionTypes.UPLOAD_FILE_FOREX_RATES_REQUEST,
        payload: postValue
    }
}

export const  uploadFinanceForoxRateSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.UPLOAD_FILE_FOREX_RATES_SUCCESS,
        payload: postValue
    }
}

export const  uploadFinanceForoxRateFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.UPLOAD_FILE_FOREX_RATES_ERROR,
        payload: errors
    }
}


// This is function is used to Vendor
export const AddFinanceVendor = function* () {
    yield takeEvery(FinanceActionTypes.ADD_VENDOR_REQUEST, reqAddFinanceVendoreData);
}
export const  reqFinanceAddVendor = (postValue?: any) => {
    return {
        type: FinanceActionTypes.ADD_VENDOR_REQUEST,
        payload: postValue
    }
}

export const  addFinanceVendorSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.ADD_VENDOR_SUCCESS,
        payload: postValue
    }
}

export const  addFinanceVendorFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.ADD_VENDOR_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const editFinanceVendor = function* () {
    yield takeEvery(FinanceActionTypes.EDIT_VENDOR_REQUEST, editFinanceVendorData);
}
export const  reqEditFinanceVendor = (postValue?: any) => {
    return {
        type: FinanceActionTypes.EDIT_VENDOR_REQUEST,
        payload: postValue
    }
}

export const  editFinanceVendorSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.EDIT_VENDOR_SUCCESS,
        payload: postValue
    }
}

export const  editFinanceVendorFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.EDIT_VENDOR_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const getFinanceVendor = function* () {
    yield takeEvery(FinanceActionTypes.GET_VENDOR_REQUEST, getFinanceVendorData);
}
export const  reqGetFinanceVendor = (postValue?: any) => {
    return {
        type: FinanceActionTypes.GET_VENDOR_REQUEST,
        payload: postValue
    }
}

export const  getFinanceVendorSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.GET_VENDOR_SUCCESS,
        payload: postValue
    }
}

export const  getFinanceVendorFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.EDIT_VENDOR_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const uploadFinanceVendor = function* () {
    yield takeEvery(FinanceActionTypes.UPLOAD_VENDOR_REQUEST, uploadFinanceVendorData);
}
export const  reqUploadFinanceVendor = (postValue?: any) => {
    return {
        type: FinanceActionTypes.UPLOAD_VENDOR_REQUEST,
        payload: postValue
    }
}

export const  uploadFinanceVendorSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.UPLOAD_VENDOR_SUCCESS,
        payload: postValue
    }
}

export const  uploadFinanceVendorFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.UPLOAD_VENDOR_ERROR,
        payload: errors
    }
}


// This is function is used to IO Dump
export const AddFinanceIODump = function* () {
    yield takeEvery(FinanceActionTypes.ADD_IODUMP_REQUEST, reqAddFinanceIODumpeData);
}
export const  reqFinanceAddIODump = (postValue?: any) => {
    return {
        type: FinanceActionTypes.ADD_IODUMP_REQUEST,
        payload: postValue
    }
}

export const  addFinanceIODumpSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.ADD_IODUMP_SUCCESS,
        payload: postValue
    }
}

export const  addFinanceIODumpFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.ADD_IODUMP_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const editFinanceIODump = function* () {
    yield takeEvery(FinanceActionTypes.EDIT_IODUMP_REQUEST, editFinanceIODumpData);
}
export const  reqEditFinanceIODump = (postValue?: any) => {
    return {
        type: FinanceActionTypes.EDIT_IODUMP_REQUEST,
        payload: postValue
    }
}

export const  editFinanceIODumpSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.EDIT_IODUMP_SUCCESS,
        payload: postValue
    }
}

export const  editFinanceIODumpFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.EDIT_IODUMP_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const getFinanceIODump = function* () {
    yield takeEvery(FinanceActionTypes.GET_IODUMP_REQUEST, getFinanceIODumpData);
}
export const  reqGetFinanceIODump = (postValue?: any) => {
    return {
        type: FinanceActionTypes.GET_IODUMP_REQUEST,
        payload: postValue
    }
}

export const  getFinanceIODumpSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.GET_IODUMP_SUCCESS,
        payload: postValue
    }
}

export const  getFinanceIODumpFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.GET_IODUMP_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const uploadFinanceIODump = function* () {
    yield takeEvery(FinanceActionTypes.UPDATE_IODUMP_REQUEST, uploadFinanceIODumpData);
}
export const  reqUploadFinanceIODump = (postValue?: any) => {
    return {
        type: FinanceActionTypes.UPDATE_IODUMP_REQUEST,
        payload: postValue
    }
}

export const  uploadFinanceIODumpSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.UPDATE_IODUMP_SUCCESS,
        payload: postValue
    }
}

export const  uploadFinanceIODumpFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.UPDATE_IODUMP_ERROR,
        payload: errors
    }
}



// This is function is used to Rate card
export const getFinanceRateCard = function* () {
    yield takeEvery(FinanceActionTypes.GET_RATE_CARD_REQUEST, getFinanceRateCardData);
}
export const  reqGetFinanceRateCard = (postValue?: any) => {
    return {
        type: FinanceActionTypes.GET_RATE_CARD_REQUEST,
        payload: postValue
    }
}

export const  getFinanceRateCardSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.GET_RATE_CARD_SUCCESS,
        payload: postValue
    }
}

export const  getFinanceRateCardFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.GET_RATE_CARD_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const uploadFinanceRateCard = function* () {
    yield takeEvery(FinanceActionTypes.UPLOAD_FILE_RATE_CARD_REQUEST, uploadFinanceRateCardData);
}
export const  reqUploadFinanceRateCard = (postValue?: any) => {
    return {
        type: FinanceActionTypes.UPLOAD_FILE_RATE_CARD_REQUEST,
        payload: postValue
    }
}

export const  uploadFinanceRateCardSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.UPLOAD_FILE_RATE_CARD_SUCCESS,
        payload: postValue
    }
}

export const  uploadFinanceRateCardFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.UPLOAD_FILE_RATE_CARD_ERROR,
        payload: errors
    }
}


export const addFinanceRateCard = function* () {
    yield takeEvery(FinanceActionTypes.ADD_RATE_CARD_REQUEST, addFinanceRateCardData);
}
export const  reqAddFinanceRateCard = (postValue?: any) => {
    return {
        type: FinanceActionTypes.ADD_RATE_CARD_REQUEST,
        payload: postValue
    }
}

export const  addFinanceRateCardSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.ADD_RATE_CARD_SUCCESS,
        payload: postValue
    }
}

export const  addFinanceRateCardFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.ADD_RATE_CARD_ERROR,
        payload: errors
    }
}


export const editFinanceRateCard = function* () {
    yield takeEvery(FinanceActionTypes.EDIT_RATE_CARD_REQUEST, editFinanceRateCardData);
}
export const  reqEditFinanceRateCard = (postValue?: any) => {
    return {
        type: FinanceActionTypes.EDIT_RATE_CARD_REQUEST,
        payload: postValue
    }
}

export const  editFinanceRateCardSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.EDIT_RATE_CARD_SUCCESS,
        payload: postValue
    }
}

export const  editFinanceRateCardFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.EDIT_RATE_CARD_ERROR,
        payload: errors
    }
}


export const downloadFileObjectCommon = function* () {
    yield takeEvery(FinanceActionTypes.FILE_DOWNLOAD_COMMON_REQUEST, downloadFileObjectCommonData);
}
export const  reqDownloadFileObjectCommon = (postValue?: any) => {
    return {
        type: FinanceActionTypes.FILE_DOWNLOAD_COMMON_REQUEST,
        payload: postValue
    }
}

export const  downloadFileObjectCommonSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.FILE_DOWNLOAD_COMMON_SUCCESS,
        payload: postValue
    }
}

export const  downloadFileObjectCommonFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.FILE_DOWNLOAD_COMMON_ERROR,
        payload: errors
    }
}


export const getMarketData = function* () {
    yield takeEvery(FinanceActionTypes.GET_MARKET_DATA_REQUEST, getMarketDataDetail);
}
export const  reqMarketData = (postValue?: any) => {
    return {
        type: FinanceActionTypes.GET_MARKET_DATA_REQUEST,
        payload: postValue
    }
}

export const  getMarketDataSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.GET_MARKET_DATA_SUCCESS,
        payload: postValue
    }
}

export const  getMarketDataFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.GET_MARKET_DATA_ERROR,
        payload: errors
    }
}


export const putMarketData = function* () {
    yield takeEvery(FinanceActionTypes.PUT_MARKET_DATA_REQUEST, putMarketDataDetail);
}
export const  reqPutMarketData = (postValue?: any) => {
    return {
        type: FinanceActionTypes.PUT_MARKET_DATA_REQUEST,
        payload: postValue
    }
}

export const  putMarketDataSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.PUT_MARKET_DATA_SUCCESS,
        payload: postValue
    }
}

export const  putMarketDataFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.PUT_MARKET_DATA_ERROR,
        payload: errors
    }
}

export const onChangeCostCenterStatus = function* () {
    yield takeEvery(FinanceActionTypes.COST_CENTRE_BLOCK_REQUEST, onChangeCostCenterStatusDetail);
}
export const  reqChangeCostCenterStatus = (postValue?: any) => {
    return {
        type: FinanceActionTypes.COST_CENTRE_BLOCK_REQUEST,
        payload: postValue
    }
}

export const  onChangeCostCenterStatusSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.COST_CENTRE_BLOCK_SUCCESS,
        payload: postValue
    }
}

export const  onChangeCostCenterStatusFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: FinanceActionTypes.COST_CENTRE_BLOCK_ERROR,
        payload: errors
    }
}

// This is function is used to put program name
export const clearStatus = function* () {
    yield takeEvery(FinanceActionTypes.CLEAR_STATUS_REQUEST, clearStatusDetail);
}

export const reqClearStatus = (postValue?: any) => {
    return {
        type: FinanceActionTypes.CLEAR_STATUS_REQUEST,
        payload: postValue
    }
}

export const clearStatusSuccess = (postValue?: any) => {
    return {
        type: FinanceActionTypes.CLEAR_STATUS_SUCCESS,
        payload: postValue
    }
}