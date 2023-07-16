import { ReportsProcessTypes } from '../sagas/Types';

// Type-safe initialState!
export const initialState: any = {
    items: [],
    loading: false,
    isLoading: false,
    errors: {},
    bizCaseInfoList: [],
    customerBizReportResponse: {},
    leadsBizReportResponse: {},
    detailedBizExcelResponse: {},
    detailedBizPdfResponse: {},
    bizSetupReportResponse: {},
    newBizRecruitmentResponse: {},
    slaDetailReportResponse: {},
    resourceReportResponse: {},
    capacityReportResponse: {},
    positionsReportResponse: {},
    timesheetCostCenterReportResponse: {},
    timesheetShortIDReportResponse: {},
    taskReportResponse: {},
    costCenterList: [],
    employeesList: [],
    projectsList: [],
    revenueSummaryResponse: {},
    accuralsReportResponse: {},
    travelCostResponse: {},
    materialRevenueExpenseResponse: {},
    manpowerSkillSetResponse: {},
    benchResourceResponse: {},
    attritionResponse: {}
}


export const resourceReports: any = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case ReportsProcessTypes.INIT_RESOURCE_REPORT_PROCESS:
            return {
                ...state, loading: false, isLoading: false, errors: null, items: [],
                manpowerSkillSetResponse: {}, benchResourceResponse: {}, attritionResponse: {}
            }
        case ReportsProcessTypes.DOWNLOAD_MANPOWER_SKILLSET_REPORT_REQUEST:
            return { ...state, isLoading: true, manpowerSkillSetResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_MANPOWER_SKILLSET_REPORT_SUCCESS:
            return { ...state, isLoading: false, manpowerSkillSetResponse: response }
        case ReportsProcessTypes.DOWNLOAD_MANPOWER_SKILLSET_REPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_BENCHRESOURCES_REPORT_REQUEST:
            return { ...state, isLoading: true, benchResourceResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_BENCHRESOURCES_REPORT_SUCCESS:
            return { ...state, isLoading: false, benchResourceResponse: response }
        case ReportsProcessTypes.DOWNLOAD_BENCHRESOURCES_REPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_ATTRITION_RESOURCE_REPORT_REQUEST:
            return { ...state, isLoading: true, attritionResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_ATTRITION_RESOURCE_REPORT_SUCCESS:
            return { ...state, isLoading: false, attritionResponse: response }
        case ReportsProcessTypes.DOWNLOAD_ATTRITION_RESOURCE_REPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        default: {
            return state
        }
    }
}

export const financeReports: any = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case ReportsProcessTypes.INIT_FINANCE_REPORT_PROCESS:
            return {
                ...state, loading: false, isLoading: false, errors: null, items: [], revenueSummaryResponse: {},
                accuralsReportResponse: {}, travelCostResponse: {}, materialRevenueExpenseResponse: {}
            }
        case ReportsProcessTypes.DOWNLOAD_REVENUESUMMARY_REPORT_REQUEST:
            return { ...state, isLoading: true, revenueSummaryResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_REVENUESUMMARY_REPORT_SUCCESS:
            return { ...state, isLoading: false, revenueSummaryResponse: response }
        case ReportsProcessTypes.DOWNLOAD_REVENUESUMMARY_REPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_ACCURALS_REPORT_REQUEST:
            return { ...state, isLoading: true, accuralsReportResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_ACCURALS_REPORT_SUCCESS:
            return { ...state, isLoading: false, accuralsReportResponse: response }
        case ReportsProcessTypes.DOWNLOAD_ACCURALS_REPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_TRAVELCOST_REPORT_REQUEST:
            return { ...state, isLoading: true, travelCostResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_TRAVELCOST_REPORT_SUCCESS:
            return { ...state, isLoading: false, travelCostResponse: response }
        case ReportsProcessTypes.DOWNLOAD_TRAVELCOST_REPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_MATERIAL_EXPENSE_AND_REVENUE_REPORT_REQUEST:
            return { ...state, isLoading: true, materialRevenueExpenseResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_MATERIAL_EXPENSE_AND_REVENUE_REPORT_SUCCESS:
            return { ...state, isLoading: false, materialRevenueExpenseResponse: response }
        case ReportsProcessTypes.DOWNLOAD_MATERIAL_EXPENSE_AND_REVENUE_REPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        default: {
            return state
        }
    }
}

export const operationsReports: any = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case ReportsProcessTypes.INIT_OPERATIONS_REPORT_PROCESS:
            return {
                ...state, loading: false, isLoading: false, errors: null, items: [], resourceReportResponse: {},
                capacityReportResponse: {}, positionsReportResponse: {}, timesheetCostCenterReportResponse: {},
                timesheetShortIDReportResponse: {}, taskReportResponse: {}
            }
        case ReportsProcessTypes.GET_PROJECTS_LIST_DETAIL_REQUEST:
            return { ...state, isLoading: true, projectsList: [] }
        case ReportsProcessTypes.GET_PROJECTS_LIST_DETAIL_SUCCESS:
            return { ...state, isLoading: false, projectsList: response.data }
        case ReportsProcessTypes.GET_PROJECTS_LIST_DETAIL_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.GET_COSTCENTER_LIST_DETAIL_REQUEST:
            return { ...state, isLoading: true, costCenterList: [] }
        case ReportsProcessTypes.GET_COSTCENTER_LIST_DETAIL_SUCCESS:
            return { ...state, isLoading: false, costCenterList: response.data }
        case ReportsProcessTypes.GET_COSTCENTER_LIST_DETAIL_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.GET_EMPLOYEE_LIST_DETAIL_REQUEST:
            return { ...state, isLoading: true, employeesList: [] }
        case ReportsProcessTypes.GET_EMPLOYEE_LIST_DETAIL_SUCCESS:
            return { ...state, isLoading: false, employeesList: response.data }
        case ReportsProcessTypes.GET_EMPLOYEE_LIST_DETAIL_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_RESOURCE_OPERATIONS_REPORT_REQUEST:
            return { ...state, isLoading: true, resourceReportResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_RESOURCE_OPERATIONS_REPORT_SUCCESS:
            return { ...state, isLoading: false, resourceReportResponse: response }
        case ReportsProcessTypes.DOWNLOAD_RESOURCE_OPERATIONS_REPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_OPERATIONS_CAPACITY_REPORT_REQUEST:
            return { ...state, isLoading: true, capacityReportResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_OPERATIONS_CAPACITY_REPORT_SUCCESS:
            return { ...state, isLoading: false, capacityReportResponse: response }
        case ReportsProcessTypes.DOWNLOAD_OPERATIONS_CAPACITY_REPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_OPERATIONS_POSITIONS_REPORT_REQUEST:
            return { ...state, isLoading: true, positionsReportResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_OPERATIONS_POSITIONS_REPORT_SUCCESS:
            return { ...state, isLoading: false, positionsReportResponse: response }
        case ReportsProcessTypes.DOWNLOAD_OPERATIONS_POSITIONS_REPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_COSTCENTER_REQUEST:
            return { ...state, isLoading: true, timesheetCostCenterReportResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_COSTCENTER_SUCCESS:
            return { ...state, isLoading: false, timesheetCostCenterReportResponse: response }
        case ReportsProcessTypes.DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_COSTCENTER_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_SHORTID_REQUEST:
            return { ...state, isLoading: true, timesheetShortIDReportResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_SHORTID_SUCCESS:
            return { ...state, isLoading: false, timesheetShortIDReportResponse: response }
        case ReportsProcessTypes.DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_SHORTID_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_OPERATIONS_TASKREPORT_REQUEST:
            return { ...state, isLoading: true, taskReportResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_OPERATIONS_TASKREPORT_SUCCESS:
            return { ...state, isLoading: false, taskReportResponse: response }
        case ReportsProcessTypes.DOWNLOAD_OPERATIONS_TASKREPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        default: {
            return state
        }
    }
}

export const businessReports: any = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case ReportsProcessTypes.INIT_BIZ_REPORT:
            return {
                ...state, loading: false, isLoading: false, errors: null, items: [], customerBizReportResponse: {},
                leadsBizReportResponse: {}, detailedBizExcelResponse: {}, detailedBizPdfResponse: {},
                bizSetupReportResponse: {}, newBizRecruitmentResponse: {}
            }
        case ReportsProcessTypes.GET_BIZCASE_DETAILS_REPORT_REQUEST:
            return { ...state, isLoading: true, bizCaseInfoList: [] }
        case ReportsProcessTypes.GET_BIZCASE_DETAILS_REPORT_SUCCESS:
            return { ...state, isLoading: false, bizCaseInfoList: response.data }
        case ReportsProcessTypes.GET_BIZCASE_DETAILS_REPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_CUSTOMER_BIZ_REPORT_REQUEST:
            return { ...state, isLoading: true, customerBizReportResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_CUSTOMER_BIZ_REPORT_SUCCESS:
            return { ...state, isLoading: false, customerBizReportResponse: response }
        case ReportsProcessTypes.DOWNLOAD_CUSTOMER_BIZ_REPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_LEADS_BIZ_REPORT_REQUEST:
            return { ...state, isLoading: true, leadsBizReportResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_LEADS_BIZ_REPORT_SUCCESS:
            return { ...state, isLoading: false, leadsBizReportResponse: response }
        case ReportsProcessTypes.DOWNLOAD_LEADS_BIZ_REPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_DETAILED_BIZCASE_EXCELREPORT_REQUEST:
            return { ...state, isLoading: true, detailedBizExcelResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_DETAILED_BIZCASE_EXCELREPORT_SUCCESS:
            return { ...state, isLoading: false, detailedBizExcelResponse: response }
        case ReportsProcessTypes.DOWNLOAD_DETAILED_BIZCASE_EXCELREPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_DETAILED_BIZCASE_PDFREPORT_REQUEST:
            return { ...state, isLoading: true, detailedBizPdfResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_DETAILED_BIZCASE_PDFREPORT_SUCCESS:
            return { ...state, isLoading: false, detailedBizPdfResponse: response }
        case ReportsProcessTypes.DOWNLOAD_DETAILED_BIZCASE_PDFREPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_BIZ_SETUP_REPORT_REQUEST:
            return { ...state, isLoading: true, bizSetupReportResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_BIZ_SETUP_REPORT_SUCCESS:
            return { ...state, isLoading: false, bizSetupReportResponse: response }
        case ReportsProcessTypes.DOWNLOAD_BIZ_SETUP_REPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        case ReportsProcessTypes.DOWNLOAD_NEW_BIZ_RECRUITMENT_REPORT_REQUEST:
            return { ...state, isLoading: true, newBizRecruitmentResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_NEW_BIZ_RECRUITMENT_REPORT_SUCCESS:
            return { ...state, isLoading: false, newBizRecruitmentResponse: response }
        case ReportsProcessTypes.DOWNLOAD_NEW_BIZ_RECRUITMENT_REPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        default: {
            return state
        }
    }
}

export const slaReports: any = (state = initialState, action) => {
    const response = action.data;
    switch (action.type) {
        case ReportsProcessTypes.INIT_SLA_REPORT:
            return {
                ...state, loading: false, isLoading: false, errors: null, items: [], slaDetailReportResponse: {}
            }
        case ReportsProcessTypes.DOWNLOAD_SLA_REPORT_REQUEST:
            return { ...state, isLoading: true, slaDetailReportResponse: {} }
        case ReportsProcessTypes.DOWNLOAD_SLA_REPORT_SUCCESS:
            return { ...state, isLoading: false, slaDetailReportResponse: response }
        case ReportsProcessTypes.DOWNLOAD_SLA_REPORT_FAILURE:
            return { ...state, isLoading: false, errors: action.error }
        default: {
            return state
        }
    }
}
