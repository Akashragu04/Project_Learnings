import { Metrics } from "../../types/models/dashboards/Metrics";
import { Analytics } from "../../types/models/dashboards/Analytics";
import { CRM } from "../../types/models/dashboards/CRM";
import { Crypto } from "../../types/models/dashboards/Crypto";
import { Widgets } from "../../types/models/dashboards/Widgets";
import { Academy } from "../../types/models/dashboards/Academy";
import { HealthCare } from "../../types/models/dashboards/HealthCare";
import { Ecommerce } from "../../types/models/dashboards/Ecommerce";

export const GET_ACADEMY_DATA = "GET_ACADEMY_DATA";
export const GET_ECOMMERCE_DATA = "GET_ECOMMERCE_DATA";
export const GET_HEALTH_CARE_DATA = "GET_HEALTH_CARE_DATA";
export const GET_ANALYTICS_DATA = "GET_ANALYTICS_DATA";
export const GET_CRM_DATA = "GET_CRM_DATA";
export const GET_CRYPTO_DATA = "GET_CRYPTO_DATA";
export const GET_METRICS_DATA = "GET_METRICS_DATA";
export const GET_WIDGETS_DATA = "GET_WIDGETS_DATA";

export interface GetAnalyticsAction {
  type: typeof GET_ANALYTICS_DATA;
  payload: Analytics;
}

export interface GetECommerceAction {
  type: typeof GET_ECOMMERCE_DATA;
  payload: Ecommerce;
}

export interface GetHeathCareAction {
  type: typeof GET_HEALTH_CARE_DATA;
  payload: HealthCare;
}

export interface GetAcademyAction {
  type: typeof GET_ACADEMY_DATA;
  payload: Academy;
}

export interface GetCRMAction {
  type: typeof GET_CRM_DATA;
  payload: CRM;
}

export interface GetCryptosAction {
  type: typeof GET_CRYPTO_DATA;
  payload: Crypto;
}

export interface GetMetricsAction {
  type: typeof GET_METRICS_DATA;
  payload: Metrics;
}

export interface GetWidgetsAction {
  type: typeof GET_WIDGETS_DATA;
  payload: Widgets;
}

export type DashboardActionTypes =
  | GetECommerceAction
  | GetHeathCareAction
  | GetAcademyAction
  | GetAnalyticsAction
  | GetCRMAction
  | GetCryptosAction
  | GetMetricsAction
  | GetWidgetsAction;
