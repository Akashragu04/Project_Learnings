import { takeEvery } from "redux-saga/effects";
import { OperationActionTypes } from '../Types/OperationTypes';
import { getProjectDetails, getProjectOverviewDetails, getProjectList, 
    getResourceAllocation, getSLAListDetails, postResourceAllocationDetails, getCapacityDetails, 
    getTimesheetProjectDetails, getTimesheetSLAList, getTimesheetTaskList, postTimesheetData, getEmpTimesheetData, 
    getTaskProjectDetails, getTaskSLAList, getTaskViewDetails, getTaskResourceList, getTaskProject, postTaskData, 
    uploadTaskDetails, taskFileuploadData, capacityResourceView, capacitySLAView, allocateResourceData, 
    updateAllocateResourceData, updateStatusTaskOverviewData, postChangeCapnitiTaskData, ClearCapnitiDetailsData, postReopenTaskData } from '../sagas/operation.sagas';

// This is function is used to Operation
export const getProject = function* () {
    yield takeEvery(OperationActionTypes.PROJECT_REQUEST, getProjectDetails);
}

export const getProjectSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.PROJECT_SUCCESS,
        payload: postValue
    }
}

export const getProjectFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.PROJECT_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const getProjectOverview = function* () {
    yield takeEvery(OperationActionTypes.PROJECT_OVERVIEW_REQUEST, getProjectOverviewDetails);
}

export const reqProjectOverview = (postValue?: any) => {
    return {
        type: OperationActionTypes.PROJECT_OVERVIEW_REQUEST,
        payload: postValue
    }
}

export const getProjectOverviewSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.PROJECT_OVERVIEW_SUCCESS,
        payload: postValue
    }
}

export const getProjectOverviewFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.PROJECT_OVERVIEW_ERROR,
        payload: errors
    }
}


// This is function is used to Operation
export const getProjectListDetails = function* () {
    yield takeEvery(OperationActionTypes.GET_PROJECT_LIST_REQUEST, getProjectList);
}

export const reqProjectList = (postValue?: any) => {
    return {
        type: OperationActionTypes.GET_PROJECT_LIST_REQUEST,
        payload: postValue
    }
}

export const getProjectListSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.GET_PROJECT_LIST_SUCCESS,
        payload: postValue
    }
}

export const getProjectListFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.GET_PROJECT_LIST_ERROR,
        payload: errors
    }
}


// This is function is used to Operation
export const getResourceAllocationDetails = function* () {
    yield takeEvery(OperationActionTypes.GET_RESOURCE_ALLOCATION_REQUEST, getResourceAllocation);
}

export const getResourceAllocationSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.GET_RESOURCE_ALLOCATION_SUCCESS,
        payload: postValue
    }
}

export const getResourceAllocationFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.GET_RESOURCE_ALLOCATION_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const getSLAList = function* () {
    yield takeEvery(OperationActionTypes.GET_SLA_LIST_REQUEST, getSLAListDetails);
}

export const getSLAListSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.GET_SLA_LIST_SUCCESS,
        payload: postValue
    }
}

export const getSLAListFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.GET_SLA_LIST_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const postResourceAllocation = function* () {
    yield takeEvery(OperationActionTypes.POST_RESOURCE_ALLOCATION_REQUEST, postResourceAllocationDetails);
}

export const postResourceAllocationSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.POST_RESOURCE_ALLOCATION_SUCCESS,
        payload: postValue
    }
}

export const postResourceAllocationFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.POST_RESOURCE_ALLOCATION_ERROR,
        payload: errors
    }
}

// This is function is used to Operation
export const getCapacityManagement = function* () {
    yield takeEvery(OperationActionTypes.GET_CAPACITY_MANAGEMENT_REQUEST, getCapacityDetails);
}

export const getCapacityManagementSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.GET_CAPACITY_MANAGEMENT_SUCCESS,
        payload: postValue
    }
}

export const getCapacityManagementFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.GET_CAPACITY_MANAGEMENT_ERROR,
        payload: errors
    }
}


// This is function is Timesheet get services
export const getTimesheetProject = function* () {
    yield takeEvery(OperationActionTypes.GET_TIMESHEET_PROJECT_REQUEST, getTimesheetProjectDetails);
}

export const getTimesheetProjectSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.GET_TIMESHEET_PROJECT_SUCCESS,
        payload: postValue
    }
}

export const getTimesheetProjectFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.GET_TIMESHEET_PROJECT_ERROR,
        payload: errors
    }
}

// This is function is Timesheet get services
export const getTimesheetSLA = function* () {
    yield takeEvery(OperationActionTypes.GET_TIMESHEET_SLA_LIST_REQUEST, getTimesheetSLAList);
}
export const reqTimesheetSLASuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.GET_TIMESHEET_SLA_LIST_REQUEST,
        payload: postValue
    }
}
export const getTimesheetSLASuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.GET_TIMESHEET_SLA_LIST_SUCCESS,
        payload: postValue
    }
}

