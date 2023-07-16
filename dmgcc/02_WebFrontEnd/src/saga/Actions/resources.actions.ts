import { takeEvery } from "redux-saga/effects";
import {ResourcesActionTypes} from '../Types/Resources.Types';
import {getCostCentreData, getCostCentreResourceData, getResourceRecordData, 
    putResourceRecordData, getUtilizationData, getEmployeeData, 
    putThirdpartyResource, getThirdpartyResourceData, postThirdpartyResource, 
    deleteThirdpartyResourceData, reqResourceDetailData, reqJDMappingInfo, reqJDMappingData, putJDMappingData, restInitialDetails} from '../sagas/resources.sagas';

// This is function is used to Operation
export const getCostCentre = function* () {
    yield takeEvery(ResourcesActionTypes.COST_CENTRE_REQUEST, getCostCentreData);
}
export const  reqCostCentreList = (postValue?: any) => {
    return {
        type: ResourcesActionTypes.COST_CENTRE_REQUEST,
        payload: postValue
    }
}

export const  getCostCentreSuccess = (postValue?: any) => {
    return {
        type: ResourcesActionTypes.COST_CENTRE_SUCCESS,
        payload: postValue
    }
}

export const  getCostCentreFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ResourcesActionTypes.COST_CENTRE_ERROR,
        payload: errors
    }
}


export const getCostCentreResource = function* () {
    yield takeEvery(ResourcesActionTypes.COST_CENTRE_RESOURCE_REQUEST, getCostCentreResourceData);
}

export const  requestCostCentreResource = (data?: any) => {
    return {
        type: ResourcesActionTypes.COST_CENTRE_RESOURCE_REQUEST,
        payload: data
    }
}

export const  getCostCentreResourceSuccess = (postValue?: any) => {
    return {
        type: ResourcesActionTypes.COST_CENTRE_RESOURCE_SUCCESS,
        payload: postValue
    }
}

export const  getCostCentreResourceFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ResourcesActionTypes.COST_CENTRE_RESOURCE_ERROR,
        payload: errors
    }
}



export const getResourceRecord = function* () {
    yield takeEvery(ResourcesActionTypes.GET_RESOURCE_RECORD_REQUEST, getResourceRecordData);
}

export const  reqResourceRecord = (data?: any) => {
    return {
        type: ResourcesActionTypes.GET_RESOURCE_RECORD_REQUEST,
        payload: data
    }
}

export const  getResourceRecordSuccess = (postValue?: any) => {
    return {
        type: ResourcesActionTypes.GET_RESOURCE_RECORD_SUCCESS,
        payload: postValue
    }
}

export const  getResourceRecordFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ResourcesActionTypes.GET_RESOURCE_RECORD_ERROR,
        payload: errors
    }
}



export const putResourceRecord = function* () {
    yield takeEvery(ResourcesActionTypes.UPDATE_RESOURCE_RECORD_REQUEST, putResourceRecordData);
}

export const  reqResourceRecordInfo = (data?: any) => {
    return {
        type: ResourcesActionTypes.UPDATE_RESOURCE_RECORD_REQUEST,
        payload: data
    }
}

export const  putResourceRecordSuccess = (postValue?: any) => {
    return {
        type: ResourcesActionTypes.UPDATE_RESOURCE_RECORD_SUCCESS,
        payload: postValue
    }
}

export const  putResourceRecordFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ResourcesActionTypes.UPDATE_RESOURCE_RECORD_ERROR,
        payload: errors
    }
}


export const getUtilization = function* () {
    yield takeEvery(ResourcesActionTypes.GET_UTILIZATION_DATA_REQUEST, getUtilizationData);
}

export const  reqUtilization = (data?: any) => {
    return {
        type: ResourcesActionTypes.GET_UTILIZATION_DATA_REQUEST,
        payload: data
    }
}

export const  getUtilizationSuccess = (postValue?: any) => {
    return {
        type: ResourcesActionTypes.GET_UTILIZATION_DATA_SUCCESS,
        payload: postValue
    }
}

export const  getUtilizationFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ResourcesActionTypes.GET_UTILIZATION_DATA_ERROR,
        payload: errors
    }
}


export const getEmployee = function* () {
    yield takeEvery(ResourcesActionTypes.GET_EMPLOYEE_LIST_REQUEST, getEmployeeData);
}

export const reqEmployee = (data?: any) => {
    return {
        type: ResourcesActionTypes.GET_EMPLOYEE_LIST_REQUEST,
        payload: data
    }
}

export const getEmployeeSuccess = (postValue?: any) => {
    return {
        type: ResourcesActionTypes.GET_EMPLOYEE_LIST_SUCCESS,
        payload: postValue
    }
}

export const getEmployeeFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ResourcesActionTypes.GET_EMPLOYEE_LIST_ERROR,
        payload: errors
    }
}

//This add Thirdparty Resource services start
export const getThirdpartyResource = function* () {
    yield takeEvery(ResourcesActionTypes.GET_THIRDPART_RESOURCE_REQUEST, getThirdpartyResourceData);
}

export const reqThirdpartyResource = (data?: any) => {
    return {
        type: ResourcesActionTypes.GET_THIRDPART_RESOURCE_REQUEST,
        payload: data
    }
}

export const getThirdpartyResourceSuccess = (postValue?: any) => {
    return {
        type: ResourcesActionTypes.GET_THIRDPART_RESOURCE_SUCCESS,
        payload: postValue
    }
}

export const getThirdpartyResourceFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ResourcesActionTypes.GET_THIRDPART_RESOURCE_ERROR,
        payload: errors
    }
}



