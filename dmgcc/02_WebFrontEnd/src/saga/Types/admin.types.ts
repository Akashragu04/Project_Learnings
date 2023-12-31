export enum AdminActionTypes {
    //cost centre master
    GET_DASHBOARD_DETAILS_REQUEST = 'GET_DASHBOARD_DETAILS_REQUEST',
    GET_DASHBOARD_DETAILS_SUCCESS = 'GET_DASHBOARD_DETAILS_SUCCESS',
    GET_DASHBOARD_DETAILS_ERROR = 'GET_DASHBOARD_DETAILS_ERROR',
    GET_BUSINESS_CASE_SETUP_DASHBOARD_REQUEST = 'GET_BUSINESS_CASE_SETUP_DASHBOARD_REQUEST',
    GET_BUSINESS_CASE_SETUP_DASHBOARD_SUCCESS = 'GET_BUSINESS_CASE_SETUP_DASHBOARD_SUCCESS',
    GET_BUSINESS_CASE_SETUP_DASHBOARD_ERROR = 'GET_BUSINESS_CASE_SETUP_DASHBOARD_ERROR',
    GET_ASSIGN_ROLE_REQUEST = 'GET_ASSIGN_ROLE_REQUEST',
    GET_ASSIGN_ROLE_SUCCESS = 'GET_ASSIGN_ROLE_SUCCESS',
    GET_ASSIGN_ROLE_ERROR = 'GET_ASSIGN_ROLE_ERROR',
    GET_USERS_WITH_OUTROLE_REQUEST = 'GET_USERS_WITH_OUTROLE_REQUEST',
    GET_USERS_WITH_OUTROLE_SUCCESS = 'GET_USERS_WITH_OUTROLE_SUCCESS',
    GET_USERS_WITH_OUTROLE_ERROR = 'GET_USERS_WITH_OUTROLE_ERROR',
    GET_USERS_WITH_ROLE_REQUEST = 'GET_USERS_WITH_ROLE_REQUEST',
    GET_USERS_WITH_ROLE_SUCCESS = 'GET_USERS_WITH_ROLE_SUCCESS',
    GET_USERS_WITH_ROLE_ERROR = 'GET_USERS_WITH_ROLE_ERROR',
    GET_ROLE_REQUEST = 'GET_ROLE_REQUEST',
    GET_ROLE_SUCCESS = 'GET_ROLE_SUCCESS',
    GET_ROLE_ERROR = 'GET_ROLE_ERROR',
    CLEAR_STATUS_REQUEST = 'CLEAR_STATUS_REQUEST',
    CLEAR_STATUS_SUCCESS = 'CLEAR_STATUS_SUCCESS',
    CLEAR_STATUS_ERROR = 'CLEAR_STATUS_ERROR',
    CLEAR_STATUS_DSHBOARD_REQUEST = 'CLEAR_STATUS_DSHBOARD_REQUEST',
    CLEAR_STATUS_DSHBOARD_SUCCESS = 'CLEAR_STATUS_DSHBOARD_SUCCESS',
    CLEAR_STATUS_DSHBOARD_ERROR = 'CLEAR_STATUS_DSHBOARD_ERROR',
}

export interface AdminState {
    loading: boolean,
    items: any,
    errors:any,
    getResponseDashboard?:any,
    getResponseBusinessCaseDashboard?:any,
    resAssignroleData?:any,
    resGetUsersWithOutrole?:any,
    resGetUserWithRole?:any,
    resGetRole?:any
}