import { takeEvery } from "redux-saga/effects";
import { ActionTypes, BizCaseSLATypes } from '../sagas/Types';
import { getLeadsDetails, addLeadsDetails, getUserDetailList, pullAssignUserProcess, 
    getLeadsEditData, putLeadsData, clearBusinessData, getBusinessCase, postBusinessCaseApprovel, 
    putBusinessCaseApprovel, removeImageFile, resendMailUser, getLeadsConversion, getDepartment, getStepper, getBizCaseSetupChartData, getCustomerAndBusinessData } from '../sagas/business.sagas';

// This is function is used to store password
export const getLeads = function* () {
    yield takeEvery(ActionTypes.GET_LEADS_REQUEST, getLeadsDetails);
}

export const getLeadsSuccess = (postValue?: any) => {
    return {
        type: ActionTypes.GET_LEADS_SUCCESS,
        payload: postValue
    }
}

export const getLeadsFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ActionTypes.GET_LEADS_ERROR,
        payload: errors
    }
}

// This is function is used to store password
export const clearBusinessDetails = function* () {
    yield takeEvery(ActionTypes.CLEAR_BUSINESS_REQUEST, clearBusinessData);
}

export const clearBusinessSuccess = (postValue?: any) => {
    return {
        type: ActionTypes.CLEAR_BUSINESS_SUCCESS,
        payload: postValue
    }
}

// This is function is used to store password
export const addLeads = function* () {
    yield takeEvery(ActionTypes.ADD_LEADS_REQUEST, addLeadsDetails);
}

export const addLeadsSuccess = (postValue?: any) => {
    return {
        type: ActionTypes.ADD_LEADS_SUCCESS,
        payload: postValue.data
    }
}

export const addLeadsFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ActionTypes.ADD_LEADS_ERROR,
        payload: errors
    }
}


// This is function is used to store password
export const getUserDetail = function* () {
    yield takeEvery(ActionTypes.GET_USERDETAILS_REQUEST, getUserDetailList);
}

export const reqUserDetail = (postValue?: any) => {
    return {
        type: ActionTypes.GET_USERDETAILS_REQUEST,
        payload: postValue
    }
}

export const getUserDetailSuccess = (postValue?: any) => {
    return {
        type: ActionTypes.GET_USERDETAILS_SUCCESS,
        payload: postValue
    }
}

export const getUserDetailFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ActionTypes.GET_USERDETAILS_ERROR,
        payload: errors
    }
}


// This is function is used to store password
export const pullAssignUser = function* () {
    yield takeEvery(ActionTypes.ASSIGN_PROJECT_REQUEST, pullAssignUserProcess);
}

export const pullAssignUserSuccess = (postValue?: any) => {
    return {
        type: ActionTypes.ASSIGN_PROJECT_SUCCESS,
        payload: postValue
    }
}

export const pullAssignUserFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ActionTypes.ASSIGN_PROJECT_ERROR,
        payload: errors
    }
}


// This is function is used to store password
export const getLeadsEdit = function* () {
    yield takeEvery(ActionTypes.GET_LEADS_DATA_REQUEST, getLeadsEditData);
}

export const getLeadsEditSuccess = (postValue?: any) => {
    return {
        type: ActionTypes.GET_LEADS_DATA_SUCCESS,
        payload: postValue
    }
}

export const getLeadsEditFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ActionTypes.GET_LEADS_DATA_ERROR,
        payload: errors
    }
}

// This is function is used to store password
export const putLeadsDetails = function* () {
    yield takeEvery(ActionTypes.UPDATE_LEADS_DATA_REQUEST, putLeadsData);
}

export const putLeadsDetailsSuccess = (postValue?: any) => {
    return {
        type: ActionTypes.UPDATE_LEADS_DATA_SUCCESS,
        payload: postValue
    }
}

export const putLeadsDetailsFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ActionTypes.UPDATE_LEADS_DATA_ERROR,
        payload: errors
    }
}

// This is function is used to store password
export const getBusinessCaseReq = function* () {
    yield takeEvery(ActionTypes.GET_BUSINESS_CASE_REQUEST, getBusinessCase);
}

export const getBusinessCaseReqSuccess = (postValue?: any) => {
    return {
        type: ActionTypes.GET_BUSINESS_CASE_SUCCESS,
        payload: postValue
    }
}

export const getBusinessCaseReqFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ActionTypes.GET_BUSINESS_CASE_ERROR,
        payload: errors
    }
}


// This is function is used to store password
export const getBusinessCaseApprovel = function* () {
    yield takeEvery(ActionTypes.BUSINESS_CASE_APPROVEL_REQUEST, postBusinessCaseApprovel);
}