export const addThirdpartyResource = function* () {
    yield takeEvery(ResourcesActionTypes.ADD_THIRDPART_RESOURCE_REQUEST, postThirdpartyResource);
}

export const addReqThirdpartyResource = (data?: any) => {
    return {
        type: ResourcesActionTypes.ADD_THIRDPART_RESOURCE_REQUEST,
        payload: data
    }
}

export const addThirdpartyResourceSuccess = (postValue?: any) => {
    return {
        type: ResourcesActionTypes.ADD_THIRDPART_RESOURCE_SUCCESS,
        payload: postValue
    }
}

export const addThirdpartyResourceFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ResourcesActionTypes.ADD_THIRDPART_RESOURCE_ERROR,
        payload: errors
    }
}



export const updateThirdpartyResource = function* () {
    yield takeEvery(ResourcesActionTypes.UPDATE_THIRDPART_RESOURCE_REQUEST, putThirdpartyResource);
}

export const reqUpdateThirdpartyResource = (data?: any) => {
    return {
        type: ResourcesActionTypes.UPDATE_THIRDPART_RESOURCE_REQUEST,
        payload: data
    }
}

export const updateThirdpartyResourceSuccess = (postValue?: any) => {
    return {
        type: ResourcesActionTypes.UPDATE_THIRDPART_RESOURCE_SUCCESS,
        payload: postValue
    }
}

export const updateThirdpartyResourceFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ResourcesActionTypes.UPDATE_THIRDPART_RESOURCE_ERROR,
        payload: errors
    }
}


export const deleteThirdpartyResource = function* () {
    yield takeEvery(ResourcesActionTypes.DELETE_THIRDPART_RESOURCE_REQUEST, deleteThirdpartyResourceData);
}

export const reqDeleteThirdpartyResource = (data?: any) => {
    return {
        type: ResourcesActionTypes.DELETE_THIRDPART_RESOURCE_REQUEST,
        payload: data
    }
}

export const deleteThirdpartyResourceSuccess = (postValue?: any) => {
    return {
        type: ResourcesActionTypes.DELETE_THIRDPART_RESOURCE_SUCCESS,
        payload: postValue
    }
}

export const deleteThirdpartyResourceFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ResourcesActionTypes.DELETE_THIRDPART_RESOURCE_ERROR,
        payload: errors
    }
}


// This is a function used to get Resource details
export const getResourceDetails = function* () {
    yield takeEvery(ResourcesActionTypes.GET_RESOURCE_DETAIL_REQUEST, reqResourceDetailData);
}

export const reqResourceDetails = (data?: any) => {
    return {
        type: ResourcesActionTypes.GET_RESOURCE_DETAIL_REQUEST,
        payload: data
    }
}

export const getResourceDetailsSuccess = (postValue?: any) => {
    return {
        type: ResourcesActionTypes.GET_RESOURCE_DETAIL_SUCCESS,
        payload: postValue
    }
}

export const getResourceDetailsFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ResourcesActionTypes.GET_RESOURCE_DETAIL_ERROR,
        payload: errors
    }
}

// This is a function used to get JD Mapping details
export const getJDMappingDetails = function* () {
    yield takeEvery(ResourcesActionTypes.GET_JD_DETAIL_REQUEST, reqJDMappingInfo);
}

export const reqJDMappingDetails = (data?: any) => {
    return {
        type: ResourcesActionTypes.GET_JD_DETAIL_REQUEST,
        payload: data
    }
}

export const getJDMappingDetailsSuccess = (postValue?: any) => {
    return {
        type: ResourcesActionTypes.GET_JD_DETAIL_SUCCESS,
        payload: postValue
    }
}

export const getJDMappingDetailsFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ResourcesActionTypes.GET_JD_DETAIL_ERROR,
        payload: errors
    }
}

// This is a function used to get JD Mapping details
export const postJDMappingDetails = function* () {
    yield takeEvery(ResourcesActionTypes.POST_JD_DETAIL_REQUEST, reqJDMappingData);
}

export const reqPostJDMappingData = (data?: any) => {
    return {
        type: ResourcesActionTypes.POST_JD_DETAIL_REQUEST,
        payload: data
    }
}

export const postJDMappingDetailsSuccess = (postValue?: any) => {
    return {
        type: ResourcesActionTypes.POST_JD_DETAIL_SUCCESS,
        payload: postValue
    }
}

export const postJDMappingDetailsFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ResourcesActionTypes.POST_JD_DETAIL_ERROR,
        payload: errors
    }
}

// This is a function used to get JD Mapping details
export const putJDMappingDetails = function* () {
    yield takeEvery(ResourcesActionTypes.PUT_JD_DETAIL_REQUEST, putJDMappingData);
}

export const reqPutJDMappingData = (data?: any) => {
    return {
        type: ResourcesActionTypes.PUT_JD_DETAIL_REQUEST,
        payload: data
    }
}

export const putJDMappingDetailsSuccess = (postValue?: any) => {
    return {
        type: ResourcesActionTypes.PUT_JD_DETAIL_SUCCESS,
        payload: postValue
    }
}

export const putJDMappingDetailsFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ResourcesActionTypes.PUT_JD_DETAIL_ERROR,
        payload: errors
    }
}


// This is function is used to Operation
export const restInitialData = function* () {
    yield takeEvery(ResourcesActionTypes.CLEAR_RESOURCES_REQUEST, restInitialDetails);
}
export const  reqRestInitialData = (postValue?: any) => {
    return {
        type: ResourcesActionTypes.CLEAR_RESOURCES_REQUEST,
        payload: postValue
    }
}