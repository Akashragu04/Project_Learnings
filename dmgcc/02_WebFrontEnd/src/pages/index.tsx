import { authRouteConfig } from "./auth";
import { initialUrl } from "shared/constants/AppConst";
import Error403 from "./errorPages/Error403";
import React from "react";
import { errorPagesConfigs } from "./errorPages";
import { samplePagesConfigs } from "./sample";
import { profilePage } from "./profile";
import {BusinessConfig} from './Business';
import {DashboardConfig} from './Dashboard';
import { SLAConfig } from "./SLA";
import { ResourceConfig } from "./Resource";
import { ReportConfig } from "./Report";
import { OperationConfig } from "./Operation";
import { FinanceConfig } from "./Finance";
import { preInvoiceConfig } from "./PreInvoice";
import { InvoiceConfig } from "./invoice";
import { SettingsConfigPage } from "./settingsModule";
import { landingPageRouteConfig } from "./LandingPage";
import { UserManagementConfig } from "./admin";
import { LandingPageBaseConfig } from "./LandingPageBase";

const authorizedStructure = {
  fallbackPath: "/signin",
  unAuthorizedComponent: <Error403 />,
  routes: [
    ...DashboardConfig,
    ...BusinessConfig,
    ...SLAConfig,
    ...OperationConfig,
    ...ResourceConfig,
    ...ReportConfig,
    ...samplePagesConfigs, 
    ...profilePage,
    ...FinanceConfig,
    ...preInvoiceConfig,
    ...InvoiceConfig,
    ...SettingsConfigPage,
    ...landingPageRouteConfig,
    ...UserManagementConfig,
    ...LandingPageBaseConfig
  ],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: authRouteConfig,
};

const anonymousStructure = {
  routes: errorPagesConfigs,
};

export { authorizedStructure, unAuthorizedStructure, anonymousStructure };
