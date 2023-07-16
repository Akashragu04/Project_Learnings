import { authenticationReducer } from './auth.reducer';
import Settings from "./Setting";
import Common from "./Common";
import Dashboard from './Dashboard'
import { BusinessProcess } from './business.reducer';
import { businessRequirement } from './businessRequirement.reducer';
import { businessJDMapping } from './businessJDMapping.reducer';
import { OperationProcess } from './operation.reducer';
import { ResourceProcess } from './Resource.reducer';
import { businessCaseSLA } from './bizCaseSLA.reducer';
import { preInvoice } from './preInvoice.reducer';
import {
  finance, financeAccurals, financeCostCenterYTD, financeEntityMaster, financeMaterialMaster,
  financeProvisions
} from './finance.reducer';
import { BizCaseSetup } from './businessSetup.reducer';
import { projectOwnerSettings, settingsModule } from './settings.reducer';
import { FinanceMaster } from './FinanceMaster.reducer';
import { businessCalculations } from './businessCalculations.reducer';
import { dashboardDetailsReducer } from './dashboardreducer';
import { adminRoleReducer } from './admin.redcer';
import { businessReports, slaReports, operationsReports, financeReports, resourceReports } from './reports.reducer';
import { AboutUsReducer } from './aboutus.reduces';
import { GccVerticalReducer } from './gccvertical.reduces';
import { OthersReducer } from './others.reduces';

const reducers = {
  auth: authenticationReducer,
  settings: Settings,
  common: Common,
  dashboard: Dashboard,
  businessProcess: BusinessProcess,
  businessRequirement,
  jdmapping: businessJDMapping,
  operationProcess: OperationProcess,
  bizCaseSLAProcess: businessCaseSLA,
  preInvoiceProcess: preInvoice,
  resourceProcess: ResourceProcess,
  finance,
  BizCaseSetup: BizCaseSetup,
  settingsProcess: settingsModule,
  FinanceMaster: FinanceMaster,
  financeAccurals,
  financeCCYTD: financeCostCenterYTD,
  entityMaster: financeEntityMaster,
  materialMaster: financeMaterialMaster,
  projectSettings: projectOwnerSettings,
  businessCalculations,
  dashboardDetails: dashboardDetailsReducer,
  provisions: financeProvisions,
  businessReports,
  slaReports,
  operationsReports,
  adminRoleReducer: adminRoleReducer,
  financeReports,
  resourceReports,
  aboutUsDetails: AboutUsReducer,
  gccVerticalReducer: GccVerticalReducer,
  othersReducer: OthersReducer
};

export default reducers;