export const getTimesheetSLAFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.GET_TIMESHEET_SLA_LIST_ERROR,
        payload: errors
    }
}

// This is function is Timesheet get services
export const getTimesheetTask = function* () {
    yield takeEvery(OperationActionTypes.GET_TIMESHEET_TASK_LIST_REQUEST, getTimesheetTaskList);
}

export const getTimesheetTaskSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.GET_TIMESHEET_TASK_LIST_SUCCESS,
        payload: postValue
    }
}

export const getTimesheetTaskFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.GET_TIMESHEET_TASK_LIST_ERROR,
        payload: errors
    }
}

// This is function is post Employee Data Timesheet services
export const postTimesheet = function* () {
    yield takeEvery(OperationActionTypes.POST_TIMESHEET_REQUEST, postTimesheetData);
}

export const postTimesheetSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.POST_TIMESHEET_SUCCESS,
        payload: postValue
    }
}

export const postTimesheetFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.POST_TIMESHEET_ERROR,
        payload: errors
    }
}

// This is function is Timesheet get services
export const getEmpTimesheet = function* () {
    yield takeEvery(OperationActionTypes.GET_EMPLOYEE_TIMESHEET_REQUEST, getEmpTimesheetData);
}

export const getEmpTimesheetSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.GET_EMPLOYEE_TIMESHEET_SUCCESS,
        payload: postValue
    }
}

export const getEmpTimesheetFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.GET_EMPLOYEE_TIMESHEET_ERROR,
        payload: errors
    }
}

// This is function is Task services
export const getTask = function* () {
    yield takeEvery(OperationActionTypes.GET_TASK_REQUEST, getTaskProjectDetails);
}

export const getTaskSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.GET_TASK_SUCCESS,
        payload: postValue
    }
}

export const getTaskFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.GET_TASK_ERROR,
        payload: errors
    }
}

export const getTaskDetails = function* () {
    yield takeEvery(OperationActionTypes.GET_TASK_LIST_REQUEST, getTaskViewDetails);
}

export const getTaskDetailsSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.GET_TASK_LIST_SUCCESS,
        payload: postValue
    }
}

export const getTaskDetailsFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.GET_TASK_LIST_ERROR,
        payload: errors
    }
}

export const getTaskSLA = function* () {
    yield takeEvery(OperationActionTypes.GET_TASK_SLA_LIST_REQUEST, getTaskSLAList);
}

export const reqTaskSLASuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.GET_TASK_SLA_LIST_REQUEST,
        payload: postValue
    }
}

export const getTaskSLASuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.GET_TASK_SLA_LIST_SUCCESS,
        payload: postValue
    }
}

export const getTaskSLAFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.GET_TASK_SLA_LIST_ERROR,
        payload: errors
    }
}

export const getTaskResource = function* () {
    yield takeEvery(OperationActionTypes.GET_TASK_RESOURCE_BYSLA_REQUEST, getTaskResourceList);
}

export const getTaskResourceSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.GET_TASK_RESOURCE_BYSLA_SUCCESS,
        payload: postValue
    }
}

export const getTaskResourceFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.GET_TASK_RESOURCE_BYSLA_ERROR,
        payload: errors
    }
}

export const getTaskProjectList = function* () {
    yield takeEvery(OperationActionTypes.GET_TASK_GETPROJECT_REQUEST, getTaskProject);
}

export const getTaskProjectListSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.GET_TASK_GETPROJECT_SUCCESS,
        payload: postValue
    }
}

export const getTaskProjectListFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.GET_TASK_GETPROJECT_ERROR,
        payload: errors
    }
}

export const postTask = function* () {
    yield takeEvery(OperationActionTypes.POST_TASK_REQUEST, postTaskData);
}

export const postTaskSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.POST_TASK_SUCCESS,
        payload: postValue
    }
}

export const postTaskFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.POST_TASK_ERROR,
        payload: errors
    }
}

export const uploadTask = function* () {
    yield takeEvery(OperationActionTypes.UPDATE_TASK_REQUEST, uploadTaskDetails);
}

export const uploadTaskSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.UPDATE_TASK_SUCCESS,
        payload: postValue
    }
}

export const uploadTaskFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.UPDATE_TASK_ERROR,
        payload: errors
    }
}

export const taskFileupload = function* () {
    yield takeEvery(OperationActionTypes.FILE_UPLOAD_REQUEST, taskFileuploadData);
}

export const taskFileuploadSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.FILE_UPLOAD_SUCCESS,
        payload: postValue
    }
}

