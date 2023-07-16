import React, { ReactNode } from "react";
import { RoutePermittedRole } from "../../shared/constants/AppConst";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
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

const routesFinanceConfig: RouterConfigData[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    messageId: "sidebar.dashboard",
    type: "item",
    url: "/dashboard",
    permittedRole: RoutePermittedRole.Finance
  },
  {
    id: "business",
    title: "Business",
    messageId: "sidebar.business",
    type: "group",
    permittedRole: RoutePermittedRole.Finance,
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
    ],
  },
  {
    id: "finance",
    title: "Finance",
    messageId: "sidebar.finance",
    type: "group",
    permittedRole: RoutePermittedRole.Finance,
    children: [
      {
        id: "rate-card",
        title: "Rate Card",
        messageId: "sidebar.finance.rateCard",
        type: "item",
        icon: <CreditCardIcon />,
        url: "/finance/ratecard",
      }, {
        id: "finance-master",
        title: "Finance Master",
        messageId: "sidebar.finance.FinanceMaster",
        type: "item",
        icon: <CreditCardIcon />,
        url: "/finance/finance-master",
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
  }
];

export default routesFinanceConfig;