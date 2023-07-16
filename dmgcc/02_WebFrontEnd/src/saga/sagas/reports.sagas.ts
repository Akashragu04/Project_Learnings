import { takeEvery, call, put } from "redux-saga/effects";
import { ReportsProcessTypes } from "./Types";
import {
  downloadAccuralsReportFailure,
  downloadAccuralsReportSuccess,
  downloadAttritionResourceReportFailure,
  downloadAttritionResourceReportSuccess,
  downloadBenchResourceReportFailure,
  downloadBenchResourceReportSuccess,
  downloadBizCaseSetupReportFailure, downloadBizCaseSetupReportSuccess, downloadCustomerBizReportFailure, downloadCustomerBizReportSuccess,
  downloadDetailedBizCaseExcelReportFailure, downloadDetailedBizCaseExcelReportSuccess, downloadDetailedBizCasePdfReportFailure, downloadDetailedBizCasePdfReportSuccess,
  downloadLeadsBizReportFailure, downloadLeadsBizReportSuccess, downloadManpowerSkillsetReportFailure, downloadManpowerSkillsetReportSuccess, downloadMaterialExpenseRevenueReportFailure, downloadMaterialExpenseRevenueReportSuccess, downloadNewBizRecruitmentReportFailure, downloadNewBizRecruitmentReportSuccess, downloadOperationsCapacityReportFailure,
  downloadOperationsCapacityReportSuccess, downloadOperationsPositionsReportFailure, downloadOperationsPositionsReportSuccess, downloadOperationsTaskReportFailure,
  downloadOperationsTaskReportSuccess, downloadOperationsTimesheetAsCostCenterReportFailure, downloadOperationsTimesheetAsCostCenterReportSuccess,
  downloadOperationsTimesheetAsShortIDReportFailure, downloadOperationsTimesheetAsShortIDReportSuccess, downloadResourceOperationsReportFailure, downloadResourceOperationsReportSuccess,
  downloadRevenueSummaryReportFailure,
  downloadRevenueSummaryReportSuccess,
  downloadSLAReportFailure, downloadSLAReportSuccess, downloadTravelCostReportFailure, downloadTravelCostReportSuccess, getBizCaseDetailsReportFailure, getBizCaseDetailsReportSuccess, getCostCenterListDetailFailure, getCostCenterListDetailSuccess,
  getEmployeeListDetailFailure, getEmployeeListDetailSuccess, getErrorTokenResponseSuccess, getProjectsListDetailFailure, getProjectsListDetailSuccess
} from "saga/Actions";
import { ConfigAPI } from "services/config";
import { baseAPI } from "services/Service";
import { toast } from 'react-toastify';
import { appConstants } from "shared/constants/AppConst";


export const watchDownloadCustomerBizReport = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_CUSTOMER_BIZ_REPORT_REQUEST, workerDownloadCustomerBizReport)
}

export const watchDownloadLeadsBizReport = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_LEADS_BIZ_REPORT_REQUEST, workerDownloadLeadsBizReport)
}

export const watchDownloadDetailedBizExcelReport = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_DETAILED_BIZCASE_EXCELREPORT_REQUEST, workerDownloadDetailedBizExcelReport)
}

export const watchDownloadDetailedBizPdfReport = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_DETAILED_BIZCASE_PDFREPORT_REQUEST, workerDownloadDetailedBizPdfReport)
}

export const watchDownloadBizSetupReport = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_BIZ_SETUP_REPORT_REQUEST, workerDownloadBizSetupReport)
}

export const watchDownloadNewBizRecruimentReport = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_NEW_BIZ_RECRUITMENT_REPORT_REQUEST, workerDownloadNewBizRecruimentReport)
}

export const watchGetBizCaseDetailsReport = function* () {
  yield takeEvery(ReportsProcessTypes.GET_BIZCASE_DETAILS_REPORT_REQUEST, workerGetBizCaseDetailsReport)
}

export const watchDownloadSLAReports = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_SLA_REPORT_REQUEST, workerDownloadSLAReports)
}

export const watchDownloadOpertionsResourceReports = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_RESOURCE_OPERATIONS_REPORT_REQUEST, workerDownloadOpertionsResourceReports)
}

export const watchDownloadOperationsCapcityReports = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_OPERATIONS_CAPACITY_REPORT_REQUEST, workerDownloadOperationsCapcityReports)
}

export const watchDownloadOperationsPositionsReports = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_OPERATIONS_POSITIONS_REPORT_REQUEST, workerDownloadOperationsPositionsReports)
}

export const watchDownloadOperationsTimesheerAsCostCenterReports = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_COSTCENTER_REQUEST, workerDownloadOperationsTimesheerAsCostCenterReport)
}

export const watchDownloadOperationsTimesheerAsShortIDReport = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_OPERATIONS_TIMESHEET_REPORT_AS_SHORTID_REQUEST, workerDownloadOperationsTimesheerAsShortIDReport)
}

