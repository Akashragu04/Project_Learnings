import { all } from "redux-saga/effects";
import {
    watchCreateBizRequirement, watchGetBizIterationsDetails, watchGetBizRequirementDetail,
    watchGetExistingRateCardList, watchGetFacilityUserDetails, watchGetFinanceUserDetails, watchGetHRUserDetails, watchGetITUserDetails,
    watchSaveandNotifyAllBizRequirement, watchSaveandNotifyBizRequirement, watchSendFinanceBizMailData, watchSetActiveRampupIterationData, 
    watchSetRequirementWoBizCase,
    watchUpdateBizRequirement
} from "./businessRequirement.sagas";
import { getLogin, getLogout, postForgetpassword, onChangePassword, getTokenResponse, clearLoginDetails } from '../Actions/auth.actions';
import {
    getLeads, addLeads, getUserDetail, pullAssignUser, getLeadsEdit, putLeadsDetails,
    clearBusinessDetails, getBusinessCaseReq, getBusinessCaseApprovel,
    businessCaseApprovel, removeImage, resendMail, leadsConversionAvg, getDepartmentLists, getStepperLists, getBizCaseSetupChart, 
    getCustomerAndBusiness
} from '../Actions/business.actions';
import {
    watchCreateBizJDAssignAndMapping, watchCreateBizJDMapping, watchGetBizJDMappingDetail,
    watchGetBizProjectJDDetail, watchGetJDListOptions, watchSetJDFileUpload
} from "./businessJDMapping.sagas";
import {
    getProject, getProjectOverview, getProjectListDetails, getResourceAllocationDetails, getSLAList, postResourceAllocation,
    getCapacityManagement, getTimesheetProject, getTimesheetSLA, getTimesheetTask, postTimesheet, getEmpTimesheet, taskFileupload,
    uploadTask, postTask, getTaskProjectList, getTaskResource, getTaskSLA, getTaskDetails,
    getTask, capacityResource, capacitySLA, allocateResource, updateAllocateResource, updateStatusTaskOverview, postChangeCapnitiTask, OnClearCapnitiDetails, postReopenTask
} from '../Actions/operation.action';
import {
    getCostCentre, getCostCentreResource, putResourceRecord, getResourceRecord,
    getUtilization, getEmployee, getThirdpartyResource, addThirdpartyResource, updateThirdpartyResource,
    deleteThirdpartyResource, getResourceDetails, getJDMappingDetails, postJDMappingDetails, putJDMappingDetails, restInitialData
} from '../Actions/resources.actions';
import { watchGetAllBizCaseDetails, watchGetBizC4DSLADetails, watchUpdateBizC4DSLADetail, 
    watchUpdateBizSLAContractDetail } from "./businessCaseSLA.sagas";
