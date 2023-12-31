export enum ResourcesActionTypes {
    COST_CENTRE_REQUEST = 'COST_CENTRE_REQUEST',
    COST_CENTRE_SUCCESS = 'COST_CENTRE_SUCCESS',
    COST_CENTRE_ERROR = 'COST_CENTRE_ERROR',
    COST_CENTRE_RESOURCE_REQUEST = 'COST_CENTRE_RESOURCE_REQUEST',
    COST_CENTRE_RESOURCE_SUCCESS = 'COST_CENTRE_RESOURCE_SUCCESS',
    COST_CENTRE_RESOURCE_ERROR = 'COST_CENTRE_RESOURCE_ERROR',
    GET_RESOURCE_RECORD_REQUEST = 'GET_RESOURCE_RECORD_REQUEST',
    GET_RESOURCE_RECORD_SUCCESS = 'GET_RESOURCE_RECORD_SUCCESS',
    GET_RESOURCE_RECORD_ERROR = 'GET_RESOURCE_RECORD_ERROR',
    UPDATE_RESOURCE_RECORD_REQUEST = 'UPDATE_RESOURCE_RECORD_REQUEST',
    UPDATE_RESOURCE_RECORD_SUCCESS = 'UPDATE_RESOURCE_RECORD_SUCCESS',
    UPDATE_RESOURCE_RECORD_ERROR = 'UPDATE_RESOURCE_RECORD_ERROR',
    GET_UTILIZATION_DATA_REQUEST = 'GET_UTILIZATION_DATA_REQUEST',
    GET_UTILIZATION_DATA_SUCCESS = 'GET_UTILIZATION_DATA_SUCCESS',
    GET_UTILIZATION_DATA_ERROR = 'GET_UTILIZATION_DATA_ERROR',
    GET_EMPLOYEE_LIST_REQUEST = 'GET_EMPLOYEE_LIST_REQUEST',
    GET_EMPLOYEE_LIST_SUCCESS = 'GET_EMPLOYEE_LIST_SUCCESS',
    GET_EMPLOYEE_LIST_ERROR = 'GET_EMPLOYEE_LIST_ERROR',
    ADD_THIRDPART_RESOURCE_REQUEST = 'ADD_THIRDPART_RESOURCE_REQUEST',
    ADD_THIRDPART_RESOURCE_SUCCESS = 'ADD_THIRDPART_RESOURCE_SUCCESS',
    ADD_THIRDPART_RESOURCE_ERROR = 'ADD_THIRDPART_RESOURCE_ERROR',
    UPDATE_THIRDPART_RESOURCE_REQUEST = 'UPDATE_THIRDPART_RESOURCE_REQUEST',
    UPDATE_THIRDPART_RESOURCE_SUCCESS = 'UPDATE_THIRDPART_RESOURCE_SUCCESS',
    UPDATE_THIRDPART_RESOURCE_ERROR = 'UPDATE_THIRDPART_RESOURCE_ERROR',
    GET_THIRDPART_RESOURCE_REQUEST = 'GET_THIRDPART_RESOURCE_REQUEST',
    GET_THIRDPART_RESOURCE_SUCCESS = 'GET_THIRDPART_RESOURCE_SUCCESS',
    GET_THIRDPART_RESOURCE_ERROR = 'GET_THIRDPART_RESOURCE_ERROR',
    DELETE_THIRDPART_RESOURCE_REQUEST = 'DELETE_THIRDPART_RESOURCE_REQUEST',
    DELETE_THIRDPART_RESOURCE_SUCCESS = 'DELETE_THIRDPART_RESOURCE_SUCCESS',
    DELETE_THIRDPART_RESOURCE_ERROR = 'DELETE_THIRDPART_RESOURCE_ERROR',
    GET_RESOURCE_DETAIL_REQUEST = 'GET_RESOURCE_DETAIL_REQUEST',
    GET_RESOURCE_DETAIL_SUCCESS = 'GET_RESOURCE_DETAIL_SUCCESS',
    GET_RESOURCE_DETAIL_ERROR = 'GET_RESOURCE_DETAIL_ERROR',
    GET_JD_DETAIL_REQUEST = 'GET_JD_DETAIL_REQUEST',
    GET_JD_DETAIL_SUCCESS = 'GET_JD_DETAIL_SUCCESS',
    GET_JD_DETAIL_ERROR = 'GET_JD_DETAIL_ERROR',
    POST_JD_DETAIL_REQUEST = 'POST_JD_DETAIL_REQUEST',
    POST_JD_DETAIL_SUCCESS = 'POST_JD_DETAIL_SUCCESS',
    POST_JD_DETAIL_ERROR = 'POST_JD_DETAIL_ERROR',
    PUT_JD_DETAIL_REQUEST = 'PUT_JD_DETAIL_REQUEST',
    PUT_JD_DETAIL_SUCCESS = 'PUT_JD_DETAIL_SUCCESS',
    PUT_JD_DETAIL_ERROR = 'PUT_JD_DETAIL_ERROR',
    CLEAR_RESOURCES_REQUEST = 'CLEAR_RESOURCES_REQUEST',
    CLEAR_RESOURCES_SUCCESS = 'CLEAR_RESOURCES_SUCCESS',
    CLEAR_RESOURCES_ERROR = 'CLEAR_RESOURCES_ERROR',
}

export interface ResourceState {
    loading: boolean,
    items: {},
    errors:{},
    getCostCentreList?:any,
    getCostCentreResourceData?:any,
    getResourceRecordList?:any,
    updateREsourceRecord?:any,
    getUtilizationList?:any,
    getEmployeeList?:any,
    getThirdPartResource?:any,
    getResourceDetails?:any,
    getResourceSkill?:any,
    getJDMappingInternal?:any,
    postResJDMapping?:any,
    getJDMappingDetails?:any,
    resAddThirdpartData?:any,
    resEditThirdpartData?:any
}