export const watchDownloadOperationsTaskReports = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_OPERATIONS_TASKREPORT_REQUEST, workerDownloadOperationsTaskReports)
}

export const watchGetCostCenterListDetails = function* () {
  yield takeEvery(ReportsProcessTypes.GET_COSTCENTER_LIST_DETAIL_REQUEST, workerGetCostCenterListDetails)
}

export const watchGetEmployeesListDetails = function* () {
  yield takeEvery(ReportsProcessTypes.GET_EMPLOYEE_LIST_DETAIL_REQUEST, workerGetEmployeesListDetails)
}

export const watchGetProjectsListDetails = function* () {
  yield takeEvery(ReportsProcessTypes.GET_PROJECTS_LIST_DETAIL_REQUEST, workerGeProjectsListDetails)
}

export const watchDownloadRevenueSummaryReport = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_REVENUESUMMARY_REPORT_REQUEST, workerDownloadRevenueSummaryReport)
}

export const watchDownloadFinanceAccuralseReport = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_ACCURALS_REPORT_REQUEST, workerDownloadFinanceAccuralseReport)
}

export const watchDownloadFinanceTravelCostReport = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_TRAVELCOST_REPORT_REQUEST, workerDownloadFinanceTravelCostReport)
}

export const watchDownloadMaterialRevenueExpenseReport = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_MATERIAL_EXPENSE_AND_REVENUE_REPORT_REQUEST, workerDownloadMaterialRevenueExpenseReport)
}

export const watchDownloadManpowerSkillSetReport = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_MANPOWER_SKILLSET_REPORT_REQUEST, workerDownloadManpowerSkillSetReport)
}

export const watchDownloadBenchResourceReport = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_BENCHRESOURCES_REPORT_REQUEST, workerDownloadBenchResourceReport)
}

export const watchDownloadAttritionReport = function* () {
  yield takeEvery(ReportsProcessTypes.DOWNLOAD_ATTRITION_RESOURCE_REPORT_REQUEST, workerDownloadAttritionReport)
}


function* workerDownloadAttritionReport(action: any) {
  try {
    const uri = ConfigAPI.getAttritionReport;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data) {
      yield put(downloadAttritionResourceReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadAttritionResourceReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadAttritionResourceReportFailure(error))
  }
}

function* workerDownloadBenchResourceReport(action: any) {
  try {
    const uri = ConfigAPI.getBenchResourceReport;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data) {
      yield put(downloadBenchResourceReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadBenchResourceReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadBenchResourceReportFailure(error))
  }
}

function* workerDownloadManpowerSkillSetReport(action: any) {
  try {
    const uri = ConfigAPI.getManpowerSkillSetReport;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data) {
      yield put(downloadManpowerSkillsetReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadManpowerSkillsetReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadManpowerSkillsetReportFailure(error))
  }
}

function* workerDownloadMaterialRevenueExpenseReport(action: any) {
  try {
    const uri = ConfigAPI.getMaterialRevenueExpenseReport;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data) {
      yield put(downloadMaterialExpenseRevenueReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadMaterialExpenseRevenueReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadMaterialExpenseRevenueReportFailure(error))
  }
}

function* workerDownloadFinanceTravelCostReport(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getTravelCostReport;
    const response = yield call(baseAPI.get, `${uri}${request.project_id}`);
    if (response.data) {
      yield put(downloadTravelCostReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadTravelCostReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadTravelCostReportFailure(error))
  }
}

function* workerDownloadFinanceAccuralseReport(action: any) {
  try {
    const uri = ConfigAPI.getAccuralsReport;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data) {
      yield put(downloadAccuralsReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadAccuralsReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadAccuralsReportFailure(error))
  }
}

function* workerDownloadRevenueSummaryReport(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getRevenueSummaryReport;
    const response = yield call(baseAPI.get, `${uri}${request.year}`);
    if (response.data) {
      yield put(downloadRevenueSummaryReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadRevenueSummaryReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadRevenueSummaryReportFailure(error))
  }
}

function* workerGeProjectsListDetails(action: any) {
  try {
    const uri = ConfigAPI.getProjectsListDetails;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data.status) {
      yield put(getProjectsListDetailSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getProjectsListDetailFailure(response.data))
    }
  } catch (error: any) {
    yield put(getProjectsListDetailFailure(error))
  }
}

function* workerGetEmployeesListDetails(action: any) {
  try {
    const uri = ConfigAPI.getShortIDListDetails;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data.status) {
      yield put(getEmployeeListDetailSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getEmployeeListDetailFailure(response.data))
    }
  } catch (error: any) {
    yield put(getEmployeeListDetailFailure(error))
  }
}

function* workerGetCostCenterListDetails(action: any) {
  try {
    const uri = ConfigAPI.getCostCenterListDetails;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data.status) {
      yield put(getCostCenterListDetailSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getCostCenterListDetailFailure(response.data))
    }
  } catch (error: any) {
    yield put(getCostCenterListDetailFailure(error))
  }
}