import {
    watchCheckAddProvisionDetails,
    watchCreateEntityMaster,
    watchCreateMaterialMaster,
    watchDownloadAccuralInfo,
    watchDownloadProvisionsOverallReport,
    watchGetAccuralsDetails,
    watchGetAllAccuralsDetails, watchGetAllCostCenterYTDDetails, watchGetAllEntityMasterDetails,
    watchGetAllMaterialMasterDetails, watchGetAllProvisionCostCenterDetails, watchGetAllProvisionsStatusDetails, 
    watchGetAllRateCardDetails, watchGetAllSlaContractsDetails, watchGetAllSlaCountrysDetails, watchGetBizRateCardDetails,
    watchGetCostCenterYTDDetails, watchGetProvisionArchieveReport, watchGetProvisionsFilterDetails, watchGetProvisionsOverallMetrics, 
    watchUpdateAccuralsDetails, watchUpdateBizRateCardDetails, watchUpdateEntityMaster, watchUpdateMaterialMaster,
    watchUpdateProvisionDetails, watchUploadAccuralInfo, watchUploadCostCenterYTD, watchUploadEntityMaster, watchUploadMaterialMaster
} from "./finance.sagas";
import {
    getBizCaseSLA, getBizCaseSLACustomerDetails, getBizCaseSLACostcenterDetails, getBizCaseSLAMaterialDescDetails,
    getBizCaseSLAEditDetails, updateBizCaseSLA, updateTermsConditions, updateAttachmentsConditions, getBillingCycleList,
    getPerinvoice, getProjectSLADetails, getOrganization, getBillingcycle, updateBizCaseSLADetails, getMaterialdescription, 
    getCountryList, getContractOption, getRateCardList, getTariffSheetMaterialdescription, sentApprovalSla, getApprovalSla
} from "../Actions/BizCaseSLA.action"
import { watchGetAllPreInvoiceDetails, watchGetAllInvoiceDetails, watchGetPreInvoiceDetail } from "./preInvoice.sagas"
import { putBusinessSetup, postBusinessSetup, getBusinessSetup, getBusinessSetupInfo } from '../Actions/BusinessSetup.actions';
import {
    watchCreateUserRoleMapping, watchGetAllProjectOnwerDetails, watchGetAllRoleBasedUsersDetails, watchGetBusinessRolesList,
    watchGetUnmappedUsersList, watchGetUserRolesList, watchUpdateProjectOwner
} from "./settings.sagas";
import {
    AddFinanceCostCentre, editFinanceCostCentre, getFinanceCostCentre,
    downloadFinanceCostCentre, uploadFinanceCostCentre, uploadFinanceIOMapping,
    downloadFinanceIOMapping, getFinanceIOMapping, AddFinanceIOMapping, uploadFinanceForoxRate,
    downloadFinanceForoxRate, getFinanceForoxRate, AddFinanceForoxRate, editFinanceForoxRate,
    AddFinanceVendor, editFinanceVendor, getFinanceVendor, uploadFinanceVendor,
    AddFinanceIODump, editFinanceIODump, getFinanceIODump, uploadFinanceIODump, uploadFinanceRateCard,
    getFinanceRateCard, addFinanceRateCard, editFinanceRateCard, downloadFileObjectCommon, clearStatus, getIoCcChart, putMarketData, getMarketData, onChangeCostCenterStatus
} from '../Actions/FinanceMaster.actions'
import { createPreInvoice, getPreInvoiceSLAEditDetails, reqDeleteProvisions, reqProjectProvisions, reqSLAProvisions } from '../Actions/Preinvoice.action'
import { watchGetBizCalculationIterationList, watchGetBizProfitLossCalculationDetail, watchGetBizProfitLossIterationsDetail, 
    watchUpdateBizProfitCalculation, watchUpdateFinalBizProfitCalculation } from "./businessCalculations.sagas";
import { watchSetCommonFileUpload } from "./common.sagas";
import {  getBusinessDashboard, getDashboardDetails, getCapabilitiesData, getCostEngineeringData, getCustomerServicesData, getFinanceControllingData,
    getHumanResourcesData, getInformationRechnologyData, getLeanProcessData, getManufacturingEngineerData, 
    getProductEngineerData, getQualityManagementData, getSupplierManagementData,  postAddContentData, getNewsletterDownloadData, 
    getNewsletterData, getContentDownloadData, getContentDetailsData, getBrochureDownloadData, getBrochureDetailsData, clearStatusDashboard, 
    commonGet,
    commonGetBrochure,
    getCostEngineeringSubCntData,
    getCustomerServicesSubCntData,
    getFinanceControllingSubCntData,
    getHumanResourcesSubCntData,
    getLatestNewsletterData,
    getLeanProcessSubCntData,
    getManufacturingEngineerSubCntData,
    getProductEngineerSubCntData,
    getQualityManagementSubCntData,
    getSupplierManagementSubCntData,
    clearFinanceStatus} from "saga/Actions";
