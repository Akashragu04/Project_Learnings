import React, { ReactNode } from "react";
import { RoutePermittedRole } from "../../shared/constants/AppConst";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GridViewIcon from '@mui/icons-material/GridView';
import GroupIcon from '@mui/icons-material/Group';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import BusinessIcon from '@mui/icons-material/Business';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SummarizeIcon from '@mui/icons-material/Summarize';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ArticleIcon from '@mui/icons-material/Article';

export interface RouterConfigData {
  id: string;
  title: string;
  messageId: string;
  icon?: string | ReactNode;
  type: "item" | "group" | "collapse" | "divider";
  children?: RouterConfigData[];
  permittedRole?: RoutePermittedRole;
  color?: string;
  url?: string;
  exact?: boolean;
  count?: number;
}

const routesBusinessConfig: RouterConfigData[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    messageId: "sidebar.dashboard",
    type: "item",
    url: "/dashboard",
    permittedRole: RoutePermittedRole.Common
  },
  {
    id: "business",
    title: "Business",
    messageId: "sidebar.business",
    type: "group",
    permittedRole: RoutePermittedRole.Business,
    children: [
      {
        id: "leads",
        title: "Leads",
        messageId: "sidebar.business.leads",
        type: "item",
        icon: <BusinessCenterIcon />,
        url: "/business/leads-monitoring",
      },
      {
        id: "businessSetup",
        title: "Business Setup",
        messageId: "sidebar.business.bizrequest",
        type: "item",
        icon: <BusinessCenterIcon />,
        url: "/business/business-setup",
      },
      {
        id: "viewbusinesscase",
        title: "Business Case",
        messageId: "sidebar.business.viewbizcase",
        type: "item",
        icon: <BusinessCenterIcon />,
        url: "/view-business-case",
      }
    ],
  },
  {
    id: "sla",
    title: "SLA",
    messageId: "sidebar.sla",
    type: "group",
    permittedRole: RoutePermittedRole.Business,
    children: [
      {
        id: "projects1",
        title: "projects",
        messageId: "sidebar.sla.projects",
        type: "item",
        icon: <AccountTreeIcon />,
        url: "/SLA/projects",
      },
      {
        id: "page-1",
        title: "Page 1",
        messageId: "sidebar.sla.bizcasesla",
        type: "item",
        icon: <BusinessIcon />,
        url: "/SLA/biz-case-sla",
      },
      {
        id: "page-2",
        title: "Page 2",
        messageId: "sidebar.sla.slacreation",
        type: "item",
        icon: <BusinessCenterIcon />,
        url: "/Preinvoice/PreInvoiceGrid",
      },
      {
        id: "page-3",
        title: "Page 3",
        messageId: "sidebar.sla.invoiceGrid",
        type: "item",
        icon: <BusinessCenterIcon />,
        url: "/Invoice/InvoiceGrid",
      }

    ],
  },

  {
    id: "resource",
    title: "Resource",
    messageId: "sidebar.resource",
    type: "group",
    permittedRole: RoutePermittedRole.Business,
    children: [
      {
        id: "ResourcesOverview",
        title: "Resources Overview",
        messageId: "sidebar.resource.ResourcesOverview",
        type: "item",
        icon: <GroupIcon />,
        url: "/resource/resources-overviewTable",
      },
      {
        id: "ResourcesRecord",
        title: "Resources Record",
        messageId: "sidebar.resource.ResourcesRecord",
        type: "item",
        icon: <GroupIcon />,
        url: "/resource/resources-record",
      },
      {
        id: "utilization",
        title: "Utilization",
        messageId: "sidebar.resource.Utilzation",
        type: "item",
        icon: <AutoModeIcon />,
        url: "/resource/utilization",
      },
      {
        id: "ExternalResource",
        title: "External Resource",
        messageId: "sidebar.resource.ExternalResource",
        type: "item",
        icon: <GroupIcon />,
        url: "/resource/external_resource",

      }
    ]
  },
  {
    id: "operation",
    title: "Operation",
    messageId: "sidebar.operation",
    type: "group",
    permittedRole: RoutePermittedRole.Business,
    children: [
      {
        id: "operation1",
        title: "projects",
        messageId: "sidebar.operation.operation1",
        type: "item",
        icon: <AccountTreeIcon />,
        url: "/operation/projects",
      },
      {
        id: "operation2",
        title: "overview",
        messageId: "sidebar.operation.operation2",
        type: "item",
        icon: <GridViewIcon />,
        url: "/operation/overview",
      },
      {
        id: "operation3",
        title: "Resource Allocation",
        messageId: "sidebar.operation.operation3",
        type: "item",
        icon: <GroupIcon />,
        url: "/operation/resource-allocation",
      },
      {
        id: "operation4",
        title: "Capacity Management",
        messageId: "sidebar.operation.operation4",
        type: "item",
        icon: <ReduceCapacityIcon />,
        url: "/operation/capacity-management",
      },
      {
        id: "operation6",
        title: "Task Management",
        messageId: "sidebar.operation.operation6",
        type: "item",
        icon: <ListAltIcon />,
        url: "/operation/task-management",
      },
      {
        id: "operation5",
        title: "Capniti",
        messageId: "sidebar.operation.operation5",
        type: "item",
        icon: <CalendarMonthIcon />,
        url: "/operation/capniti",
      },
      // {
      //   id: "operation7",
      //   title: "Business Setup for Running Projects",
      //   messageId: "sidebar.operation.operation7",
      //   type: "item",
      //   icon: <BusinessCenterIcon />,
      //   url: "/operation/business-setupfor-runningProjects",
      // },
    ],
  },  
  {
    id: "finance",
    title: "Finance",
    messageId: "sidebar.finance",
    type: "group",
    permittedRole: RoutePermittedRole.Business,
    children: [
      {
        id: "rate-card",
        title: "Rate Card",
        messageId: "sidebar.finance.rateCard",
        type: "item",
        icon: <RateReviewIcon />,
        url: "/finance/ratecard",
      },
      {
        id: "ForexRates",
        title: "Forex Rates",
        messageId: "sidebar.finance.ForexRates",
        type: "item",
        icon: <RateReviewIcon />,
        url: "/finance/forexrates",
      },
      {
        id: "Accruals",
        title: "Accruals",
        messageId: "sidebar.finance.Accruals",
        type: "item",
        icon: <CreditCardIcon />,
        url: "/finance/accruals",
      },
      {
        id: "iodump",
        title: "IO Dump",
        messageId: "sidebar.finance.ioDump",
        type: "item",
        icon: <FolderOpenIcon />,
        url: "/finance/viewiodump",
      },
      {
        id: "costcenterdump",
        title: "Cost Centre Dump",
        messageId: "sidebar.finance.costCenterReportDump",
        type: "item",
        icon: <MonetizationOnIcon />,
        url: "/finance/viewcostcenterdump",
      },
      {
        id: "provision",
        title: "Provisions",
        messageId: "sidebar.finance.Provisions",
        type: "item",
        icon: <ListAltIcon />,
        url: "/finance/viewprovision",
      },
    ],
  },
  {
    id: "other",
    title: "Others",
    messageId: "landing.others",
    type: "group",
    permittedRole: RoutePermittedRole.Business,
    children: [
      {
        id: "brochures",
        title: "Brochures",
        messageId: "landing.viewBrochures",
        type: "item",
        icon: <SummarizeIcon />,
        url: "/brochure-view",
      },
      {
        id: "newsletter",
        title: "Newsletter",
        messageId: "landing.viewNewsletter",
        type: "item",
        icon: <NewspaperIcon />,
        url: "/newsletter-view",
      },
      {
        id: "content",
        title: "Content",
        messageId: "landing.viewContent",
        type: "item",
        icon: <ArticleIcon />,
        url: "/content-view",
      },
    ],
  },
  {
    id: "shareFeedback",
    title: "Share Feedback",
    messageId: "sidebar.feedback",
    type: "item",
    url: "/feedback",
    permittedRole: RoutePermittedRole.Admin
  },
  {
    id: "report",
    title: "Report",
    messageId: "sidebar.report",
    type: "item",
    url: "/report/report-master",
  },
];

export default routesBusinessConfig;