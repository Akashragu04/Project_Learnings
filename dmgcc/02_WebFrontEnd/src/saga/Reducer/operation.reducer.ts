import { Reducer } from 'redux'
import { OperationActionTypes, OperationState } from '../Types/OperationTypes';

// Type-safe initialState!
export const initialState: OperationState = {
    items: [],
    loading: false,
    errors: {},
    getProjectDetails: null,
    getProjectOverview: null,
    getProjectList: null,
    getResourceAllocation: null,
    getSLAList: null,
    getCapacityManagement: null,
    getTimesheetProject: null,
    getTimesheetSLAList: null,
    getTimesheetTaskList: null,
    getEmployeeTimesheetList: null,
    getTaskFileupload: null,
    getTaskDetails: null,
    getTaskView: null,
    getTaskProjectList: null,
    getTaskSlaByProject: null,
    getTaskResource: null,
    getCapacityResource: null,
    getCapacitySLA: null,
    resCapnitiDatas:null,
    resReopenTask:null
}

const reducer: Reducer<OperationState> = (state = initialState, action) => {
    switch (action.type) {
        case OperationActionTypes.PROJECT_REQUEST:
        case OperationActionTypes.PROJECT_OVERVIEW_REQUEST:
            {
                return { ...state, loading: true, getResourceAllocation: null, errors: {} }
            }
            
        case OperationActionTypes.GET_SLA_LIST_REQUEST:
            {
                return { ...state, loading: true, getSLAList: null, errors: {} }
            }
                     
        case OperationActionTypes.CAPNITI_CLEAR_REQUEST:
            {
                return initialState;
            }
        case OperationActionTypes.GET_PROJECT_LIST_REQUEST:
            {
                return { ...state, loading: true, getProjectList: null }
            }
        case OperationActionTypes.PROJECT_SUCCESS:
            {
                const { payload, getProjectDetails } = action.payload;
                return {
                    ...state, loading: false, items: payload, getProjectDetails: getProjectDetails
                }
            }
        // This is a Time sheet services
        case OperationActionTypes.GET_TIMESHEET_PROJECT_REQUEST:
        case OperationActionTypes.GET_TIMESHEET_SLA_LIST_REQUEST:
        case OperationActionTypes.GET_TIMESHEET_TASK_LIST_REQUEST:
        case OperationActionTypes.GET_EMPLOYEE_TIMESHEET_REQUEST:
        case OperationActionTypes.MAP_RESOURCE_DATA_REQUEST:
        case OperationActionTypes.UPDATE_STATU_TASK_OVERVIEW_REQUEST:
        case OperationActionTypes.UPDATE_RESOURCE_ALLOCATION_REQUEST:
        case OperationActionTypes.CHANGE_CAPNITI_TASK_REQUEST:
            {
                return { ...state, loading: true }
            }
            
        case OperationActionTypes.POST_TIMESHEET_REQUEST:
            {
                return { ...state, loading: true, resCapnitiDatas:null }
            }

        case OperationActionTypes.GET_TIMESHEET_PROJECT_SUCCESS:
            {
                const { payload, getTimesheetData } = action.payload;
                return { ...state, loading: false, items: payload, getTimesheetProject: getTimesheetData }
            }
        case OperationActionTypes.GET_TIMESHEET_TASK_LIST_SUCCESS:
            {
                const { payload, getTimesheetTaskList } = action.payload;
                return { ...state, loading: false, items: payload, getTimesheetTaskList: getTimesheetTaskList }
            }
        case OperationActionTypes.GET_TIMESHEET_SLA_LIST_SUCCESS:
            {
                const { payload, getTimesheetSLAList } = action.payload;
                return { ...state, loading: false, items: payload, getTimesheetSLAList: getTimesheetSLAList }
            }
       
        case OperationActionTypes.MAP_RESOURCE_DATA_SUCCESS:
        case OperationActionTypes.UPDATE_STATU_TASK_OVERVIEW_SUCCESS:
            {
                const { payload } = action.payload;
                return { ...state, loading: false, items: payload }
            }
            case OperationActionTypes.POST_TIMESHEET_SUCCESS:
                {
                    const { payload } = action.payload;
                return { ...state, loading: false, items: payload, resCapnitiDatas: payload }
                }
        case OperationActionTypes.GET_EMPLOYEE_TIMESHEET_SUCCESS:
            {
                const { payload, getEmployeeTimesheetList } = action.payload;
                return { ...state, loading: false, items: payload, getEmployeeTimesheetList: getEmployeeTimesheetList }
            }
        // This is a Task services
        case OperationActionTypes.FILE_UPLOAD_REQUEST:
        case OperationActionTypes.GET_TASK_GETPROJECT_REQUEST:
        case OperationActionTypes.GET_TASK_LIST_REQUEST:
        case OperationActionTypes.GET_TASK_REQUEST:
        case OperationActionTypes.GET_TASK_RESOURCE_BYSLA_REQUEST:
        case OperationActionTypes.GET_TASK_SLA_LIST_REQUEST:
        case OperationActionTypes.POST_TASK_REQUEST:
        case OperationActionTypes.UPDATE_TASK_REQUEST:
        case OperationActionTypes.MAP_RESOURCE_DATA_ERROR:
        case OperationActionTypes.UPDATE_RESOURCE_ALLOCATION_ERROR:
        case OperationActionTypes.UPDATE_STATU_TASK_OVERVIEW_ERROR:
            {
                return { ...state, loading: true }
            }

        case OperationActionTypes.CAPACITY_SLA_REQUEST:
            {
                return { ...state, loading: true, getCapacitySLA: null }
            }
        case OperationActionTypes.CAPACITY_RESOURCE_REQUEST:
            {
                return { ...state, loading: true, getCapacityResource: null }
            }
        case OperationActionTypes.FILE_UPLOAD_SUCCESS:
            {
                const { payload, resTaskFileUpload } = action.payload;
                return { ...state, loading: false, items: payload, getTaskFileupload: resTaskFileUpload }
            }
            case OperationActionTypes.REOPEN_TASK_REQUEST:
            {
                return { ...state, loading: true, resReopenTask: null }
            }
        case OperationActionTypes.REOPEN_TASK_SUCCESS:
            {
                const { payload } = action.payload;
                return { ...state, loading: false, items: payload, resReopenTask: payload }
            }
        case OperationActionTypes.GET_TASK_GETPROJECT_SUCCESS:
            {
                const { payload, resTaskProject } = action.payload;
                return { ...state, loading: false, items: payload, getTaskProjectList: resTaskProject }
            }
        case OperationActionTypes.GET_TASK_LIST_SUCCESS:
            {
                const { payload, getTaskView } = action.payload;
                return { ...state, loading: false, items: payload, getTaskView: getTaskView }
            }
        case OperationActionTypes.GET_TASK_SUCCESS:
            {
                const { payload, resTaskData } = action.payload;
                return { ...state, loading: false, items: payload, getTaskDetails: resTaskData }
            }
        case OperationActionTypes.GET_TASK_RESOURCE_BYSLA_SUCCESS:
            {
                const { payload, resResourceData } = action.payload;
                return { ...state, loading: false, items: payload, resResourceData: resResourceData }
            }
        case OperationActionTypes.POST_TASK_SUCCESS:
            {
                const { payload } = action.payload;
                return { ...state, loading: false, items: payload }
            }
        case OperationActionTypes.UPDATE_TASK_SUCCESS:
            {
                const { payload } = action.payload;
                return { ...state, loading: false, items: payload }
            }
        case OperationActionTypes.GET_TASK_SLA_LIST_SUCCESS:
            {
                const { payload, resTaskSLA } = action.payload;
                return { ...state, loading: false, items: payload, getTaskSlaByProject: resTaskSLA }
            }

        case OperationActionTypes.GET_SLA_LIST_SUCCESS:
            {
                const { payload, getSLAList } = action.payload;
                return { ...state, loading: false, items: payload, getSLAList: getSLAList }
            }
        case OperationActionTypes.GET_RESOURCE_ALLOCATION_REQUEST:
            {
                return { ...state, loading: true, getResourceAllocation: null }
            }

        case OperationActionTypes.POST_RESOURCE_ALLOCATION_REQUEST:
        case OperationActionTypes.GET_CAPACITY_MANAGEMENT_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    getCapacityManagement: null
                }
            }
        case OperationActionTypes.GET_CAPACITY_MANAGEMENT_SUCCESS:
            {
                const { payload, getCapacitylist } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    getCapacityManagement: getCapacitylist
                }
            }
        case OperationActionTypes.POST_RESOURCE_ALLOCATION_SUCCESS:
        case OperationActionTypes.UPDATE_RESOURCE_ALLOCATION_SUCCESS:
        case OperationActionTypes.CHANGE_CAPNITI_TASK_SUCCESS:
            {
                const { payload } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload
                }
            }
        case OperationActionTypes.GET_RESOURCE_ALLOCATION_SUCCESS:
            {
                const { payload, ResourceAllocation } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    getResourceAllocation: ResourceAllocation
                }
            }
        case OperationActionTypes.GET_PROJECT_LIST_SUCCESS:
            {
                const { payload, getProjectList } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    getProjectList: getProjectList
                }
            }
        case OperationActionTypes.PROJECT_ERROR:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    getProjectDetails: null,
                    items: []
                }
            }
        case OperationActionTypes.PROJECT_OVERVIEW_SUCCESS:
            {
                const { payload, getProjectOverview } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    getProjectOverview: getProjectOverview
                }
            }

        case OperationActionTypes.CAPACITY_RESOURCE_SUCCESS:
            {
                const { payload, resCapacityResource } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    getCapacityResource: resCapacityResource
                }
            }

        case OperationActionTypes.CAPACITY_SLA_SUCCESS:
            {
                const { payload, getCapacitySLA } = action.payload;
                return {
                    ...state,
                    loading: false,
                    items: payload,
                    getCapacitySLA: getCapacitySLA
                }
            }

        case OperationActionTypes.FILE_UPLOAD_ERROR:
        case OperationActionTypes.GET_TASK_ERROR:
        case OperationActionTypes.GET_TASK_GETPROJECT_ERROR:
        case OperationActionTypes.GET_TASK_LIST_ERROR:
        case OperationActionTypes.GET_TASK_RESOURCE_BYSLA_ERROR:
        case OperationActionTypes.UPDATE_TASK_ERROR:
        case OperationActionTypes.GET_EMPLOYEE_TIMESHEET_ERROR:
        case OperationActionTypes.GET_TIMESHEET_TASK_LIST_ERROR:
        case OperationActionTypes.GET_TIMESHEET_SLA_LIST_ERROR:
        case OperationActionTypes.CAPACITY_RESOURCE_ERROR:
        case OperationActionTypes.CAPACITY_SLA_ERROR:
        case OperationActionTypes.CHANGE_CAPNITI_TASK_ERROR:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    items: []
                }
            }
            
        case OperationActionTypes.POST_TIMESHEET_ERROR:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    items: [], 
                    resCapnitiDatas:null
                }
            }
            
            case OperationActionTypes.REOPEN_TASK_ERROR:
                {
                    const { payload } = action;
                    return {
                        ...state,
                        loading: false,
                        errors: payload,
                        items: [], 
                        resReopenTask:null
                    }
                }

                case OperationActionTypes.GET_RESOURCE_ALLOCATION_ERROR:
                    {  
                        const { payload } = action;
                    return {
                        ...state,
                        loading: false,
                        errors: payload,
                        getResourceAllocation: null,
                        items: []
                    }
                }
        case OperationActionTypes.PROJECT_OVERVIEW_ERROR:
        case OperationActionTypes.GET_PROJECT_LIST_ERROR:
        case OperationActionTypes.GET_SLA_LIST_ERROR:
        case OperationActionTypes.POST_RESOURCE_ALLOCATION_ERROR:
        case OperationActionTypes.GET_CAPACITY_MANAGEMENT_ERROR:
        case OperationActionTypes.GET_TIMESHEET_PROJECT_ERROR:
            {
                const { payload } = action;
                return {
                    ...state,
                    loading: false,
                    errors: payload,
                    getProjectOverview: null,
                    items: []
                }
            }
        default: {
            return state
        }
    }
}


export { reducer as OperationProcess }