import { takeEvery } from "redux-saga/effects";
import { assignRoleDetail, clearStatusDetail, getRoleDetail, getUsersWithOutRoleDetail, getUsersWithRoleDetail } from "saga/sagas/admin.sagas";
import { AdminActionTypes } from "saga/Types/admin.types";

//put Assign Role
export const assignRole = function* () {
    yield takeEvery(AdminActionTypes.GET_ASSIGN_ROLE_REQUEST, assignRoleDetail);
}
export const  reqAssignRole = (postValue?: any) => {
    return {
        type: AdminActionTypes.GET_ASSIGN_ROLE_REQUEST,
        payload: postValue
    }
}

export const  assignRoleSuccess = (postValue?: any) => {
    return {
        type: AdminActionTypes.GET_ASSIGN_ROLE_SUCCESS,
        payload: postValue
    }
}

export const  assignRoleFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AdminActionTypes.GET_ASSIGN_ROLE_ERROR,
        payload: errors
    }
}

//get user with out role
export const getUsersWithOutRole = function* () {
    yield takeEvery(AdminActionTypes.GET_USERS_WITH_OUTROLE_REQUEST, getUsersWithOutRoleDetail);
}
export const  reqUsersWithOutRole = (postValue?: any) => {
    return {
        type: AdminActionTypes.GET_USERS_WITH_OUTROLE_REQUEST,
        payload: postValue
    }
}

export const  getUsersWithOutRoleSuccess = (postValue?: any) => {
    return {
        type: AdminActionTypes.GET_USERS_WITH_OUTROLE_SUCCESS,
        payload: postValue
    }
}

export const  getUsersWithOutRoleFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AdminActionTypes.GET_ASSIGN_ROLE_ERROR,
        payload: errors
    }
}

//get user with role
export const getUsersWithRole = function* () {
    yield takeEvery(AdminActionTypes.GET_USERS_WITH_ROLE_REQUEST, getUsersWithRoleDetail);
}
export const  reqUsersWithRole = (postValue?: any) => {
    return {
        type: AdminActionTypes.GET_USERS_WITH_ROLE_REQUEST,
        payload: postValue
    }
}

export const  getUsersWithRoleSuccess = (postValue?: any) => {
    return {
        type: AdminActionTypes.GET_USERS_WITH_ROLE_SUCCESS,
        payload: postValue
    }
}

export const  getUsersWithRoleFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AdminActionTypes.GET_USERS_WITH_ROLE_ERROR,
        payload: errors
    }
}

// get role
export const getRole = function* () {
    yield takeEvery(AdminActionTypes.GET_ROLE_REQUEST, getRoleDetail);
}
export const  reqRolee = (postValue?: any) => {
    return {
        type: AdminActionTypes.GET_ROLE_REQUEST,
        payload: postValue
    }
}

export const  getRoleSuccess = (postValue?: any) => {
    return {
        type: AdminActionTypes.GET_ROLE_SUCCESS,
        payload: postValue
    }
}

export const  getRoleFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: AdminActionTypes.GET_ROLE_ERROR,
        payload: errors
    }
}


// This is function is used to put program name
export const clearStatus = function* () {
    yield takeEvery(AdminActionTypes.CLEAR_STATUS_REQUEST, clearStatusDetail);
}

export const reqClearStatus = (postValue?: any) => {
    return {
        type: AdminActionTypes.CLEAR_STATUS_REQUEST,
        payload: postValue
    }
}

export const clearStatusSuccess = (postValue?: any) => {
    return {
        type: AdminActionTypes.CLEAR_STATUS_SUCCESS,
        payload: postValue
    }
}