function* workerDownloadOperationsTaskReports(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getOperationTaskReports;
    const response = yield call(baseAPI.get, `${uri}${request.project_id}`);
    if (response.data) {
      yield put(downloadOperationsTaskReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadOperationsTaskReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadOperationsTaskReportFailure(error))
  }
}

function* workerDownloadOperationsTimesheerAsShortIDReport(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getOperationTimesheetShortIDReports;
    const response = yield call(baseAPI.get, `${uri}${request.shortID}`);
    if (response.data) {
      yield put(downloadOperationsTimesheetAsShortIDReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadOperationsTimesheetAsShortIDReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadOperationsTimesheetAsShortIDReportFailure(error))
  }
}

function* workerDownloadOperationsTimesheerAsCostCenterReport(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getOperationTimesheetCostCenterReports;
    const response = yield call(baseAPI.get, `${uri}${request.costcenter}`);
    if (response.data) {
      yield put(downloadOperationsTimesheetAsCostCenterReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadOperationsTimesheetAsCostCenterReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadOperationsTimesheetAsCostCenterReportFailure(error))
  }
}

function* workerDownloadOperationsPositionsReports(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getOperationPositionsReports;
    const response = yield call(baseAPI.get, `${uri}${request.costcenter}`);
    if (response.data) {
      yield put(downloadOperationsPositionsReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadOperationsPositionsReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadOperationsPositionsReportFailure(error))
  }
}

function* workerDownloadOperationsCapcityReports(action: any) {
  try {
    const uri = ConfigAPI.getOperationCapacityReports;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data) {
      yield put(downloadOperationsCapacityReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadOperationsCapacityReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadOperationsCapacityReportFailure(error))
  }
}

function* workerDownloadOpertionsResourceReports(action: any) {
  try {
    const uri = ConfigAPI.getOperationResourceReports;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data) {
      yield put(downloadResourceOperationsReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadResourceOperationsReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadResourceOperationsReportFailure(error))
  }
}

function* workerDownloadSLAReports(action: any) {
  try {
    const uri = ConfigAPI.getSLADetailsReport;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data) {
      yield put(downloadSLAReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadSLAReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadSLAReportFailure(error))
  }
}

function* workerGetBizCaseDetailsReport(action: any) {
  try {
    const uri = ConfigAPI.getBizCaseDetailsListReport;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data.status) {
      yield put(getBizCaseDetailsReportSuccess(response.data))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(getBizCaseDetailsReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(getBizCaseDetailsReportFailure(error))
  }
}

function* workerDownloadNewBizRecruimentReport(action: any) {
  try {
    const uri = ConfigAPI.getDownloadRecruitments;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data) {
      yield put(downloadNewBizRecruitmentReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadNewBizRecruitmentReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadNewBizRecruitmentReportFailure(error))
  }
}

function* workerDownloadBizSetupReport(action: any) {
  try {
    const uri = ConfigAPI.getBizSetupReport;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data) {
      yield put(downloadBizCaseSetupReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadBizCaseSetupReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadBizCaseSetupReportFailure(error))
  }
}

function* workerDownloadDetailedBizPdfReport(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getDetailedBizPdfReport;
    const response = yield call(baseAPI.get, `${uri}${request.bizcase_id}`);
    if (response.data) {
      yield put(downloadDetailedBizCasePdfReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadDetailedBizCasePdfReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadDetailedBizCasePdfReportFailure(error))
  }
}

function* workerDownloadDetailedBizExcelReport(action: any) {
  const request = action.data;
  try {
    const uri = ConfigAPI.getDetailedBizExcelReport;
    const response = yield call(baseAPI.get, `${uri}${request.bizcase_id}`);
    if (response.data) {
      yield put(downloadDetailedBizCaseExcelReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadDetailedBizCaseExcelReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadDetailedBizCaseExcelReportFailure(error))
  }
}

function* workerDownloadLeadsBizReport(action: any) {
  try {
    const uri = ConfigAPI.getLeadBizReport;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data) {
      yield put(downloadLeadsBizReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadLeadsBizReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadLeadsBizReportFailure(error))
  }
}

function* workerDownloadCustomerBizReport(action: any) {
  try {
    const uri = ConfigAPI.getCustomerBizReport;
    const response = yield call(baseAPI.get, `${uri}`);
    if (response.data) {
      yield put(downloadCustomerBizReportSuccess(response))
    } else if(response.data.status === false && response.data?.message === appConstants.invalidToken){
      yield put( getErrorTokenResponseSuccess({
       payload:response.data,
       resTokenError:true
     }));
   }  else {
      toast.warn(response.data.message, { position: 'bottom-right' });
      yield put(downloadCustomerBizReportFailure(response.data))
    }
  } catch (error: any) {
    yield put(downloadCustomerBizReportFailure(error))
  }
}