export const getBusinessCaseApprovelSuccess = (postValue?: any) => {
    return {
        type: ActionTypes.BUSINESS_CASE_APPROVEL_SUCCESS,
        payload: postValue
    }
}

export const getBusinessCaseApprovelFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ActionTypes.BUSINESS_CASE_APPROVEL_ERROR,
        payload: errors
    }
}

// This is function is used to store password
export const businessCaseApprovel = function* () {
    yield takeEvery(ActionTypes.MAIL_BUSINESS_CASE_APPROVEL_REQUEST, putBusinessCaseApprovel);
}

export const businessCaseApprovelSuccess = (postValue?: any) => {
    return {
        type: ActionTypes.MAIL_BUSINESS_CASE_APPROVEL_SUCCESS,
        payload: postValue
    }
}

export const businessCaseApprovelFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ActionTypes.MAIL_BUSINESS_CASE_APPROVEL_ERROR,
        payload: errors
    }
}

// This is function is remove image
export const removeImage = function* () {
    yield takeEvery(ActionTypes.IMAGE_DELETE_REQUEST, removeImageFile);
}

export const removeImageSuccess = (postValue?: any) => {
    return {
        type: ActionTypes.IMAGE_DELETE_SUCCESS,
        payload: postValue
    }
}

export const removeImageFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ActionTypes.IMAGE_DELETE_ERROR,
        payload: errors
    }
}


// This is function is remove image
export const resendMail = function* () {
    yield takeEvery(ActionTypes.RESEND_MAIL_REQUEST, resendMailUser);
}

export const resendMailSuccess = (postValue?: any) => {
    return {
        type: ActionTypes.RESEND_MAIL_SUCCESS,
        payload: postValue
    }
}

export const resendMailFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ActionTypes.RESEND_MAIL_ERROR,
        payload: errors
    }
}


// This is function is remove image
export const leadsConversionAvg = function* () {
    yield takeEvery(ActionTypes.LEADS_CONVERSION_REQUEST, getLeadsConversion);
}

export const leadsConversionSuccess = (postValue?: any) => {
    return {
        type: ActionTypes.LEADS_CONVERSION_SUCCESS,
        payload: postValue
    }
}

export const leadsConversionFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ActionTypes.LEADS_CONVERSION_ERROR,
        payload: errors
    }
}


// This is function is remove image
export const getDepartmentLists = function* () {
    yield takeEvery(ActionTypes.GET_DEPARTMENT_REQUEST, getDepartment);
}

export const getDepartmentListsSuccess = (postValue?: any) => {
    return {
        type: ActionTypes.GET_DEPARTMENT_SUCCESS,
        payload: postValue
    }
}

export const getDepartmentListsFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ActionTypes.GET_DEPARTMENT_ERROR,
        payload: errors
    }
}

// This is function is remove image
export const getStepperLists = function* () {
    yield takeEvery(ActionTypes.GET_STEPPER_REQUEST, getStepper);
}

export const getStepperListsSuccess = (postValue?: any) => {
    return {
        type: ActionTypes.GET_STEPPER_SUCCESS,
        payload: postValue
    }
}

export const getStepperListsFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ActionTypes.GET_STEPPER_ERROR,
        payload: errors
    }
}

// This is function is remove image
export const getBizCaseSetupChart = function* () {
    yield takeEvery(BizCaseSLATypes.GET_BIZCASE_CHART_REQUEST, getBizCaseSetupChartData);
}

export const  reqGetBizCaseSetupChart = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.GET_BIZCASE_CHART_REQUEST,
        payload: postValue
    }
}

export const getBizCaseSetupChartSuccess = (postValue?: any) => {
    return {
        type: BizCaseSLATypes.GET_BIZCASE_CHART_SUCCESS,
        payload: postValue
    }
}

export const getBizCaseSetupChartFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: BizCaseSLATypes.GET_BIZCASE_CHART_FAILURE,
        payload: errors
    }
}

// This is function is used to get customer and business Details
export const getCustomerAndBusiness = function* () {
    yield takeEvery(ActionTypes.GET_CUSTOMER_AND_BUSINESS_REQUEST, getCustomerAndBusinessData);
}

export const  reqCustomerAndBusiness = (postValue?: any) => {
    return {
        type: ActionTypes.GET_CUSTOMER_AND_BUSINESS_REQUEST,
        payload: postValue
    }
}

export const getCustomerAndBusinessSuccess = (postValue?: any) => {
    return {
        type: ActionTypes.GET_CUSTOMER_AND_BUSINESS_SUCCESS,
        payload: postValue
    }
}

export const getCustomerAndBusinessFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: ActionTypes.GET_CUSTOMER_AND_BUSINESS_ERROR,
        payload: errors
    }
}