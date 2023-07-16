import { takeEvery } from "redux-saga/effects";
import {BusinessSetupActionTypes} from '../Types/BusinessSetup.Types';
import { getBusinessSetupData, postBusinessSetupData, putBusinessSetupData } from '../sagas/businessSetup.sagas' 

export const getBusinessSetup = function* () {
    yield takeEvery(BusinessSetupActionTypes.GET_BUSINESS_SETUP_REQUEST, getBusinessSetupData);
}

export const  getBusinessSetupInfo = (data?: any) => {
    return {
        type: BusinessSetupActionTypes.GET_BUSINESS_SETUP_REQUEST,
        payload: data
    }
}

export const  getBusinessSetupSuccess = (postValue?: any) => {
    return {
        type: BusinessSetupActionTypes.GET_BUSINESS_SETUP_SUCCESS,
        payload: postValue
    }
}

export const  getBusinessSetupFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: BusinessSetupActionTypes.GET_BUSINESS_SETUP_ERROR,
        payload: errors
    }
}


export const postBusinessSetup = function* () {
    yield takeEvery(BusinessSetupActionTypes.POST_SLA_REQUEST, postBusinessSetupData);
}

export const  postBusinessSetupInfo = (data?: any) => {
    return {
        type: BusinessSetupActionTypes.POST_SLA_REQUEST,
        payload: data
    }
}

export const  postBusinessSetupSuccess = (postValue?: any) => {
    return {
        type: BusinessSetupActionTypes.POST_SLA_SUCCESS,
        payload: postValue
    }
}

export const  postBusinessSetupFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: BusinessSetupActionTypes.POST_SLA_ERROR,
        payload: errors
    }
}


export const putBusinessSetup = function* () {
    yield takeEvery(BusinessSetupActionTypes.PUT_SLA_REQUEST, putBusinessSetupData);
}

export const  putBusinessSetupInfo = (data?: any) => {
    return {
        type: BusinessSetupActionTypes.PUT_SLA_REQUEST,
        payload: data
    }
}

export const  putBusinessSetupSuccess = (postValue?: any) => {
    return {
        type: BusinessSetupActionTypes.PUT_SLA_SUCCESS,
        payload: postValue
    }
}

export const  putBusinessSetupFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: BusinessSetupActionTypes.PUT_SLA_ERROR,
        payload: errors
    }
}