export const taskFileuploadFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.FILE_UPLOAD_ERROR,
        payload: errors
    }
}

export const capacityResource = function* () {
    yield takeEvery(OperationActionTypes.CAPACITY_RESOURCE_REQUEST, capacityResourceView);
}

export const capacityResourceSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.CAPACITY_RESOURCE_SUCCESS,
        payload: postValue
    }
}

export const capacityResourceFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.CAPACITY_RESOURCE_ERROR,
        payload: errors
    }
}

export const capacitySLA = function* () {
    yield takeEvery(OperationActionTypes.CAPACITY_SLA_REQUEST, capacitySLAView);
}

export const capacitySLASuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.CAPACITY_SLA_SUCCESS,
        payload: postValue
    }
}

export const capacitySLAFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.CAPACITY_SLA_ERROR,
        payload: errors
    }
}


export const allocateResource = function* () {
    yield takeEvery(OperationActionTypes.MAP_RESOURCE_DATA_REQUEST, allocateResourceData);
}

export const reqAllocateResource = (data?: any) => {
    return {
        type: OperationActionTypes.MAP_RESOURCE_DATA_REQUEST,
        payload: data
    }
}

export const allocateResourceSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.MAP_RESOURCE_DATA_SUCCESS,
        payload: postValue
    }
}

export const allocateResourceFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.MAP_RESOURCE_DATA_ERROR,
        payload: errors
    }
}


export const updateAllocateResource = function* () {
    yield takeEvery(OperationActionTypes.UPDATE_RESOURCE_ALLOCATION_REQUEST, updateAllocateResourceData);
}

export const reqUpdateAllocateResource = (data?: any) => {
    return {
        type: OperationActionTypes.UPDATE_RESOURCE_ALLOCATION_REQUEST,
        payload: data
    }
}

export const updateAllocateResourceSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.UPDATE_RESOURCE_ALLOCATION_SUCCESS,
        payload: postValue
    }
}

export const updateAllocateResourceFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.UPDATE_RESOURCE_ALLOCATION_ERROR,
        payload: errors
    }
}


export const updateStatusTaskOverview= function* () {
    yield takeEvery(OperationActionTypes.UPDATE_STATU_TASK_OVERVIEW_REQUEST, updateStatusTaskOverviewData);
}

export const reqUpdateStatusTaskOverview = (data?: any) => {
    return {
        type: OperationActionTypes.UPDATE_STATU_TASK_OVERVIEW_REQUEST,
        payload: data
    }
}

export const updateStatusTaskOverviewSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.UPDATE_STATU_TASK_OVERVIEW_SUCCESS,
        payload: postValue
    }
}

export const updateStatusTaskOverviewFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.UPDATE_STATU_TASK_OVERVIEW_ERROR,
        payload: errors
    }
}


export const postChangeCapnitiTask= function* () {
    yield takeEvery(OperationActionTypes.CHANGE_CAPNITI_TASK_REQUEST, postChangeCapnitiTaskData);
}

export const reqPostChangeCapnitiTask = (data?: any) => {
    return {
        type: OperationActionTypes.CHANGE_CAPNITI_TASK_REQUEST,
        payload: data
    }
}

export const postChangeCapnitiTaskSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.CHANGE_CAPNITI_TASK_SUCCESS,
        payload: postValue
    }
}

export const postChangeCapnitiTaskFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.CHANGE_CAPNITI_TASK_ERROR,
        payload: errors
    }
}


export const postReopenTask= function* () {
    yield takeEvery(OperationActionTypes.REOPEN_TASK_REQUEST, postReopenTaskData);
}

export const reqPostReopenTask = (data?: any) => {
    return {
        type: OperationActionTypes.REOPEN_TASK_REQUEST,
        payload: data
    }
}

export const postReopenTaskSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.REOPEN_TASK_SUCCESS,
        payload: postValue
    }
}

export const postReopenTaskFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.REOPEN_TASK_ERROR,
        payload: errors
    }
}

export const OnClearCapnitiDetails = function* () {
    yield takeEvery(OperationActionTypes.CAPNITI_CLEAR_REQUEST, ClearCapnitiDetailsData);
}

export const reqClearCapnitiDetails = (data?: any) => {
    return {
        type: OperationActionTypes.CAPNITI_CLEAR_REQUEST,
        payload: data
    }
}

export const onClearCapnitiDetailsSuccess = (postValue?: any) => {
    return {
        type: OperationActionTypes.CAPNITI_CLEAR_SUCCESS,
        payload: postValue
    }
}

export const onClearCapnitiDetailsFailure = (error?: any) => {
    const {errors} = error;
    return {
        type: OperationActionTypes.CAPNITI_CLEAR_ERROR,
        payload: errors
    }
}