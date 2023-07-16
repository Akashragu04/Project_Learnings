import { ReportsProcessTypes } from '../sagas/Types';

/**
 * Business Reports Actions
 */

export const initBusinessReportsAction = () => ({
    type: ReportsProcessTypes.INIT_BIZ_REPORT
})

export const getBizCaseDetailsReportAction = (data: any) => ({
    type: ReportsProcessTypes.GET_BIZCASE_DETAILS_REPORT_REQUEST,
    data
})

export const getBizCaseDetailsReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.GET_BIZCASE_DETAILS_REPORT_SUCCESS,
    data
})

export const getBizCaseDetailsReportFailure = (error: any) => ({
    type: ReportsProcessTypes.GET_BIZCASE_DETAILS_REPORT_FAILURE,
    error
})

export const downloadCustomerBizReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_CUSTOMER_BIZ_REPORT_REQUEST,
    data
})

export const downloadCustomerBizReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_CUSTOMER_BIZ_REPORT_SUCCESS,
    data
})

export const downloadCustomerBizReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_CUSTOMER_BIZ_REPORT_FAILURE,
    error
})

export const downloadLeadsBizReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_LEADS_BIZ_REPORT_REQUEST,
    data
})

export const downloadLeadsBizReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_LEADS_BIZ_REPORT_SUCCESS,
    data
})

export const downloadLeadsBizReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_LEADS_BIZ_REPORT_FAILURE,
    error
})

export const downloadDetailedBizCaseExcelReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_DETAILED_BIZCASE_EXCELREPORT_REQUEST,
    data
})

export const downloadDetailedBizCaseExcelReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_DETAILED_BIZCASE_EXCELREPORT_SUCCESS,
    data
})

export const downloadDetailedBizCaseExcelReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_DETAILED_BIZCASE_EXCELREPORT_FAILURE,
    error
})

export const downloadDetailedBizCasePdfReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_DETAILED_BIZCASE_PDFREPORT_REQUEST,
    data
})

export const downloadDetailedBizCasePdfReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_DETAILED_BIZCASE_PDFREPORT_SUCCESS,
    data
})

export const downloadDetailedBizCasePdfReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_DETAILED_BIZCASE_PDFREPORT_FAILURE,
    error
})

export const downloadBizCaseSetupReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_BIZ_SETUP_REPORT_REQUEST,
    data
})

export const downloadBizCaseSetupReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_BIZ_SETUP_REPORT_SUCCESS,
    data
})

export const downloadBizCaseSetupReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_BIZ_SETUP_REPORT_FAILURE,
    error
})

export const downloadNewBizRecruitmentReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_NEW_BIZ_RECRUITMENT_REPORT_REQUEST,
    data
})

export const downloadNewBizRecruitmentReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_NEW_BIZ_RECRUITMENT_REPORT_SUCCESS,
    data
})

export const downloadNewBizRecruitmentReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_NEW_BIZ_RECRUITMENT_REPORT_FAILURE,
    error
})

/**
 * SLA Reports Actions
 */

export const initSLAReportsAction = () => ({
    type: ReportsProcessTypes.INIT_SLA_REPORT
})

export const downloadSLAReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_SLA_REPORT_REQUEST,
    data
})

export const downloadSLAReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_SLA_REPORT_SUCCESS,
    data
})

export const downloadSLAReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_SLA_REPORT_FAILURE,
    error
})

/**
 * Operations Reports Actions
 */

 export const initOperationsReportsAction = () => ({
    type: ReportsProcessTypes.INIT_OPERATIONS_REPORT_PROCESS
})

export const getCostCenterListDetailAction = (data: any) => ({
    type: ReportsProcessTypes.GET_COSTCENTER_LIST_DETAIL_REQUEST,
    data
})

export const getCostCenterListDetailSuccess = (data: any) => ({
    type: ReportsProcessTypes.GET_COSTCENTER_LIST_DETAIL_SUCCESS,
    data
})

export const getCostCenterListDetailFailure = (error: any) => ({
    type: ReportsProcessTypes.GET_COSTCENTER_LIST_DETAIL_FAILURE,
    error
})

export const getEmployeeListDetailAction = (data: any) => ({
    type: ReportsProcessTypes.GET_EMPLOYEE_LIST_DETAIL_REQUEST,
    data
})

export const getEmployeeListDetailSuccess = (data: any) => ({
    type: ReportsProcessTypes.GET_EMPLOYEE_LIST_DETAIL_SUCCESS,
    data
})

export const getEmployeeListDetailFailure = (error: any) => ({
    type: ReportsProcessTypes.GET_EMPLOYEE_LIST_DETAIL_FAILURE,
    error
})

export const getProjectsListDetailAction = (data: any) => ({
    type: ReportsProcessTypes.GET_PROJECTS_LIST_DETAIL_REQUEST,
    data
})

export const getProjectsListDetailSuccess = (data: any) => ({
    type: ReportsProcessTypes.GET_PROJECTS_LIST_DETAIL_SUCCESS,
    data
})

