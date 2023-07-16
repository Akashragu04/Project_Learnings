import React from "react";
import AddRequirements from './addRequirements'
import JDMapping from './JDMapping'
import UpdateRequirements from './addRequirements/update-requirement';
const BusinessSetup = React.lazy(() => import("./BusinessSetup"));
const LeadsMonitoring = React.lazy(() => import("./LeadsMonitoring"));
const AddLeadsMonitoring = React.lazy(() => import("./LeadsMonitoring/LeadsForm/AddLeadForm"));
const EditLeadMonitoring = React.lazy(() => import("./LeadsMonitoring/LeadsForm/EditLeadForm"));
const ViewBusinessCase = React.lazy(() => import("./addRequirements/view-businesscase"));
const BizCaseSetupChart = React.lazy(() => import("./BizCaseSetupChart")); 
const ViewBusinessCaseDetails = React.lazy(()=>import("./ViewBusinessCase"))

export const BusinessConfig = [
  {
    path: "/business/jdmapping",
    element: <JDMapping />,
  },
  {
    path: "/business/business-request",
    element: <AddRequirements />,
  },
  {
    path: "/business/update-business-request",
    element: <UpdateRequirements />,
  },
  {
    path: "/business/business-setup",
    element: <BusinessSetup />,
  },
  {
    path: "/business/leads-monitoring",
    element: <LeadsMonitoring />,
  },
  {
    path: "/business/leads",
    element: <AddLeadsMonitoring />,
  },
  {
    path: "/business/edit-leads/:leadId",
    element: <EditLeadMonitoring />,
  },
  {
    path: "/business/view-businesscase",
    element: <ViewBusinessCase />,
  },
  {
    path: "/business/biz-case-setup-chart",
    element: <BizCaseSetupChart />,
  },
  {
    path: "/view-business-case",
    element: <ViewBusinessCaseDetails />,
  }
]