import {
    watchDownloadCustomerBizReport, watchDownloadLeadsBizReport, watchDownloadDetailedBizExcelReport, watchDownloadDetailedBizPdfReport,
    watchDownloadBizSetupReport, watchDownloadNewBizRecruimentReport, watchGetBizCaseDetailsReport, watchDownloadSLAReports, 
    watchDownloadOperationsCapcityReports, watchDownloadOperationsPositionsReports,
    watchDownloadOperationsTaskReports, watchDownloadOperationsTimesheerAsCostCenterReports, watchDownloadOperationsTimesheerAsShortIDReport,
     watchDownloadOpertionsResourceReports,
    watchGetCostCenterListDetails, watchGetEmployeesListDetails, watchGetProjectsListDetails, watchDownloadAttritionReport, 
    watchDownloadBenchResourceReport, watchDownloadFinanceAccuralseReport, watchDownloadFinanceTravelCostReport,
    watchDownloadManpowerSkillSetReport, watchDownloadMaterialRevenueExpenseReport, watchDownloadRevenueSummaryReport
} from "./reports.sagas";
import { assignRole, getRole, getUsersWithOutRole, getUsersWithRole } from "saga/Actions/admin.action";
import { watchCreateNewCustomer, watchRemovePushNotification } from "./auth.sagas";
import { getAboutUsData, getServicesData, getTestimonialData, getTeamMembersData, getMissionVisionData, postAboutUsData, 
    putAboutUsData, postServicesData, putServicesData, postTestimonialData, putTestimonialData, postTeamMembersData, 
    putTeamMembersData, postMissionVisionData, putMissionVisionData, commonUpload, clearState, commonDelete, commonPut, 
    commonPost, commonSubContentDelete, commonSubContentGet, commonSubContentPut, commonSubContentPost, commonUploadLandingPage, 
    commonDownload, 
    getServiceSubContentData,
    getVisionData,
    getSendMail,
    aboutUsCommonGet} from "saga/Actions/aboutus.action";

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        getLogin(),
        getLogout(),
        postForgetpassword(),
        onChangePassword(),
        getLeads(),
        addLeads(),
        getUserDetail(),
        pullAssignUser(),
        getLeadsEdit(),
        putLeadsDetails(),
        watchGetHRUserDetails(),
        watchGetITUserDetails(),
        watchGetFacilityUserDetails(),
        watchCreateBizRequirement(),
        clearBusinessDetails(),
        getTokenResponse(),
        getBusinessCaseReq(),
        getBusinessCaseApprovel(),
        businessCaseApprovel(),
        watchSaveandNotifyAllBizRequirement(),
        watchSaveandNotifyBizRequirement(),
        watchUpdateBizRequirement(),
        watchGetBizRequirementDetail(),
        watchGetBizIterationsDetails(),
        removeImage(),
        resendMail(),
        leadsConversionAvg(),
        getDepartmentLists(),
        watchGetBizProjectJDDetail(),
        watchGetBizJDMappingDetail(),
        watchCreateBizJDMapping(),
        watchSetJDFileUpload(),
        watchCreateBizJDAssignAndMapping(),
        watchGetJDListOptions(),
        getStepperLists(),
        getProject(),
        getProjectOverview(),
        getProjectListDetails(),
        getResourceAllocationDetails(),
        getSLAList(),
        postResourceAllocation(),
        getCapacityManagement(),
        getTimesheetProject(),
        getEmpTimesheet(),
        postTimesheet(),
        getTimesheetTask(),
        getTimesheetSLA(),
        getTask(),
        getTaskDetails(),
        getTaskSLA(),
        getTaskResource(),
        getTaskProjectList(),
        postTask(),
        uploadTask(),
        taskFileupload(),
        watchGetAllBizCaseDetails(),
        watchGetAllPreInvoiceDetails(),
        capacityResource(),
        capacitySLA(),
        getCostCentre(),
        getCostCentreResource(),
        getResourceRecord(),
        putResourceRecord(),
        watchGetAllBizCaseDetails(),
        watchGetAllRateCardDetails(),
        postBusinessSetup(),
        putBusinessSetup(),
        getBusinessSetup(),
        getBusinessSetupInfo(),
        watchGetAllRoleBasedUsersDetails(),
        watchGetUnmappedUsersList(),
        watchCreateUserRoleMapping(),
        watchGetUserRolesList(),
        getUtilization(),
        getEmployee(),
        getBizCaseSLA(),
        allocateResource(),
        updateAllocateResource(),
        getThirdpartyResource(),
        addThirdpartyResource(),
        updateThirdpartyResource(),
        watchGetExistingRateCardList(),
        getBizCaseSLACustomerDetails(),
        getBizCaseSLACostcenterDetails(),
        getBizCaseSLAMaterialDescDetails(),
        getBizCaseSLAEditDetails(),
        updateBizCaseSLA(),
        deleteThirdpartyResource(),
        watchGetBizRateCardDetails(),
        watchUpdateBizRateCardDetails(),
        AddFinanceCostCentre(),
        editFinanceCostCentre(),
        getFinanceCostCentre(),
        downloadFinanceCostCentre(),
        uploadFinanceCostCentre(),
        createPreInvoice(),
        watchGetAllInvoiceDetails(),
        AddFinanceIOMapping(),
        getFinanceIOMapping(),
        downloadFinanceIOMapping(),
        uploadFinanceIOMapping(),
        editFinanceForoxRate(),
        AddFinanceForoxRate(),
        getFinanceForoxRate(),
        downloadFinanceForoxRate(),
        uploadFinanceForoxRate(),
        watchGetAllAccuralsDetails(),
        watchGetAllCostCenterYTDDetails(),
        watchGetCostCenterYTDDetails(),
        AddFinanceVendor(),
        editFinanceVendor(),
        getFinanceVendor(),
        uploadFinanceVendor(),
        AddFinanceIODump(),
        editFinanceIODump(),
        getFinanceIODump(),
        uploadFinanceIODump(),
        uploadFinanceRateCard(),
        getFinanceRateCard(),
        getPreInvoiceSLAEditDetails(),
        watchGetAllEntityMasterDetails(),
        watchGetAllMaterialMasterDetails(),
        getBizCaseSetupChart(),
        watchCreateEntityMaster(),
        watchUpdateEntityMaster(),
        watchCreateMaterialMaster(),
        watchUpdateMaterialMaster(),
        watchUploadEntityMaster(),
        watchUploadMaterialMaster(),
        watchGetAccuralsDetails(),
        watchUploadAccuralInfo(),
        watchDownloadAccuralInfo(),
        getResourceDetails(),
        editFinanceRateCard(),
        addFinanceRateCard(),
        watchGetAllProjectOnwerDetails(),
        watchGetBusinessRolesList(),
        watchUpdateProjectOwner(),
        updateStatusTaskOverview(),
        postChangeCapnitiTask(),
        updateTermsConditions(),
        updateAttachmentsConditions(),
        getBillingCycleList(),
        getPerinvoice(),
        getProjectSLADetails(),
        getOrganization(),
        getBillingcycle(),
        watchUpdateBizProfitCalculation(),
        watchGetBizCalculationIterationList(),
        watchGetBizProfitLossCalculationDetail(),
        watchGetBizProfitLossIterationsDetail(),
        watchUpdateFinalBizProfitCalculation(),
        watchSetRequirementWoBizCase(),
        watchSetActiveRampupIterationData(),
        watchSendFinanceBizMailData(),
        watchGetFinanceUserDetails(),
        getCustomerAndBusiness(),
        getJDMappingDetails(),
        postJDMappingDetails(),
        putJDMappingDetails(),
        watchUploadCostCenterYTD(),
        getCustomerAndBusiness(),
        getJDMappingDetails(),
        postJDMappingDetails(),
        updateBizCaseSLADetails(),
        watchUpdateBizSLAContractDetail(),
        watchGetPreInvoiceDetail(),
        watchSetCommonFileUpload(),
        watchUpdateBizC4DSLADetail(),
        watchGetBizC4DSLADetails(),
        downloadFileObjectCommon(),
        clearStatus(),
        getDashboardDetails(),
        clearLoginDetails(),
        watchUpdateAccuralsDetails(),
        getMaterialdescription(),
        getCountryList(),
        getContractOption(),
        getRateCardList(),
        getTariffSheetMaterialdescription(),
        watchGetAllProvisionCostCenterDetails(),
        watchGetAllProvisionsStatusDetails(),
        watchGetProvisionsFilterDetails(),
        watchUpdateProvisionDetails(),
        watchGetProvisionArchieveReport(),
        watchCheckAddProvisionDetails(),
        watchDownloadProvisionsOverallReport(),
        watchGetProvisionsOverallMetrics(),
        getBusinessDashboard(),
        getIoCcChart(),
        watchDownloadCustomerBizReport(),
        watchDownloadLeadsBizReport(),
        watchDownloadDetailedBizExcelReport(),
        watchDownloadDetailedBizPdfReport(),
        watchDownloadBizSetupReport(),
        watchDownloadNewBizRecruimentReport(),
        watchGetBizCaseDetailsReport(),
        watchDownloadSLAReports(),
        watchDownloadOpertionsResourceReports(),
        watchDownloadOperationsCapcityReports(),
        watchDownloadOperationsPositionsReports(),
        watchDownloadOperationsTimesheerAsCostCenterReports(),
        watchDownloadOperationsTimesheerAsShortIDReport(),
        watchDownloadOperationsTaskReports(),
        watchGetCostCenterListDetails(),
        watchGetEmployeesListDetails(),
        watchGetProjectsListDetails(),
        putMarketData(),
        getMarketData(),
        getRole(),
        getUsersWithRole(),
        getUsersWithOutRole(),
        assignRole(),
        watchDownloadRevenueSummaryReport(),
        watchDownloadFinanceAccuralseReport(),
        watchDownloadFinanceTravelCostReport(),
        watchDownloadMaterialRevenueExpenseReport(),
        watchDownloadManpowerSkillSetReport(),
        watchDownloadBenchResourceReport(),
        watchDownloadAttritionReport(),
        watchGetAllSlaContractsDetails(),
        watchGetAllSlaCountrysDetails(),   
        getAboutUsData(),
        getProductEngineerData(),
        getSupplierManagementData(),
        getQualityManagementData(),
        getManufacturingEngineerData(),
        getLeanProcessData(),
        getInformationRechnologyData(),
        getHumanResourcesData(),
        getFinanceControllingData(),
        getCustomerServicesData(),
        getCostEngineeringData(),
        getCapabilitiesData(),
        getServicesData(),
        getTestimonialData(),
        getTeamMembersData(),
        postAddContentData(),
        getNewsletterDownloadData(),
        getNewsletterData(),
        getContentDownloadData(),
        getContentDetailsData(),
        getBrochureDownloadData(),
        getBrochureDetailsData(),
        getMissionVisionData(),
        postAboutUsData(),
        putAboutUsData(),
        postServicesData(),
        putServicesData(),
        postTestimonialData(),
        putTestimonialData(),
        postTeamMembersData(),
        putTeamMembersData(),
        postMissionVisionData(),
        putMissionVisionData(),
        commonUpload(),
        clearState(),
        watchGetAllSlaCountrysDetails(),
        watchRemovePushNotification(),
        watchCreateNewCustomer(),
        commonGet(),
        commonDelete(),
        commonPut(),
        commonPost(),
        commonSubContentDelete(),
        commonSubContentGet(),
        commonSubContentPut(),
        commonSubContentPost(),
        commonUploadLandingPage(),
        commonDownload(),
        clearStatusDashboard(),
        getVisionData(),
        getServiceSubContentData(),
        getHumanResourcesSubCntData(),
        getQualityManagementSubCntData(),
        getLeanProcessSubCntData(),
        getSupplierManagementSubCntData(),
        getManufacturingEngineerSubCntData(),
        getFinanceControllingSubCntData(),
        getCostEngineeringSubCntData(),
        getCustomerServicesSubCntData(),
        getProductEngineerSubCntData(),
        getLatestNewsletterData(),
        commonGet(),
        commonGetBrochure(),
        restInitialData(),
        reqDeleteProvisions(),
        getSendMail(),
        reqProjectProvisions(),
        reqSLAProvisions(),
        sentApprovalSla(),
        OnClearCapnitiDetails(),
        postReopenTask(),
        getApprovalSla(),
        onChangeCostCenterStatus(),
        aboutUsCommonGet(),
        clearFinanceStatus()
    ]);
}