export const getProjectsListDetailFailure = (error: any) => ({
    type: ReportsProcessTypes.GET_PROJECTS_LIST_DETAIL_FAILURE,
    error
})

export const downloadResourceOperationsReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_RESOURCE_OPERATIONS_REPORT_REQUEST,
    data
})

export const downloadResourceOperationsReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_RESOURCE_OPERATIONS_REPORT_SUCCESS,
    data
})

export const downloadResourceOperationsReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_RESOURCE_OPERATIONS_REPORT_FAILURE,
    error
})

export const downloadOperationsCapacityReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_OPERATIONS_CAPACITY_REPORT_REQUEST,
    data
})

export const downloadOperationsCapacityReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_OPERATIONS_CAPACITY_REPORT_SUCCESS,
    data
})

export const downloadOperationsCapacityReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_OPERATIONS_CAPACITY_REPORT_FAILURE,
    error
})

export const downloadOperationsPositionsReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_OPERATIONS_POSITIONS_REPORT_REQUEST,
    data
})

export const downloadOperationsPositionsReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_OPERATIONS_POSITIONS_REPORT_SUCCESS,
    data
})

export const downloadOperationsPositionsReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_OPERATIONS_POSITIONS_REPORT_FAILURE,
    error
})

export const downloadOperationsTimesheetAsCostCenterReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_COSTCENTER_REQUEST,
    data
})

export const downloadOperationsTimesheetAsCostCenterReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_COSTCENTER_SUCCESS,
    data
})

export const downloadOperationsTimesheetAsCostCenterReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_COSTCENTER_FAILURE,
    error
})

export const downloadOperationsTimesheetAsShortIDReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_SHORTID_REQUEST,
    data
})

export const downloadOperationsTimesheetAsShortIDReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_SHORTID_SUCCESS,
    data
})

export const downloadOperationsTimesheetAsShortIDReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_SHORTID_FAILURE,
    error
})

export const downloadOperationsTaskReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_OPERATIONS_TASKREPORT_REQUEST,
    data
})

export const downloadOperationsTaskReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_OPERATIONS_TASKREPORT_SUCCESS,
    data
})

export const downloadOperationsTaskReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_OPERATIONS_TASKREPORT_FAILURE,
    error
})

/**
 * Finance Report Module
 */

 export const initFinanceReportsAction = () => ({
    type: ReportsProcessTypes.INIT_FINANCE_REPORT_PROCESS
})

export const downloadRevenueSummaryReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_REVENUESUMMARY_REPORT_REQUEST,
    data
})

export const downloadRevenueSummaryReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_REVENUESUMMARY_REPORT_SUCCESS,
    data
})

export const downloadRevenueSummaryReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_REVENUESUMMARY_REPORT_FAILURE,
    error
})

export const downloadAccuralsReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_ACCURALS_REPORT_REQUEST,
    data
})

export const downloadAccuralsReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_ACCURALS_REPORT_SUCCESS,
    data
})

export const downloadAccuralsReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_ACCURALS_REPORT_FAILURE,
    error
})

export const downloadTravelCostReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_TRAVELCOST_REPORT_REQUEST,
    data
})

export const downloadTravelCostReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_TRAVELCOST_REPORT_SUCCESS,
    data
})

export const downloadTravelCostReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_TRAVELCOST_REPORT_FAILURE,
    error
})

export const downloadMaterialExpenseRevenueReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_MATERIAL_EXPENSE_AND_REVENUE_REPORT_REQUEST,
    data
})

export const downloadMaterialExpenseRevenueReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_MATERIAL_EXPENSE_AND_REVENUE_REPORT_SUCCESS,
    data
})

export const downloadMaterialExpenseRevenueReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_MATERIAL_EXPENSE_AND_REVENUE_REPORT_FAILURE,
    error
})

/**
 * Resource Report Module
 */

 export const initResourceReportAction = () => ({
    type: ReportsProcessTypes.INIT_RESOURCE_REPORT_PROCESS
})

export const downloadManpowerSkillsetReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_MANPOWER_SKILLSET_REPORT_REQUEST,
    data
})

export const downloadManpowerSkillsetReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_MANPOWER_SKILLSET_REPORT_SUCCESS,
    data
})

export const downloadManpowerSkillsetReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_MANPOWER_SKILLSET_REPORT_FAILURE,
    error
})

export const downloadBenchResourceReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_BENCHRESOURCES_REPORT_REQUEST,
    data
})

export const downloadBenchResourceReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_BENCHRESOURCES_REPORT_SUCCESS,
    data
})

export const downloadBenchResourceReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_BENCHRESOURCES_REPORT_FAILURE,
    error
})

export const downloadAttritionResourceReportAction = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_ATTRITION_RESOURCE_REPORT_REQUEST,
    data
})

export const downloadAttritionResourceReportSuccess = (data: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_ATTRITION_RESOURCE_REPORT_SUCCESS,
    data
})

export const downloadAttritionResourceReportFailure = (error: any) => ({
    type: ReportsProcessTypes.DOWNLOAD_ATTRITION_RESOURCE_REPORT_FAILURE,
    error
})
