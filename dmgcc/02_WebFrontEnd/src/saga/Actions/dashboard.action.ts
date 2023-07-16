import { takeEvery } from "redux-saga/effects";
import { clearStatusDashboardDetail, reqBusinessDashboard, reqDashboardData } from "saga/sagas/dashboard.saga";
import { AdminActionTypes } from "saga/Types/admin.types";

// This is function is used to Operation
export const getDashboardDetails = function* () {
    yield takeEvery(AdminActionTypes.GET_DASHBOARD_DETAILS_REQUEST, reqDashboardData);
}
export const  reqDashboardDetails = (postValue?: any) => {
    return {
        type: AdminActionTypes.GET_DASHBOARD_DETAILS_REQUEST,
        payload: postValue
    }
}

export const  getDashboardDetailsSuccess = (postValue?: any) => {
    return {
        type: AdminActionTypes.GET_DASHBOARD_DETAILS_SUCCESS,
        payload: postValue
    }
}

export const  getDashboardDetailsFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AdminActionTypes.GET_DASHBOARD_DETAILS_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const getBusinessDashboard = function* () {
    yield takeEvery(AdminActionTypes.GET_BUSINESS_CASE_SETUP_DASHBOARD_REQUEST, reqBusinessDashboard);
}
export const  reqBusinessDashboardDetails = (postValue?: any) => {
    return {
        type: AdminActionTypes.GET_BUSINESS_CASE_SETUP_DASHBOARD_REQUEST,
        payload: postValue
    }
}

export const  getBusinessDashboardSuccess = (postValue?: any) => {
    return {
        type: AdminActionTypes.GET_BUSINESS_CASE_SETUP_DASHBOARD_SUCCESS,
        payload: postValue
    }
}

export const  getBusinessDashboardFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AdminActionTypes.GET_BUSINESS_CASE_SETUP_DASHBOARD_ERROR,
        payload: errors
    }
}



// This is function is used to put program name
export const clearStatusDashboard = function* () {
    yield takeEvery(AdminActionTypes.CLEAR_STATUS_DSHBOARD_REQUEST, clearStatusDashboardDetail);
}

export const reqClearStatusDashboard = (postValue?: any) => {
    return {
        type: AdminActionTypes.CLEAR_STATUS_DSHBOARD_REQUEST,
        payload: postValue
    }
}

export const clearStatusDashboardSuccess = (postValue?: any) => {
    return {
        type: AdminActionTypes.CLEAR_STATUS_DSHBOARD_SUCCESS,
        payload: postValue
    }
}